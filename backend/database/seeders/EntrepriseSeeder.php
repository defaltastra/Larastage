<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EntrepriseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('entreprises')->insert([
            [
                'name' => 'TechCorp',
                'email' => 'contact@techcorp.com',
                'logo' => 'logos/techcorp.png',
                'description' => 'A leading tech company specializing in AI solutions.',
                'verified' => true,
                'sector' => 'Technology',
                'website' => 'https://www.techcorp.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'GreenEnergy Solutions',
                'email' => 'info@greenenergy.com',
                'logo' => 'logos/greenenergy.png',
                'description' => 'Providing renewable energy solutions worldwide.',
                'verified' => true,
                'sector' => 'Energy',
                'website' => 'https://www.greenenergy.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'MediLife',
                'email' => 'support@medilife.com',
                'logo' => 'logos/medilife.png',
                'description' => 'Innovating healthcare with cutting-edge medical devices.',
                'verified' => false,
                'sector' => 'Healthcare',
                'website' => 'https://www.medilife.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

}
