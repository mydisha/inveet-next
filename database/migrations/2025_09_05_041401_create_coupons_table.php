<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('type', ['percentage', 'fixed']); // percentage or fixed amount
            $table->integer('value'); // percentage (0-100) or fixed amount in cents
            $table->integer('minimum_amount')->nullable(); // minimum order amount to use coupon
            $table->integer('maximum_discount')->nullable(); // maximum discount amount for percentage coupons
            $table->integer('usage_limit')->nullable(); // total usage limit (null = unlimited)
            $table->integer('usage_count')->default(0); // current usage count
            $table->integer('user_limit')->nullable(); // per-user usage limit (null = unlimited)
            $table->timestamp('starts_at')->nullable(); // coupon start date
            $table->timestamp('expires_at')->nullable(); // coupon expiration date
            $table->boolean('is_active')->default(true);
            $table->json('applicable_packages')->nullable(); // specific packages this coupon applies to
            $table->json('applicable_users')->nullable(); // specific users this coupon applies to
            $table->string('coupon_uuid')->unique();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['code', 'is_active']);
            $table->index(['starts_at', 'expires_at']);
            $table->index('coupon_uuid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
