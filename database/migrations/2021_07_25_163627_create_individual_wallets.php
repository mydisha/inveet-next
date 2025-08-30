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
        Schema::create('individual_wallets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('wallet_uuid');
            $table->integer('wedding_id')
                ->index();
            $table->string('account_name')
                ->nullable();
            $table->string('account_number')
                ->nullable();
            $table->string('bank_name')
                ->nullable();
            $table->string('qrcode_url')
                ->nullable();
            $table->string('wallet_type')
                ->default('account');
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
        Schema::dropIfExists('individual_wallets');
    }
};
