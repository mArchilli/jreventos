<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@jreventos.com'],
            [
                'name'              => 'Administrador',
                'email'             => 'admin@jreventos.com',
                'password'          => Hash::make('1234'),
                'email_verified_at' => now(),
            ]
        );
    }
}
