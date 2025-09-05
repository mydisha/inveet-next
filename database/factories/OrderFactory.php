<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'package_id' => 1,
            'wedding_id' => \App\Models\Wedding::factory(),
            'invoice_number' => $this->faker->unique()->numerify('INV-####'),
            'total_price' => $this->faker->numberBetween(100000, 1000000),
            'unique_price' => 0,
            'discount_amount' => 0,
            'subtotal' => $this->faker->numberBetween(100000, 1000000),
            'payment_type' => 'credit_card',
            'is_paid' => false,
            'is_void' => false,
            'status' => 'pending',
        ];
    }
}
