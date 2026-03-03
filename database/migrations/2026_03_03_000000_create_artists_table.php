<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->timestamps();
        });

        Schema::create('artist_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artist_id')->constrained('artists')->cascadeOnDelete();
            $table->string('filename');
            $table->boolean('is_main')->default(false);
            $table->unsignedSmallInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artist_images');
        Schema::dropIfExists('artists');
    }
};
