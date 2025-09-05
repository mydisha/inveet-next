<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->string('xendit_invoice_id')->nullable()->after('payment_uuid');
            $table->string('xendit_external_id')->nullable()->after('xendit_invoice_id');
            $table->string('xendit_payment_method')->nullable()->after('xendit_external_id');
            $table->text('xendit_payment_url')->nullable()->after('xendit_payment_method');
            $table->decimal('amount', 15, 2)->nullable()->after('xendit_payment_url');
            $table->string('currency', 3)->default('IDR')->after('amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn([
                'xendit_invoice_id',
                'xendit_external_id',
                'xendit_payment_method',
                'xendit_payment_url',
                'amount',
                'currency',
            ]);
        });
    }
};
