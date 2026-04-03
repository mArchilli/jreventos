<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index()
    {
        $faqs = Faq::orderBy('order')->get();

        return Inertia::render('Admin/Faqs/Index', [
            'faqs' => $faqs,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'question' => 'required|string|max:255',
            'answer'   => 'required|string',
            'order'    => 'nullable|integer|min:0',
        ]);

        $data['order'] = $data['order'] ?? (Faq::max('order') + 1);

        Faq::create($data);

        return redirect()->route('admin.faqs.index')->with('success', 'Pregunta frecuente creada correctamente.');
    }

    public function update(Request $request, Faq $faq)
    {
        $data = $request->validate([
            'question' => 'required|string|max:255',
            'answer'   => 'required|string',
            'order'    => 'nullable|integer|min:0',
        ]);

        $faq->update($data);

        return redirect()->route('admin.faqs.index')->with('success', 'Pregunta frecuente actualizada correctamente.');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return redirect()->route('admin.faqs.index')->with('success', 'Pregunta frecuente eliminada correctamente.');
    }
}
