<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use Inertia\Inertia;

class ArtistController extends Controller
{
    public function index()
    {
        $artists = Artist::with('mainImage')->latest()->get();

        return Inertia::render('Client/Artists/Index', [
            'artists' => $artists,
        ]);
    }

    public function show(Artist $artist)
    {
        $artist->load('images', 'mainImage');

        return Inertia::render('Client/Artists/Show', [
            'artist' => $artist,
        ]);
    }
}
