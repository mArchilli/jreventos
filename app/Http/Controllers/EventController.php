<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventImage;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with(['images', 'cardImage', 'heroImage'])->latest()->paginate(10);
        return \Inertia\Inertia::render('Admin/Events/Index', [
            'events' => $events,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'images.*'    => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $validated['timeline']     = $this->decodeJsonField($request->input('timeline'));
        $validated['includes']     = $this->decodeJsonField($request->input('includes'));
        $validated['testimonials'] = $this->decodeJsonField($request->input('testimonials'));

        $event = Event::create($validated);

        $savedImages = $this->saveNewImages($request, $event);

        // Auto-asignar card y hero a la primera imagen si se subieron
        if ($savedImages->isNotEmpty()) {
            $event->card_image_id = $savedImages->first()->id;
            $event->hero_image_id = $savedImages->first()->id;
            $event->save();
        }

        return redirect()->route('admin.events.index')->with('success', 'Evento creado exitosamente.');
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title'              => 'required|string|max:255',
            'description'        => 'nullable|string',
            'images.*'           => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'remove_image_ids'   => 'array',
            'remove_image_ids.*' => 'integer|exists:event_images,id',
            'card_image_id'      => 'nullable|integer|exists:event_images,id',
            'hero_image_id'      => 'nullable|integer|exists:event_images,id',
        ]);

        $validated['timeline']     = $this->decodeJsonField($request->input('timeline'));
        $validated['includes']     = $this->decodeJsonField($request->input('includes'));
        $validated['testimonials'] = $this->decodeJsonField($request->input('testimonials'));

        $event->update($validated);

        // Eliminar imágenes marcadas
        if ($request->filled('remove_image_ids')) {
            $toRemove = EventImage::whereIn('id', $request->remove_image_ids)
                ->where('event_id', $event->id)
                ->get();

            foreach ($toRemove as $img) {
                // Limpiar referencias si era card o hero
                if ($event->card_image_id === $img->id) $event->card_image_id = null;
                if ($event->hero_image_id === $img->id) $event->hero_image_id = null;

                $path = public_path($img->image_path);
                if (file_exists($path)) @unlink($path);
                $img->delete();
            }
            $event->save();
        }

        $savedImages = $this->saveNewImages($request, $event);

        // Auto-asignar card/hero a primera imagen nueva si no hay ninguna asignada
        $event->refresh();
        if ($savedImages->isNotEmpty()) {
            if (!$event->card_image_id) {
                $event->card_image_id = $savedImages->first()->id;
            }
            if (!$event->hero_image_id) {
                $event->hero_image_id = $savedImages->first()->id;
            }
            $event->save();
        }

        return redirect()->route('admin.events.index')->with('success', 'Evento actualizado exitosamente.');
    }

    public function destroy(Event $event)
    {
        foreach ($event->images as $image) {
            $path = public_path($image->image_path);
            if (file_exists($path)) @unlink($path);
            $image->delete();
        }
        $event->delete();
        return redirect()->route('admin.events.index')->with('success', 'Evento eliminado exitosamente.');
    }

    public function destroyImage(EventImage $image)
    {
        $path = public_path($image->image_path);
        if (file_exists($path)) @unlink($path);
        $image->delete();
        return back()->with('success', 'Imagen eliminada exitosamente.');
    }

    // ── Helpers ────────────────────────────────────────────────

    private function saveNewImages(Request $request, Event $event): \Illuminate\Support\Collection
    {
        $saved = collect();
        if (!$request->hasFile('images')) return $saved;

        $imagesPath = env('EVENTS_IMAGES_PATH', '/images/events/');
        foreach ($request->file('images') as $image) {
            $filename = uniqid('event_') . '.' . $image->getClientOriginalExtension();
            $image->move(public_path($imagesPath), $filename);
            $saved->push(EventImage::create([
                'event_id'   => $event->id,
                'image_path' => ltrim($imagesPath, '/') . $filename,
            ]));
        }
        return $saved;
    }

    private function decodeJsonField(?string $value): ?array
    {
        if (!$value) return null;
        $decoded = json_decode($value, true);
        return is_array($decoded) ? $decoded : null;
    }
}
