<?php

namespace App\Helpers;

class SecurityHelper
{
    /**
     * Sanitize string input to prevent XSS and injection attacks
     */
    public static function sanitizeString(string $input, int $maxLength = 255): string
    {
        // Trim whitespace
        $input = trim($input);

        // Limit length
        if (strlen($input) > $maxLength) {
            $input = substr($input, 0, $maxLength);
        }

        // Remove null bytes
        $input = str_replace("\0", '', $input);

        // HTML encode to prevent XSS
        return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    }

    /**
     * Sanitize search input specifically
     */
    public static function sanitizeSearchInput(string $input): string
    {
        $input = trim($input);

        // Limit search length
        if (strlen($input) > 255) {
            $input = substr($input, 0, 255);
        }

        // Remove dangerous characters but allow basic search operators
        $input = preg_replace('/[<>"\']/', '', $input);

        return $input;
    }

    /**
     * Validate and sanitize numeric ID
     */
    public static function validateNumericId($id): ?int
    {
        if (!is_numeric($id) || $id <= 0) {
            return null;
        }

        return (int) $id;
    }

    /**
     * Sanitize file name for uploads
     */
    public static function sanitizeFileName(string $filename): string
    {
        // Remove path traversal attempts
        $filename = basename($filename);

        // Remove dangerous characters
        $filename = preg_replace('/[^a-zA-Z0-9._-]/', '', $filename);

        // Limit length
        if (strlen($filename) > 255) {
            $filename = substr($filename, 0, 255);
        }

        return $filename;
    }

    /**
     * Validate email address
     */
    public static function validateEmail(string $email): bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Generate secure random token
     */
    public static function generateSecureToken(int $length = 32): string
    {
        return bin2hex(random_bytes($length));
    }

    /**
     * Check if string contains potentially dangerous content
     */
    public static function containsDangerousContent(string $input): bool
    {
        $dangerousPatterns = [
            '/<script/i',
            '/javascript:/i',
            '/vbscript:/i',
            '/onload/i',
            '/onerror/i',
            '/onclick/i',
            '/<iframe/i',
            '/<object/i',
            '/<embed/i',
            '/<link/i',
            '/<meta/i',
        ];

        foreach ($dangerousPatterns as $pattern) {
            if (preg_match($pattern, $input)) {
                return true;
            }
        }

        return false;
    }
}
