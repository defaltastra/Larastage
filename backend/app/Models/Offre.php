<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre', 'description', 'domaine', 'localisation', 'entreprise_id',
    ];

    // Relationship: An offre belongs to an entreprise
    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class);
    }

    // Relationship: An offre can have many candidatures
    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }

    // Relationship: An offre can have many stagiaires through candidatures
    public function stagiaires()
    {
        return $this->belongsToMany(Stagiaire::class, 'candidatures');
    }
}
