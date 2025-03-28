<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use App\Models\Offre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class EntrepriseController extends Controller
{
    // Register an entreprise
    public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:150',
            'email' => 'required|string|email|max:150|unique:entreprises',
            'mot_de_passe' => 'required|string|min:8|confirmed',
            'adresse' => 'required|string|max:255',
            'telephone' => 'required|string|max:20',
        ]);

        $entreprise = Entreprise::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'mot_de_passe' => Hash::make($request->mot_de_passe),
            'adresse' => $request->adresse,
            'telephone' => $request->telephone,
        ]);

        Auth::login($entreprise);
        
        return redirect()->route('entreprise.dashboard');
    }

    // Login an entreprise
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required|string',
        ]);

        if (Auth::attempt($request->only('email', 'mot_de_passe'))) {
            return redirect()->route('entreprise.dashboard');
        }

        return back()->withErrors(['email' => 'Invalid credentials']);
    }

    // Show entreprise's dashboard
    public function dashboard()
    {
        $entreprise = Auth::user();
        $offres = Offre::where('entreprise_id', $entreprise->id)->get();
        return view('entreprise.dashboard', compact('entreprise', 'offres'));
    }

    // Create a new offer
    public function createOffer(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:150',
            'description' => 'required|string',
            'domaine' => 'required|string|max:100',
            'localisation' => 'required|string|max:100',
        ]);

        $entreprise = Auth::user();

        Offre::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'domaine' => $request->domaine,
            'localisation' => $request->localisation,
            'entreprise_id' => $entreprise->id,
        ]);

        return redirect()->route('entreprise.dashboard')->with('success', 'Offer created successfully');
    }

    // View applications for an offer
    public function viewApplications($offreId)
    {
        $offre = Offre::findOrFail($offreId);
        $applications = $offre->candidatures;
        return view('entreprise.applications', compact('offre', 'applications'));
    }
}
