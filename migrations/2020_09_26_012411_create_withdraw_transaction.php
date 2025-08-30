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
        Schema::create('withdraw_transaction', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('wallet_id')
                ->index()
                ->unsigned();
            $table->bigInteger('withdraw_amount');
            $table->string('withdraw_status')
                ->index()
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
        Schema::dropIfExists('withdraw_transaction');
    }
};
