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
        Schema::create('wallet_transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('wallet_id')
                ->index()
                ->unsigned();
            $table->bigInteger('payment_id')
                ->index()
                ->unsigned();
            $table->bigInteger('amount')
                ->nullable();
            $table->string('sender_name')
                ->nullable();
            $table->string('sender_email')
                ->nullable();
            $table->text('description')
                ->nullable();
            $table->boolean('is_anonymous')
                ->nullable()
                ->default(false);
            $table->boolean('is_paid')
                ->default(false);
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
        Schema::dropIfExists('wallet_transactions');
    }
};
