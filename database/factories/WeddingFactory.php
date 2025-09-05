<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Wedding>
 */
class WeddingFactory extends Factory
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
            'theme_id' => 1,
            'wedding_start' => $this->faker->dateTimeBetween('+1 month', '+6 months'),
            'wedding_end' => $this->faker->dateTimeBetween('+1 month', '+6 months'),
            'view_count' => $this->faker->numberBetween(0, 1000),
            'is_active' => true,
            'is_draft' => false,
            'is_published' => true,
            'slug' => $this->faker->slug(),
        ];
    }
}
