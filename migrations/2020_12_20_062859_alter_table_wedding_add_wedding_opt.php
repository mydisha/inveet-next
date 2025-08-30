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
            $table->string('name_position')
                ->default('female');
            $table->integer('max_show_gallery')
                ->default(6);
            $table->boolean('is_navbar_enabled')
                ->default(true);
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
            $table->dropColumn('name_position');
            $table->dropColumn('max_show_gallery');
            $table->dropColumn('is_navbar_enabled');
        });
    }
};
