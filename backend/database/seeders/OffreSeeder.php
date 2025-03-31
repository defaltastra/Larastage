<?php

namespace Database\Seeders;

use App\Models\Entreprise;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class OffreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get a random entreprise from the database to associate with the offre
        $entreprise = Entreprise::inRandomOrder()->first();

        DB::table('offres')->insert([
            [
                'titre' => 'Junior Software Developer',
                'description' => 'Join our growing team of software developers at TechCorp. Work with the latest technologies and build innovative solutions.',
                'domaine' => 'Software Development',
                'localisation' => 'San Francisco, CA',
                'entreprise_id' => $entreprise->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titre' => 'Marketing Intern',
                'description' => 'Assist with digital marketing campaigns, social media management, and content creation at GreenEnergy Solutions.',
                'domaine' => 'Marketing',
                'localisation' => 'New York, NY',
                'entreprise_id' => $entreprise->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titre' => 'Healthcare Research Assistant',
                'description' => 'Assist with ongoing medical research projects at MediLife. Work with a team of professionals to advance healthcare technologies.',
                'domaine' => 'Healthcare',
                'localisation' => 'Los Angeles, CA',
                'entreprise_id' => $entreprise->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}