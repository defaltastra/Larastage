<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Auth::extend('stagiaire', function ($app, $name, array $config) {
            // Assuming you are using session-based authentication
            $provider = $app['auth']->createUserProvider($config['provider']);
            return new SessionGuard($name, $provider, $app['session.store']);
        });
    }
}
