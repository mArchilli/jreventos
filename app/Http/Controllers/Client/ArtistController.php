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

        $relatedArtists = Artist::with('mainImage')
            ->where('id', '!=', $artist->id)
            ->latest()
            ->take(4)
            ->get();

        return Inertia::render('Client/Artists/Show', [
            'artist' => $artist,
            'relatedArtists' => $relatedArtists,
        ]);
    }
}
