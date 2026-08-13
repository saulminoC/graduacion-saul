<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MensajeController;
use App\Http\Controllers\CancionController;
use App\Http\Controllers\FotoController;

// Rutas para el Libro de Deseos
Route::get('/mensajes', [MensajeController::class, 'index']);
Route::post('/mensajes', [MensajeController::class, 'store']);

// Rutas para las Recomendaciones Musicales
Route::get('/canciones', [CancionController::class, 'index']);
Route::post('/canciones', [CancionController::class, 'store']);

// Rutas para la Galería de Fotos
Route::get('/fotos', [FotoController::class, 'index']);
Route::post('/fotos', [FotoController::class, 'store']);
