<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Stagiaire extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'stagiaires';
    protected $fillable = [
        'nom',
        'prenom', 
        'email',
        'mot_de_passe',
        'domaine_etudes',
        'cv'
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token'
    ];

    // Rename password field for Laravel auth
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

 

    // Accessor for CV URL
    public function getCvUrlAttribute()
    {
        return $this->cv ? asset('storage/' . $this->cv) : null;
    }

    // Relationship with candidatures
    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }

    // Relationship with offres through candidatures
    public function offres()
    {
        return $this->belongsToMany(Offre::class, 'candidatures')
                    ->withPivot('statut', 'created_at')
                    ->withTimestamps();
    }

    // Full name accessor
    public function getNomCompletAttribute()
    {
        return "{$this->prenom} {$this->nom}";
    }
}