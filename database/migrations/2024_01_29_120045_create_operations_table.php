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
        Schema::create('operations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('stock_id')->constrained();
            $table->enum('operation_type', ['buy', 'sell']);
            $table->integer('amount');
            
            // Дополнительные поля для покупки
            $table->double('single_stock_price')->nullable();
            $table->dateTime('bought_at')->nullable();
            $table->date('stock_from')->nullable();
            
            // Дополнительные поля для продажи
            $table->double('all_stock_price')->nullable();
            $table->dateTime('sell_at')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operations');
    }
};
