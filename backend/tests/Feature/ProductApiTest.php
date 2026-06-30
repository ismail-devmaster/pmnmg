<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    protected function getAdminUser(): User
    {
        return User::factory()->create(['role' => 'admin']);
    }

    protected function getClientUser(): User
    {
        return User::factory()->create(['role' => 'client']);
    }

    public function test_unauthenticated_user_cannot_access_products()
    {
        $this->getJson('/api/products')->assertStatus(401);
        $this->postJson('/api/products', [])->assertStatus(401);
    }

    public function test_client_can_list_products()
    {
        $client = $this->getClientUser();
        Product::factory()->count(3)->create();

        $response = $this->actingAs($client, 'sanctum')
            ->getJson('/api/products');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'description', 'price', 'created_at'],
                ],
            ]);
    }

    public function test_client_cannot_create_product()
    {
        $client = $this->getClientUser();

        $response = $this->actingAs($client, 'sanctum')
            ->postJson('/api/products', [
                'name' => 'New Product',
                'price' => 19.99,
            ]);

        $response->assertStatus(403);
    }

    public function test_admin_can_create_product()
    {
        $admin = $this->getAdminUser();

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/products', [
                'name' => 'New Product',
                'description' => 'A nice product',
                'price' => 19.99,
            ]);

        $response->assertStatus(201)
            ->assertJsonPath('data.name', 'New Product')
            ->assertJsonPath('data.price', 19.99);

        $this->assertDatabaseHas('products', [
            'name' => 'New Product',
            'price' => 19.99,
        ]);
    }

    public function test_admin_validation_on_create_product()
    {
        $admin = $this->getAdminUser();

        $response = $this->actingAs($admin, 'sanctum')
            ->postJson('/api/products', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'price']);
    }

    public function test_admin_can_update_product()
    {
        $admin = $this->getAdminUser();
        $product = Product::factory()->create([
            'name' => 'Old Name',
            'price' => 10.00,
        ]);

        $response = $this->actingAs($admin, 'sanctum')
            ->putJson("/api/products/{$product->id}", [
                'name' => 'New Name',
                'price' => 15.50,
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('data.name', 'New Name')
            ->assertJsonPath('data.price', 15.50);

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'name' => 'New Name',
            'price' => 15.50,
        ]);
    }

    public function test_admin_can_delete_product()
    {
        $admin = $this->getAdminUser();
        $product = Product::factory()->create();

        $response = $this->actingAs($admin, 'sanctum')
            ->deleteJson("/api/products/{$product->id}");

        $response->assertStatus(200)
            ->assertJson(['message' => 'Product deleted successfully']);

        $this->assertDatabaseMissing('products', [
            'id' => $product->id,
        ]);
    }

    public function test_product_not_found_on_update()
    {
        $admin = $this->getAdminUser();

        $response = $this->actingAs($admin, 'sanctum')
            ->putJson('/api/products/999', [
                'name' => 'New Name',
            ]);

        $response->assertStatus(404);
    }
}
