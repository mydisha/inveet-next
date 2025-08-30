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
        Schema::create('themes_images', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('themes_id')
                ->index();
            $table->string('image_path')
                ->nullable();
            $table->boolean('is_active')
                ->default(false);
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
        Schema::dropIfExists('themes_images');
    }
};
