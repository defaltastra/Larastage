<?php


namespace App\Http\Controllers;

use App\Models\Offre;
use Illuminate\Http\Request;

class OffreController extends Controller
{
    public function index()
    {
        // Change from ->get() to ->paginate()
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
            
        return view('offres.index', compact('offres'));
    }
    public function show(Offre $offre)
    {
        // Show a specific job offer
        return view('offres.show', compact('offre'));
    }
}