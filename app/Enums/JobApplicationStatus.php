<?php

namespace App\Enums;

enum JobApplicationStatus: string
{
    case Pending = 'pending';
    case Reviewing = 'reviewing';
    case Shortlisted = 'shortlisted';
    case Rejected = 'rejected';
    case Hired = 'hired';

    /**
     * @return array<self>
     */
    public function allowedTransitions(): array
    {
        return match ($this) {
            self::Pending => [self::Reviewing],
            self::Reviewing => [self::Shortlisted],
            self::Shortlisted => [self::Hired, self::Rejected],
            self::Rejected, self::Hired => [],
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
            self::Pending->value => 'Pending',
            self::Reviewing->value => 'Reviewing',
            self::Shortlisted->value => 'Shortlisted',
            self::Rejected->value => 'Rejected',
            self::Hired->value => 'Hired',
        ];
    }
}