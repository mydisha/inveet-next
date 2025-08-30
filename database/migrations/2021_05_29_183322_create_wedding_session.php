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
        Schema::create('wedding_session', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('wedding_id')
                ->index();
            $table->string('session_name')
                ->nullable();
            $table->string('start_time')
                ->nullable();
            $table->string('end_time')
                ->nullable();
            $table->string('status')
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
        Schema::dropIfExists('wedding_session');
    }
};
