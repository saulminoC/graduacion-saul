<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    use HasFactory;

    // Aquí le decimos a Laravel qué campos se pueden llenar de forma masiva
    protected $fillable = [
        'nombre',
        'mensaje',
    ];
}
