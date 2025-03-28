<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Offre;
use App\Models\Entreprise;
use App\Models\Stagiaire;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Show the homepage with featured content
     *
     * @return \Illuminate\View\View
     */
    public function index()
{
    // Get latest job offers
    $latestOffers = Offre::with('entreprise')
        ->orderBy('date_publication', 'desc')
        ->take(6)
        ->get();

    // Get job offers grouped by domain
    $offersByDomain = Offre::select('domaine', DB::raw('COUNT(*) as count'))
        ->groupBy('domaine')
        ->orderBy('count', 'desc')
        ->take(5)
        ->get();

    // Get top companies with most job offers
    $topCompanies = Entreprise::withCount('offres')
        ->orderBy('offres_count', 'desc')
        ->take(4)
        ->get();

    // Get total statistics
    $totalStats = [
        'offers' => Offre::count(),
        'companies' => Entreprise::count(),
        'stagiaires' => Stagiaire::count(),
    ];

    return view('index', [
        'latestOffers' => $latestOffers,
        'offersByDomain' => $offersByDomain,
        'topCompanies' => $topCompanies,
        'totalStats' => $totalStats
    ]);
}
    /**
     * Search offers
     *
     * @param Request $request
     * @return \Illuminate\View\View
     */
    public function search(Request $request)
    {
        $query = Offre::query();

        if ($request->filled('keyword')) {
            $query->where('titre', 'like', '%' . $request->keyword . '%')
                  ->orWhere('description', 'like', '%' . $request->keyword . '%');
        }

        if ($request->filled('domaine')) {
            $query->where('domaine', $request->domaine);
        }

        if ($request->filled('localisation')) {
            $query->where('localisation', $request->localisation);
        }

        $offers = $query->with('entreprise')->paginate(10);

        return view('offers.search', [
            'offers' => $offers,
            'filters' => $request->all()
        ]);
    }

    /**
     * Show domains page
     *
     * @return \Illuminate\View\View
     */
    public function domains()
    {
        $domains = Offre::select('domaine')
            ->distinct()
            ->withCount('offres')
            ->get();

        return view('domains', [
            'domains' => $domains
        ]);
    }

    /**
     * Show companies page
     *
     * @return \Illuminate\View\View
     */
    public function companies()
    {
        $companies = Entreprise::withCount('offres')
            ->orderBy('offres_count', 'desc')
            ->paginate(12);

        return view('companies', [
            'companies' => $companies
        ]);
    }
}