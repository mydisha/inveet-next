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
        Schema::create('invitation_message', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('invitation_message_uuid')
                ->index()
                ->nullable();
            $table->bigInteger('wedding_id')
                ->index()
                ->nullable();
            $table->string('title')
                ->nullable();
            $table->longText('message')
                ->nullable();
            $table->string('status')
                ->index()
                ->default('active');
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
        Schema::dropIfExists('invitation_message');
    }
};
