<?php

namespace App\Http\Controllers;

use App\Models\Stagiaire;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;

class StagiaireController extends Controller
{
    // Login with email and password (using MD5 hashed password)
    public function loginWithToken(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required|string'
        ]);

        $stagiaire = Stagiaire::where('email', $request->email)->first();

        // Check if the password matches using MD5
        if ($stagiaire && md5($request->mot_de_passe) === $stagiaire->mot_de_passe) {
            Auth::guard('stagiaire')->login($stagiaire);

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'user' => $stagiaire
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }

    // Register a new stagiaire (using MD5 for password hashing)
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:100',
            'prenom' => 'required|string|max:100',
            'email' => 'required|email|max:150|unique:stagiaires',
            'mot_de_passe' => 'required|string|min:8|confirmed',
            'domaine_etudes' => 'required|string|max:100',
            'cv' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        // Hash the password using MD5
        $validated['mot_de_passe'] = md5($validated['mot_de_passe']);

        // Store CV if uploaded
        if ($request->hasFile('cv')) {
            $validated['cv'] = $request->file('cv')->store('cv', 'public');
        }

        $stagiaire = Stagiaire::create($validated);
        Auth::guard('stagiaire')->login($stagiaire);

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'user' => $stagiaire
        ], 201);
    }

    // Logout the stagiaire
    public function logout(Request $request)
    {
        Auth::guard('stagiaire')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['success' => true]);
    }

    // Get the CV of the authenticated stagiaire
    public function getCv()
    {
        $stagiaire = Auth::guard('stagiaire')->user();

        // Check if user has uploaded a CV
        if ($stagiaire && $stagiaire->cv) {
            $cvUrl = Storage::url($stagiaire->cv); // Assuming the CV is stored in the 'public' disk
            return response()->json(['cv' => $cvUrl]);
        }

        return response()->json(['error' => 'No CV uploaded'], 404);
    }

    // Get all applications (candidatures) of the authenticated stagiaire
    public function getApplications()
    {
        $stagiaire = Auth::guard('stagiaire')->user();

        // Fetch applications for the authenticated user
        if ($stagiaire) {
            $applications = Application::where('stagiaire_id', $stagiaire->id)->get();
            return response()->json($applications);
        }

        return response()->json(['error' => 'No applications found'], 404);
    }

    // Upload a new CV for the authenticated stagiaire
    public function uploadCv(Request $request)
    {
        $request->validate([
            'cv' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $stagiaire = Auth::guard('stagiaire')->user();

        if ($stagiaire) {
            if ($request->hasFile('cv')) {
                // Store the new CV file
                $path = $request->file('cv')->store('cv', 'public');
                $stagiaire->cv = $path;
                $stagiaire->save();

                // Log the response or dump to inspect it
                Log::info('CV uploaded successfully', ['cv_path' => $path]);

                return response()->json(['cv' => Storage::url($path)]);
            }
        }

        // If upload fails
        return response()->json(['error' => 'Unable to upload CV'], 400);
    }
}
