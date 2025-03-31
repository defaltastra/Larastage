<?php

namespace App\Http\Controllers;

use App\Models\Offre;
use App\Models\Candidature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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

    public function apply($id, Request $request)
    {
        // Fetch the authenticated user
        $user = Auth::user(); // You can also use `auth()->user()` if using helper methods

        // Find the job offer by ID
        $offre = Offre::findOrFail($id);

        // Check if the user already applied to this offer
        $existingApplication = Candidature::where('stagiaire_id', $user->id)
                                          ->where('offre_id', $offre->id)
                                          ->first();

        if ($existingApplication) {
            return response()->json([
                'success' => false,
                'message' => 'Vous avez déjà postulé pour cette offre.'
            ]);
        }

        // Create the new candidature (application)
        $candidature = Candidature::create([
            'stagiaire_id' => $user->id, // The ID of the currently logged-in user (stagiaire)
            'offre_id' => $offre->id,
            'statut' => 'En Attente', // Set status as "pending", you can modify this as per your workflow
        ]);

        // Return success message
        return response()->json([
            'success' => true,
            'message' => 'Candidature envoyée avec succès!',
            'data' => $candidature
        ]);
    }
    
    public function getCandidatures(Request $request)
    {
        // Get user ID from the request or from the authenticated user
        $userId = $request->input('stagiaire_id');  // Or fetch from Auth if needed
    
        // Fetch candidatures with the offer details
        $candidatures = DB::table('candidatures as c')
            ->join('offres as o', 'c.offre_id', '=', 'o.id')
            ->select('c.id', 'c.stagiaire_id', 'c.offre_id', 'c.statut', 'c.date_postulation', 'o.titre', 'o.description')
            ->where('c.stagiaire_id', $userId)
            ->get();
    
        return response()->json($candidatures);
    }
    

}