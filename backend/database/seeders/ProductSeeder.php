<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Wireless Mouse', 'description' => 'Ergonomic bluetooth mouse', 'price' => 25.50],
            ['name' => 'Mechanical Keyboard', 'description' => 'RGB backlit, blue switches', 'price' => 89.99],
            ['name' => '27" Monitor', 'description' => '4K UHD IPS Display', 'price' => 349.00],
            ['name' => 'USB-C Hub', 'description' => '7-in-1 adapter', 'price' => 45.00],
            ['name' => 'Webcam HD', 'description' => '1080p with built-in mic', 'price' => 60.00],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
