<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('images')->latest()->paginate(10);
        return \Inertia\Inertia::render('Admin/Events/Index', [
            'events' => $events
        ]);
    }

    // Eliminado método create()

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $event = Event::create($validated);

        if ($request->hasFile('images')) {
            $imagesPath = env('EVENTS_IMAGES_PATH', '/images/events/');
            foreach ($request->file('images') as $image) {
                $filename = uniqid('event_') . '.' . $image->getClientOriginalExtension();
                $image->move(public_path($imagesPath), $filename);
                EventImage::create([
                    'event_id' => $event->id,
                    'image_path' => ltrim($imagesPath, '/') . $filename,
                ]);
            }
        }

        return redirect()->route('admin.events.index')->with('success', 'Evento creado exitosamente.');
    }

    // Eliminado método edit()

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'remove_image_ids' => 'array',
            'remove_image_ids.*' => 'integer|exists:event_images,id',
        ]);

        $event->update($validated);

        // Eliminar imágenes marcadas para borrar
        if ($request->filled('remove_image_ids')) {
            $imagesToRemove = EventImage::whereIn('id', $request->remove_image_ids)->where('event_id', $event->id)->get();
            foreach ($imagesToRemove as $img) {
                $imagePath = public_path($img->image_path);
                if (file_exists($imagePath)) {
                    @unlink($imagePath);
                }
                $img->delete();
            }
        }

        // Anexar nuevas imágenes
        if ($request->hasFile('images')) {
            $imagesPath = env('EVENTS_IMAGES_PATH', '/images/events/');
            foreach ($request->file('images') as $image) {
                $filename = uniqid('event_') . '.' . $image->getClientOriginalExtension();
                $image->move(public_path($imagesPath), $filename);
                EventImage::create([
                    'event_id' => $event->id,
                    'image_path' => ltrim($imagesPath, '/') . $filename,
                ]);
            }
        }

        return redirect()->route('admin.events.index')->with('success', 'Evento actualizado exitosamente.');
    }

    public function destroy(Event $event)
    {
        foreach ($event->images as $image) {
            $imagePath = public_path($image->image_path);
            if (file_exists($imagePath)) {
                @unlink($imagePath);
            }
            $image->delete();
        }
        $event->delete();
        return redirect()->route('admin.events.index')->with('success', 'Evento eliminado exitosamente.');
    }

    public function destroyImage(EventImage $image)
    {
        $imagePath = public_path($image->image_path);
        if (file_exists($imagePath)) {
            @unlink($imagePath);
        }
        $image->delete();
        return back()->with('success', 'Imagen eliminada exitosamente.');
    }
}
