<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->json('timeline')->nullable()->after('description');
            $table->json('includes')->nullable()->after('timeline');
            $table->json('testimonials')->nullable()->after('includes');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['timeline', 'includes', 'testimonials']);
        });
    }
};
