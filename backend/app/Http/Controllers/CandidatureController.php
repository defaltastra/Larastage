<?php

namespace App\Http\Controllers;

use App\Models\Candidature;
use Illuminate\Http\Request;

class CandidatureController extends Controller
{
    // Show the status of a candidate's application
    public function showStatus($id)
    {
        $candidature = Candidature::findOrFail($id);
        return view('candidatures.status', compact('candidature'));
    }

    // Update the status of a candidature
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|in:En attente,Accepté,Refusé',
        ]);

        $candidature = Candidature::findOrFail($id);
        $candidature->statut = $request->statut;
        $candidature->save();

        return redirect()->route('entreprise.applications', $candidature->offre_id)->with('success', 'Status updated');
    }
}

