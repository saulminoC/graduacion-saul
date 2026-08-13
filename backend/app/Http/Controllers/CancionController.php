<?php

namespace App\Http\Controllers;

use App\Models\Cancion;
use Illuminate\Http\Request;

class CancionController extends Controller
{
    // Mostrar todas las canciones recomendadas
    public function index()
    {
        $canciones = Cancion::latest()->get();
        return response()->json($canciones);
    }

    // Guardar una recomendación musical
    public function store(Request $request)
    {
        $request->validate([
            'cancion' => 'required|string|max:191',
            'nombre' => 'nullable|string|max:191', // Es opcional
        ]);

        $cancion = Cancion::create([
            'cancion' => $request->cancion,
            'nombre' => $request->nombre,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $cancion,
            'message' => '¡Canción añadida a la playlist!'
        ], 201);
    }
}
