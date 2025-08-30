<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id')
                ->index();
            $table->integer('package_id')
                ->index();
            $table->integer('wedding_id')
                ->index();
            $table->string('invoice_number')
                ->nullable()
                ->index();
            $table->bigInteger('total_price')
                ->index();
            $table->integer('unique_price')
                ->index();
            $table->string('payment_type')
                ->nullable()
                ->index();
            $table->boolean('is_paid')
                ->default(false)
                ->index();
            $table->timestamp('paid_at')
                ->nullable()
                ->index();
            $table->timestamp('expired_at')
                ->nullable()
                ->index();
            $table->boolean('is_void')
                ->default(false)
                ->index();
            $table->timestamp('void_at')
                ->nullable();
            $table->string('status')
                ->nullable()
                ->index();
            $table->timestamp('last_checked_at')
                ->nullable()
                ->index();
            $table->string('payment_url')
                ->nullable();
            $table->string('external_transaction_id')
                ->nullable()
                ->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
