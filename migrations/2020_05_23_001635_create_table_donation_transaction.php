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
        Schema::create('transactions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('wallet_id')
                ->index()
                ->unsigned();
            $table->string('transaction_id')
                ->index();
            $table->integer('amount')
                ->default(0);
            $table->integer('current_balance')
                ->default(0);
            $table->string('type')
                ->nullable()
                ->index();
            $table->string('status')
                ->nullable();
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
        Schema::dropIfExists('transactions');
    }
};
