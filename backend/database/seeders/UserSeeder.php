<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@app.com',
            'role' => 'admin',
        ]);

        User::factory()->create([
            'name' => 'Client One',
            'email' => 'client1@app.com',
            'role' => 'client',
        ]);

        User::factory()->create([
            'name' => 'Client Two',
            'email' => 'client2@app.com',
            'role' => 'client',
        ]);
    }
}
