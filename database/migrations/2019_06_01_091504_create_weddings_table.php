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
        Schema::create('weddings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('theme_id')
                ->nullable()
                ->unsigned()
                ->default(null)
                ->index();
            $table->integer('user_id')
                ->unsigned()
                ->index();
            $table->dateTime('wedding_start')
                ->nullable()
                ->index();
            $table->dateTime('wedding_end')
                ->nullable()
                ->index();
            $table->integer('view_count')
                ->default(0)
                ->nullable();
            $table->boolean('is_active')
                ->default(true);
            $table->boolean('is_draft')
                ->default(false);
            $table->boolean('is_published')
                ->default(false);
            $table->string('slug')
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
        Schema::dropIfExists('weddings');
    }
};
