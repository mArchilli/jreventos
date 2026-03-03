<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use App\Models\ArtistImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ArtistController extends Controller
{
    private function imagesPath(): string
    {
        return public_path(ltrim(env('ARTISTS_IMAGES_PATH', '/images/artists/'), '/'));
    }

    private function storeImage($file): string
    {
        $dir      = $this->imagesPath();
        $filename = uniqid('artist_', true) . '.' . $file->getClientOriginalExtension();
        File::ensureDirectoryExists($dir);
        $file->move($dir, $filename);
        return $filename;
    }

    private function deleteImage(?string $filename): void
    {
        if (!$filename) return;
        $path = $this->imagesPath() . DIRECTORY_SEPARATOR . $filename;
        if (File::exists($path)) File::delete($path);
    }

    public function index()
    {
        $artists = Artist::with(['images', 'mainImage'])->latest()->get();

        return Inertia::render('Admin/Artists/Index', [
            'artists' => $artists,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'             => 'required|string|max:255',
            'description'      => 'required|string',
            'images'           => 'nullable|array',
            'images.*'         => 'image|max:4096',
            'main_image_index' => 'nullable|integer',
        ]);

        $artist = Artist::create([
            'name'        => $data['name'],
            'description' => $data['description'],
        ]);

        $mainIndex = $request->integer('main_image_index', 0);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $i => $file) {
                $filename = $this->storeImage($file);
                ArtistImage::create([
                    'artist_id' => $artist->id,
                    'filename'  => $filename,
                    'is_main'   => ($i === $mainIndex),
                    'order'     => $i,
                ]);
            }
        }

        return redirect()->route('admin.artists.index')->with('success', 'Artista creado correctamente.');
    }

    public function update(Request $request, Artist $artist)
    {
        $data = $request->validate([
            'name'               => 'required|string|max:255',
            'description'        => 'required|string',
            'new_images'         => 'nullable|array',
            'new_images.*'       => 'image|max:4096',
            'main_image_id'      => 'nullable|integer',
            'remove_image_ids'   => 'nullable|array',
            'remove_image_ids.*' => 'integer',
        ]);

        $artist->update([
            'name'        => $data['name'],
            'description' => $data['description'],
        ]);

        // Eliminar imágenes marcadas
        if (!empty($data['remove_image_ids'])) {
            $toDelete = ArtistImage::whereIn('id', $data['remove_image_ids'])
                ->where('artist_id', $artist->id)
                ->get();
            foreach ($toDelete as $img) {
                $this->deleteImage($img->filename);
                $img->delete();
            }
        }

        // Subir nuevas imágenes
        if ($request->hasFile('new_images')) {
            $nextOrder = $artist->images()->max('order') + 1;
            foreach ($request->file('new_images') as $i => $file) {
                $filename = $this->storeImage($file);
                ArtistImage::create([
                    'artist_id' => $artist->id,
                    'filename'  => $filename,
                    'is_main'   => false,
                    'order'     => $nextOrder + $i,
                ]);
            }
        }

        // Establecer imagen principal
        if (!empty($data['main_image_id'])) {
            $artist->images()->update(['is_main' => false]);
            ArtistImage::where('id', $data['main_image_id'])
                ->where('artist_id', $artist->id)
                ->update(['is_main' => true]);
        } elseif ($artist->images()->exists() && !$artist->mainImage()->exists()) {
            $artist->images()->first()->update(['is_main' => true]);
        }

        return redirect()->route('admin.artists.index')->with('success', 'Artista actualizado correctamente.');
    }

    public function destroy(Artist $artist)
    {
        foreach ($artist->images as $img) {
            $this->deleteImage($img->filename);
        }
        $artist->delete();

        return redirect()->route('admin.artists.index')->with('success', 'Artista eliminado correctamente.');
    }
}
