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
        Schema::create('reseller_info', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('reseller_account_id')->unsigned();
            $table->uuid('reseller_info_uuid')->index();
            $table->string('reseller_name');
            $table->string('reseller_avatar')->nullable();
            $table->string('instagram')->nullable();
            $table->string('facebook')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('twitter')->nullable();
            $table->string('website')->nullable();
            $table->timestamps();
        });

        Schema::table('reseller_info', function (Blueprint $table) {
            $table->foreign('reseller_account_id')->references('id')
                ->on('reseller_account')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reseller_info');
    }
};
