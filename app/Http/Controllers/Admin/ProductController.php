<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ProductController extends Controller
{
    private function imagesPath(): string
    {
        return public_path(ltrim(env('PRODUCTS_IMAGES_PATH', '/images/products/'), '/'));
    }

    private function storeImage($file): string
    {
        $dir      = $this->imagesPath();
        $filename = uniqid('product_', true) . '.' . $file->getClientOriginalExtension();
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
        $products = Product::with(['images', 'mainImage'])->latest()->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'            => 'required|string|max:255',
            'description'      => 'required|string',
            'price'            => 'required|numeric|min:0',
            'images'           => 'nullable|array',
            'images.*'         => 'image|max:4096',
            'main_image_index' => 'nullable|integer',
        ]);

        $product = Product::create([
            'title'       => $data['title'],
            'description' => $data['description'],
            'price'       => $data['price'],
        ]);

        $mainIndex = $request->integer('main_image_index', 0);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $i => $file) {
                $filename = $this->storeImage($file);
                ProductImage::create([
                    'product_id' => $product->id,
                    'filename'   => $filename,
                    'is_main'    => ($i === $mainIndex),
                    'order'      => $i,
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Producto creado correctamente.');
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'title'             => 'required|string|max:255',
            'description'       => 'required|string',
            'price'             => 'required|numeric|min:0',
            'new_images'        => 'nullable|array',
            'new_images.*'      => 'image|max:4096',
            'main_image_id'     => 'nullable|integer',
            'remove_image_ids'  => 'nullable|array',
            'remove_image_ids.*'=> 'integer',
        ]);

        $product->update([
            'title'       => $data['title'],
            'description' => $data['description'],
            'price'       => $data['price'],
        ]);

        // Delete removed images
        if (!empty($data['remove_image_ids'])) {
            $toDelete = ProductImage::whereIn('id', $data['remove_image_ids'])
                ->where('product_id', $product->id)
                ->get();
            foreach ($toDelete as $img) {
                $this->deleteImage($img->filename);
                $img->delete();
            }
        }

        // Upload new images
        if ($request->hasFile('new_images')) {
            $nextOrder = $product->images()->max('order') + 1;
            foreach ($request->file('new_images') as $i => $file) {
                $filename = $this->storeImage($file);
                ProductImage::create([
                    'product_id' => $product->id,
                    'filename'   => $filename,
                    'is_main'    => false,
                    'order'      => $nextOrder + $i,
                ]);
            }
        }

        // Set main image
        if (!empty($data['main_image_id'])) {
            $product->images()->update(['is_main' => false]);
            ProductImage::where('id', $data['main_image_id'])
                ->where('product_id', $product->id)
                ->update(['is_main' => true]);
        } elseif ($product->images()->exists() && !$product->mainImage()->exists()) {
            // if no main set, pick the first
            $product->images()->first()->update(['is_main' => true]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Producto actualizado correctamente.');
    }

    public function destroy(Product $product)
    {
        foreach ($product->images as $img) {
            $this->deleteImage($img->filename);
        }
        $product->delete(); // cascades images via DB

        return redirect()->route('admin.products.index')->with('success', 'Producto eliminado correctamente.');
    }
}
