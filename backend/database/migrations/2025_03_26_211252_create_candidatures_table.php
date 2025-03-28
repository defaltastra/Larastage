<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('candidatures', function (Blueprint $table) {
            $table->id();
            $table->foreignId('stagiaire_id')->constrained('stagiaires')->onDelete('cascade');
            $table->foreignId('offre_id')->constrained('offres')->onDelete('cascade');
            $table->enum('statut', ['En attente', 'Accepté', 'Refusé'])->default('En attente');
            $table->timestamp('date_postulation')->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrent()->onUpdate(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('created_at')->nullable()->useCurrent()->onUpdate(DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidatures');
    }
};
