<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with(['images', 'cardImage'])->latest()->get();

        return Inertia::render('Client/Events/Index', [
            'events' => $events,
        ]);
    }

    public function show(Event $event)
    {
        $event->load(['images', 'cardImage', 'heroImage']);

        $relatedEvents = Event::with(['images', 'cardImage'])
            ->where('id', '!=', $event->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Client/Events/Show', [
            'event'         => $event,
            'relatedEvents' => $relatedEvents,
        ]);
    }
}
