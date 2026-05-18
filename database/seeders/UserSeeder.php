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
            ['email' => 'jr.productoraevento@gmail.com'],
            [
                'name'              => 'Administrador',
                'email'             => 'jr.productoraevento@gmail.com',
                'password'          => Hash::make('productoraevento'),
                'email_verified_at' => now(),
            ]
        );
    }
}
