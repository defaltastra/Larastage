<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidature extends Model
{
    use HasFactory;

    protected $fillable = [
        'stagiaire_id', 'offre_id', 'statut',
    ];

    // Relationship: A candidature belongs to a stagiaire
    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class);
    }

    // Relationship: A candidature belongs to an offre
    public function offre()
    {
        return $this->belongsTo(Offre::class);
    }
}
