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
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('code')->unique(); // BDJ01, BDJ02, etc.
            $table->text('address');
            $table->string('city');
            $table->string('province');
            $table->string('postal_code')->nullable();
            $table->string('phone');
            $table->string('email')->nullable();
            $table->time('opening_time')->default('08:00:00');
            $table->time('closing_time')->default('22:00:00');
            $table->boolean('is_active')->default(true);
            $table->foreignId('manager_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
