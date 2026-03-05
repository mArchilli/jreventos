<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\ShowService;
use Inertia\Inertia;

class ShowServiceController extends Controller
{
    public function index()
    {
        $shows = ShowService::latest()->get();

        return Inertia::render('Client/ShowAndServices/Index', [
            'shows' => $shows,
        ]);
    }

    public function show(ShowService $show)
    {
        return Inertia::render('Client/ShowAndServices/Show', [
            'show' => $show,
        ]);
    }
}
