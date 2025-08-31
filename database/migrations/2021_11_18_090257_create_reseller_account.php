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
        Schema::create('reseller_account', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('reseller_account_uuid')->index();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('socialite_id')->nullable();
            $table->string('socialite_name')->nullable();
            $table->string('socialite_avatar')->nullable();
            $table->string('phone_number', 20);
            $table->boolean('is_active')
                ->default(true);
            $table->rememberToken();
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
        Schema::dropIfExists('reseller_account');
    }
};
