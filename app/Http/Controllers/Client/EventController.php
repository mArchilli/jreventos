<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('images')->latest()->get();

        return Inertia::render('Client/Events/Index', [
            'events' => $events,
        ]);
    }

    public function show(Event $event)
    {
        $event->load('images');

        $relatedEvents = Event::with('images')
            ->where('id', '!=', $event->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Client/Events/Show', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
        ]);
    }
}
