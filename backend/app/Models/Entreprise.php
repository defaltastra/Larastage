<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'email', 'mot_de_passe', 'adresse', 'telephone',
    ];

    // Hash password before saving
    protected static function booted()
    {
        static::creating(function ($entreprise) {
            $entreprise->mot_de_passe = bcrypt($entreprise->mot_de_passe);
        });
    }

    // Relationship: An entreprise can have many offres
    public function offres()
    {
        return $this->hasMany(Offre::class);
    }
}

