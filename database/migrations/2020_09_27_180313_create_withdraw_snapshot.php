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
        Schema::create('withdraw_snapshot', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('withdraw_transaction_id')
                ->index();
            $table->string('account_name')
                ->nullable();
            $table->string('bank_name')
                ->nullable();
            $table->string('bank_account_number')
                ->nullable();
            $table->bigInteger('current_active_amount')
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
        Schema::dropIfExists('withdraw_snapshot');
    }
};
