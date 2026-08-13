<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;

class MensajeController extends Controller
{
    // Mostrar todos los mensajes (para tu panel /saul)
    public function index()
    {
        // Los ordenamos para que el más nuevo salga primero
        $mensajes = Mensaje::latest()->get();
        return response()->json($mensajes);
    }

    // Guardar un nuevo mensaje que viene del frontend
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:191',
            'mensaje' => 'required|string',
        ]);

        $mensaje = Mensaje::create([
            'nombre' => $request->nombre,
            'mensaje' => $request->mensaje,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $mensaje,
            'message' => '¡Deseo guardado correctamente!'
        ], 201);
    }
}
