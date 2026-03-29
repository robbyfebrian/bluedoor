<?php

namespace App\Enums;

enum NewsletterSubscriptionStatus: string
{
    case PendingVerification = 'pending_verification';
    case Subscribed = 'subscribed';
    case Unsubscribed = 'unsubscribed';

    /**
     * @return array<self>
     */
    public function allowedTransitions(): array
    {
        return match ($this) {
            self::PendingVerification => [self::Subscribed, self::Unsubscribed],
            self::Subscribed => [self::Unsubscribed],
            self::Unsubscribed => [self::Subscribed],
        };
    }

    public function canTransitionTo(self $target): bool
    {
        return in_array($target, $this->allowedTransitions(), true);
    }

    /**
     * @return array<string, string>
     */
    public static function options(): array
    {
        return [
            self::PendingVerification->value => 'Pending Verification',
            self::Subscribed->value => 'Subscribed',
            self::Unsubscribed->value => 'Unsubscribed',
        ];
    }
}