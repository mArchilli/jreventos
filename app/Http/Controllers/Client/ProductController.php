<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('mainImage')->latest()->get();

        return Inertia::render('Client/Products/Index', [
            'products' => $products,
        ]);
    }

    public function show(Product $product)
    {
        $product->load('images', 'mainImage');

        return Inertia::render('Client/Products/Show', [
            'product' => $product,
        ]);
    }
}
