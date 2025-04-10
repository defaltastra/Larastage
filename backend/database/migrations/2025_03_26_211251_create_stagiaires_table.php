<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('stagiaires', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('email', 150)->unique();
            $table->string('mot_de_passe');
            $table->string('domaine_etudes', 100);
            $table->string('cv')->nullable(); // Lien vers le fichier CV
            $table->timestamp('date_inscription')->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrent()->onUpdate(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('created_at')->nullable()->useCurrent()->onUpdate(DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stagiaires');
    }
};
