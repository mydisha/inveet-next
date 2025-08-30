<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    protected $table = 'withdraw_transaction';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table($this->table, function (Blueprint $table) {
            $table->boolean('is_retry')
                ->default(false);
            $table->string('error_status')
                ->nullable();
            $table->text('error_description')
                ->nullable();
            $table->longText('callback_json')
                ->nullable();
            $table->string('guid')
                ->nullable();
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
            $table->dropColumn('error_status');
            $table->dropColumn('error_description');
            $table->dropColumn('callback_json');
            $table->dropColumn('guid');
        });
    }
};
