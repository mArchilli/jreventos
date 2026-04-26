<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            // Sin FK formal para evitar dependencia circular con event_images
            $table->unsignedBigInteger('card_image_id')->nullable()->index()->after('testimonials');
            $table->unsignedBigInteger('hero_image_id')->nullable()->index()->after('card_image_id');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['card_image_id', 'hero_image_id']);
        });
    }
};
