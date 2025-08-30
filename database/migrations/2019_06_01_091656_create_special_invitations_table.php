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
        Schema::create('special_invitations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('wedding_id')
                ->nullable()
                ->index();
            $table->string('name')
                ->index();
            $table->mediumText('description')
                ->nullable();
            $table->string('slug')
                ->index();
            $table->boolean('is_active')
                ->default(true);
            $table->boolean('is_locked')
                ->default(false);
            $table->string('password')
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
        Schema::dropIfExists('special_invitations');
    }
};
