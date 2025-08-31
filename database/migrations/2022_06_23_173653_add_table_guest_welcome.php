<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guest_welcome', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('wedding_id')->unsigned()
                ->index();
            $table->text('welcome_title')->nullable();
            $table->text('welcome_message')->nullable();
            $table->text('welcome_footer')->nullable();
            $table->text('welcome_background')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('guest_welcome');
    }
};
