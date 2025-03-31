<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StagiaireController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\OffreController;

// Public contact route
Route::get('/contact', function () {
    return view('contact');
})->name('contact');

// API Routes for public and authenticated users
Route::prefix('api')->group(function() {
    // Public API routes
    Route::get('/offres', [OffreController::class, 'index'])->name('api.offres.index');
    Route::get('/offres/{offre}', [OffreController::class, 'show'])->name('api.offres.show');
    Route::get('/companies', [EntrepriseController::class, 'index'])->name('api.companies.index');

    Route::post('/offres/{offre}/apply', [OffreController::class, 'apply']);
    


    // Stagiaire (Candidate) Authentication & API
    Route::prefix('stagiaire')->group(function() {
        Route::post('/login', [StagiaireController::class, 'loginWithToken']);
        Route::post('/register', [StagiaireController::class, 'register']);
        
            Route::get('/cv', [StagiaireController::class, 'getCv']);
            Route::get('/candidatures', [StagiaireController::class, 'getApplications']);
            Route::post('/cv/upload', [StagiaireController::class, 'uploadCv']); // For uploading CV
            Route::post('/logout', [StagiaireController::class, 'logout']);
            Route::get('/dashboard', [StagiaireController::class, 'dashboard']);
            Route::put('/update', [StagiaireController::class, 'update']);
            Route::post('/candidatures', [StagiaireController::class, 'storeCandidature']);
    });

    // Entreprise (Company) Authentication & API
    Route::prefix('entreprise')->group(function() {
        // Public routes
        Route::post('/register', [EntrepriseController::class, 'register']);
        Route::post('/login', [EntrepriseController::class, 'login']);
        
        // Routes that require authentication
        Route::middleware('auth:entreprise')->group(function() {
            Route::get('/dashboard', [EntrepriseController::class, 'dashboard']);
            Route::post('/logout', [EntrepriseController::class, 'logout']);
            Route::post('/offre/create', [EntrepriseController::class, 'createOffer']);
            Route::get('/offre/{offreId}/applications', [EntrepriseController::class, 'viewApplications']);
        });
    });
});

// CSRF Token route for frontend to fetch
Route::get('/csrf-token', function (Request $request) {
    return Response::json([
        'csrfToken' => csrf_token(),
    ]);
});