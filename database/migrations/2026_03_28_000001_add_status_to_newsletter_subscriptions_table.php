<?php

use App\Enums\NewsletterSubscriptionStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('newsletter_subscriptions', function (Blueprint $table) {
            $table->enum('status', [
                NewsletterSubscriptionStatus::PendingVerification->value,
                NewsletterSubscriptionStatus::Subscribed->value,
                NewsletterSubscriptionStatus::Unsubscribed->value,
            ])->default(NewsletterSubscriptionStatus::PendingVerification->value)->after('name');
        });

        DB::table('newsletter_subscriptions')
            ->where('is_subscribed', true)
            ->whereNotNull('verified_at')
            ->update(['status' => NewsletterSubscriptionStatus::Subscribed->value]);

        DB::table('newsletter_subscriptions')
            ->where('is_subscribed', false)
            ->update(['status' => NewsletterSubscriptionStatus::Unsubscribed->value]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('newsletter_subscriptions', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
