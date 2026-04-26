<?php

namespace App\Support;

class CurrencyInput
{
    public static function toInteger(mixed $value): int
    {
        if ($value === null || $value === '') {
            return 0;
        }

        if (is_int($value)) {
            return $value;
        }

        if (is_float($value)) {
            return (int) floor($value);
        }

        $stringValue = trim((string) $value);

        if ($stringValue === '') {
            return 0;
        }

        // Example: 32.000
        if (preg_match('/^\d{1,3}(\.\d{3})+$/', $stringValue) === 1) {
            return (int) str_replace('.', '', $stringValue);
        }

        // Example: 32000.00 (from decimal column cast)
        if (preg_match('/^\d+(\.\d+)?$/', $stringValue) === 1) {
            return (int) floor((float) $stringValue);
        }

        // Example: 32000,00
        if (preg_match('/^\d+(,\d+)?$/', $stringValue) === 1) {
            return (int) floor((float) str_replace(',', '.', $stringValue));
        }

        return (int) preg_replace('/[^0-9]/', '', $stringValue);
    }

    public static function formatThousands(mixed $value): string
    {
        $number = self::toInteger($value);

        return number_format($number, 0, ',', '.');
    }
}
