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
        Schema::create('email_notifications', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_id')
                ->nullable()
                ->index();
            $table->string('email_notification_uuid')
                ->nullable()
                ->index();
            $table->string('subject')
                ->nullable();
            $table->longText('content')
                ->nullable();
            $table->string('recipient')
                ->nullable();
            $table->string('campaign')
                ->nullable()
                ->default('inveet')
                ->index();
            $table->string('state')
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
        Schema::dropIfExists('email_notifications');
    }
};
