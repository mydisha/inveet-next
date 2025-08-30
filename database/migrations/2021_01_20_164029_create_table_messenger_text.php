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
        Schema::create('messenger_text', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('wedding_id')
                ->index();
            $table->string('messenger_type')
                ->index()
                ->nullable();
            $table->longText('content')
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
        Schema::dropIfExists('messenger_text');
    }
};
