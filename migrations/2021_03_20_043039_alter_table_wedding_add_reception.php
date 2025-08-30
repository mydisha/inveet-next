<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    protected $table = 'weddings';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table($this->table, function (Blueprint $table) {
            $table->boolean('is_show_reception')->default(true)->index();
            $table->boolean('is_show_ceremony')->default(false)->index();
            $table->boolean('is_show_public_comments')->default(false)->index();
            $table->integer('max_rsvp')->default(5);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table($this->table, function (Blueprint $table) {
            $table->dropColumn('is_show_reception');
            $table->dropColumn('is_show_ceremony');
            $table->dropColumn('is_show_public_comments');
            $table->dropColumn('max_rsvp');
        });
    }
};
