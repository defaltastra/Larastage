<?php

namespace App\Http\Controllers;

use App\Models\Stagiaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Brian2694\Toastr\Facades\Toastr;

class StagiaireController extends Controller
{
    // Show registration form
    public function showRegistrationForm()
    {
        return view('stagiaire.register');
    }
    public function update(Request $request)
    {
        $stagiaire = Auth::guard('stagiaire')->user();
    
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|string|email|max:150|unique:stagiaires,email,' . $stagiaire->id,
            'domaine_etudes' => 'required|string|max:100',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);
    
        // If CV is uploaded, store it
        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store('cv', 'public'); 
            $validated['cv'] = $path; // Correct path, no extra "storage/"
        }
        
        
        // Update the stagiaire's profile
        $stagiaire->update($validated);
    
        Toastr::success('Profile updated successfully!', 'Success');
        return redirect()->route('stagiaire.dashboard');
    }
    
    // Handle registration
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|string|email|max:150|unique:stagiaires',
            'mot_de_passe' => 'required|string|min:8|confirmed',
            'domaine_etudes' => 'required|string|max:100',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);
        
        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store('public/cv');
            $validated['cv'] = str_replace('public/', 'storage/', $path);
        }
        
        // Manually hash the password using MD5
        $hashedPassword = md5($validated['mot_de_passe']);
    
        // Create the stagiaire and store the password hash (MD5)
        $stagiaire = Stagiaire::create([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'mot_de_passe' => $hashedPassword,  // Store MD5 hash
            'domaine_etudes' => $validated['domaine_etudes'],
            'cv' => $validated['cv'] ?? null,
        ]);
        
        // Log the stagiaire in
        Auth::login($stagiaire);
    
        // Return a success message
        return redirect()->route('index')->with('success', 'Registration successful!');
    }
    
    
    // Handle login with token (MD5 check)
    public function loginWithToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required|string'
        ]);
    
        // Retrieve stagiaire by email
        $stagiaire = Stagiaire::where('email', $request->input('email'))->first();
    
        if ($stagiaire) {
            // Hash the input password using MD5
            $hashedInputPassword = md5($request->input('mot_de_passe'));
    
            // Check if the MD5 hash of the input password matches the stored hash
            if ($hashedInputPassword === $stagiaire->mot_de_passe) {
                // Log in the stagiaire
                Auth::guard('stagiaire')->login($stagiaire);
                Toastr::success('Connexion réussie!', 'Bienvenue');
                return redirect()->route('stagiaire.dashboard');
            }
        }
    
        // If login fails
        Toastr::error('Identifiants invalides.', 'Erreur');
        return back();
    }

    // Show login form
    public function showLoginForm()
    {
        return view('stagiaire.login');
    }

    // Logout function
    public function logout(Request $request)
    {
        Auth::guard('stagiaire')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        Toastr::info('Vous avez été déconnecté.', 'Déconnexion');
        return redirect('/');
    }

    // Show dashboard
    public function dashboard()
    {
        $candidatures = Auth::guard('stagiaire')->user()
            ->candidatures()
            ->with(['offre.entreprise']) // Eager load the chain
            ->paginate(10);
        
        return view('stagiaire.dashboard', compact('candidatures'));
    }
    // Add this method to your existing StagiaireController
    public function storeCandidature(Request $request)
    {
        $request->validate([
            'offre_id' => 'required|exists:offres,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'portfolio' => 'nullable|url',
            'cv' => 'nullable|file|mimes:pdf,doc,docx', // Make it nullable
            'cover_letter' => 'nullable|string',
        ]);
    
        $stagiaire = Auth::guard('stagiaire')->user();
    
        $cvUrl = $request->existing_cv;
        
        if ($request->hasFile('cv')) {
            $path = $request->file('cv')->store('public/cv');
            $cvUrl = str_replace('public/', 'storage/', $path);
        }
    
        // Create the candidature
        $candidature = $stagiaire->candidatures()->create([
            'offre_id' => $request->offre_id,
            'name' => $request->name,
            'email' => $request->email,
            'portfolio' => $request->portfolio,
            'cv' => $cvUrl,
            'cover_letter' => $request->cover_letter,
            'statut' => 'En attente',
        ]);
    
        Toastr::success('Your application has been submitted successfully!', 'Success');
        return redirect()->back();
    }
}
