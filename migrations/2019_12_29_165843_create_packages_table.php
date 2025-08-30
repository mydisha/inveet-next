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
        Schema::create('packages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')
                ->nullable();
            $table->mediumText('description')
                ->nullable();
            $table->integer('price')
                ->index()
                ->default(0);
            $table->integer('discount')
                ->index()
                ->default(0);
            $table->boolean('is_recommended')
                ->index()
                ->default(false);
            $table->boolean('is_active')
                ->index()
                ->default(true);
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
        Schema::dropIfExists('packages');
    }
};
