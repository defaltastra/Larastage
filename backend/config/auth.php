<?php

use App\Models\Stagiaire;

return [

    'defaults' => [
        'guard' => 'stagiaire',  // Set default guard to 'stagiaire'
        'passwords' => 'stagiaire', // Specify the provider for password resets
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users', 
        ],
        'api' => [
            'driver' => 'sanctum',
            'provider' => 'stagiaire', 
            'hash'  => false,
        ],
        'stagiaire' => [
            'driver' => 'session',
            'provider' => 'stagiaire', 
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        // This should match the provider for 'stagiaire' guard
        'stagiaire' => [
            'driver' => 'eloquent',
            'model' => App\Models\Stagiaire::class,  // Reference the Stagiaire model
        ],
    ],

    'passwords' => [
        'stagiaire' => [
            'provider' => 'stagiaire',  // Ensure this references the 'stagiaire' provider
            'table' => 'password_reset_tokens_stagiaires',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,
];
