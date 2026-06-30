<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_unauthenticated_user_cannot_access_users_list()
    {
        $this->getJson('/api/users')->assertStatus(401);
    }

    public function test_client_cannot_access_users_list()
    {
        $client = User::factory()->create(['role' => 'client']);

        $response = $this->actingAs($client, 'sanctum')
            ->getJson('/api/users');

        $response->assertStatus(403);
    }

    public function test_admin_can_access_users_list()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        User::factory()->count(2)->create(['role' => 'client']);

        $response = $this->actingAs($admin, 'sanctum')
            ->getJson('/api/users');

        // Note: The count is 3 because the admin is also in the users table
        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'email', 'role', 'created_at'],
                ],
            ]);
    }
}
