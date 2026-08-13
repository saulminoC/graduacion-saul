<?php

namespace App\Http\Controllers;

use App\Models\Foto;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FotoController extends Controller
{
    public function index()
    {
        return response()->json(Foto::latest()->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
            'nombre' => 'required|string|max:100',
        ]);

        $archivo = $request->file('foto');

        // Sanitizamos el nombre para usarlo como carpeta (evita rutas raras o inyección de path)
        $carpeta = Str::slug($request->input('nombre'), '_');

        if (empty($carpeta)) {
            return response()->json(['status' => 'error', 'message' => 'Nombre inválido'], 422);
        }

        // Límite de 10 fotos por invitado, validado en servidor (no solo en el front)
        $yaSubidas = Foto::where('nombre', $carpeta)->count();
        if ($yaSubidas >= 10) {
            return response()->json(['status' => 'error', 'message' => 'Límite de 10 fotos alcanzado'], 422);
        }

        // Esto crea storage/app/public/invitados/{carpeta}/archivo.ext
        $rutaArchivo = $archivo->store("invitados/{$carpeta}", 'public');

        $foto = Foto::create([
            'ruta' => $rutaArchivo,
            'nombre' => $carpeta,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $foto,
            'message' => '¡Foto subida con éxito!'
        ], 201);
    }
}
