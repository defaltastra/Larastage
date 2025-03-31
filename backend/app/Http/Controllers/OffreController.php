<?php

namespace App\Http\Controllers;

use App\Models\Offre;
use Illuminate\Http\Request;

class OffreController extends Controller
{
    public function index()
    {
        $offres = Offre::query()
            ->when(request('search'), function($query) {
                $query->where('titre', 'like', '%'.request('search').'%')
                      ->orWhere('description', 'like', '%'.request('search').'%');
            })
            ->when(request('localisation'), function($query) {
                $query->where('localisation', request('localisation'));
            })
            ->when(request('domaine'), function($query) {
                $query->where('domaine', request('domaine'));
            })
            ->when(request('sort') == 'newest', function($query) {
                $query->orderBy('created_at', 'desc');
            })
            ->when(request('sort') == 'oldest', function($query) {
                $query->orderBy('created_at', 'asc');
            })
            ->with('entreprise')
            ->paginate(10);
            
        return response()->json([
            'success' => true,
            'data' => $offres->items(),
            'pagination' => [
                'total' => $offres->total(),
                'per_page' => $offres->perPage(),
                'current_page' => $offres->currentPage(),
                'last_page' => $offres->lastPage(),
                'from' => $offres->firstItem(),
                'to' => $offres->lastItem()
            ],
            'filters' => [
                'search' => request('search'),
                'localisation' => request('localisation'),
                'domaine' => request('domaine'),
                'sort' => request('sort')
            ]
        ]);
    }

    public function show(Offre $offre)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $offre->id,
                'titre' => $offre->titre,
                'description' => $offre->description,
                'domaine' => $offre->domaine,
                'localisation' => $offre->localisation,
                'created_at' => $offre->created_at,
                'updated_at' => $offre->updated_at,
                'entreprise' => [
                    'id' => $offre->entreprise->id,
                    'name' => $offre->entreprise->name,
                    'logo' => $offre->entreprise->logo,
                    'description' => $offre->entreprise->description,
                    'verified' => $offre->entreprise->verified
                ]
            ]
        ]);
    }

    public function apply(Offre $offre, Request $request)
{
    // Assuming the user is authenticated
    $user = $request->user();

    // Here, you would save the application in the database
    // For example, if you have an `applications` table:
    $user->applications()->create([
        'offre_id' => $offre->id,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Votre candidature a été envoyée avec succès!'
    ]);
}

}