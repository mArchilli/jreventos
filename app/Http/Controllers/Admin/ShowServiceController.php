<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ShowService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ShowServiceController extends Controller
{
    public function index()
    {
        $shows = ShowService::latest()->get();

        return Inertia::render('Admin/ShowsServices/Index', [
            'shows' => $shows,
        ]);
    }

    private function imagesPath(): string
    {
        return public_path(ltrim(env('SHOWANDSERVICES_IMAGES_PATH', '/images/show-and-services/'), '/'));
    }

    private function storeImage($file): string
    {
        $dir      = $this->imagesPath();
        $filename = uniqid('show_', true) . '.' . $file->getClientOriginalExtension();
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

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'img_portada' => 'nullable|image|max:4096',
            'img_vista'   => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('img_portada')) {
            $data['img_portada'] = $this->storeImage($request->file('img_portada'));
        }

        if ($request->hasFile('img_vista')) {
            $data['img_vista'] = $this->storeImage($request->file('img_vista'));
        }

        ShowService::create($data);

        return redirect()->route('admin.shows.index')->with('success', 'Show/Servicio creado correctamente.');
    }

    public function update(Request $request, ShowService $show)
    {
        $data = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'img_portada' => 'nullable|image|max:4096',
            'img_vista'   => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('img_portada')) {
            $this->deleteImage($show->img_portada);
            $data['img_portada'] = $this->storeImage($request->file('img_portada'));
        }

        if ($request->hasFile('img_vista')) {
            $this->deleteImage($show->img_vista);
            $data['img_vista'] = $this->storeImage($request->file('img_vista'));
        }

        $show->update($data);

        return redirect()->route('admin.shows.index')->with('success', 'Show/Servicio actualizado correctamente.');
    }

    public function destroy(ShowService $show)
    {
        $this->deleteImage($show->img_portada);
        $this->deleteImage($show->img_vista);

        $show->delete();

        return redirect()->route('admin.shows.index')->with('success', 'Show/Servicio eliminado correctamente.');
    }
}
