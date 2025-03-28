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
        Schema::create('entreprises', function (Blueprint $table) {
            $table->id()->unsigned();;
            $table->string('nom', 150);
            $table->string('email', 150)->unique();
            $table->string('mot_de_passe');
            $table->string('adresse', 255);
            $table->string('telephone', 20);
            $table->timestamp('date_inscription')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entreprises');
    }
};
