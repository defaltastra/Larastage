<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StagiaireController;
use App\Http\Controllers\EntrepriseController;
use App\Http\Controllers\OffreController;

// Public Pages
Route::get('/', function () {
    return view('index'); // This will serve your React app
})->name('index');

Route::get('/contact', function () {
    return view('contact');
})->name('contact');

// API Routes
Route::prefix('api')->group(function() {
    // Public API routes
    Route::get('/offres', [OffreController::class, 'index'])->name('api.offres.index');
    Route::get('/offres/{offre}', [OffreController::class, 'show'])->name('api.offres.show');
    Route::get('/companies', [EntrepriseController::class, 'index'])->name('api.companies.index');
    
    // Stagiaire (Candidate) Authentication & API
    Route::prefix('stagiaire')->group(function() {
        Route::post('/login', [StagiaireController::class, 'loginWithToken']);
        Route::post('/register', [StagiaireController::class, 'register']);
        
        Route::middleware('auth:stagiaire')->group(function() {
            Route::get('/dashboard', [StagiaireController::class, 'dashboard']);
            Route::post('/logout', [StagiaireController::class, 'logout']);
            Route::put('/update', [StagiaireController::class, 'update']);
            Route::post('/candidatures', [StagiaireController::class, 'storeCandidature']);
        });
    });
    
    // Entreprise (Company) Authentication & API
    Route::prefix('entreprise')->group(function() {
        Route::post('/register', [EntrepriseController::class, 'register']);
        Route::post('/login', [EntrepriseController::class, 'login']);
        
        Route::middleware('auth:entreprise')->group(function() {
            Route::get('/dashboard', [EntrepriseController::class, 'dashboard']);
            Route::post('/logout', [EntrepriseController::class, 'logout']);
            Route::post('/offre/create', [EntrepriseController::class, 'createOffer']);
            Route::get('/offre/{offreId}/applications', [EntrepriseController::class, 'viewApplications']);
        });
    });
});

// These routes will be handled by React Router in your frontend
Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');