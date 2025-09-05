<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

trait ApiResponseTrait
{
    /**
     * Return a success response.
     */
    protected function successResponse($data = null, string $message = 'Success', int $statusCode = Response::HTTP_OK): JsonResponse
    {
        $response = [
            'success' => true,
            'message' => $message,
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        return \response()->json($response, $statusCode);
    }

    /**
     * Return an error response.
     */
    protected function errorResponse(string $message = 'An error occurred', int $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR, $errors = null): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors !== null) {
            $response['errors'] = $errors;
        }

        if (\config('app.debug') && $statusCode === Response::HTTP_INTERNAL_SERVER_ERROR) {
            $response['debug'] = [
                'file' => debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1)[0]['file'] ?? 'Unknown',
                'line' => debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1)[0]['line'] ?? 'Unknown',
            ];
        }

        return \response()->json($response, $statusCode);
    }

    /**
     * Return a validation error response.
     */
    protected function validationErrorResponse(ValidationException $e): JsonResponse
    {
        return $this->errorResponse(
            'Validation failed',
            Response::HTTP_BAD_REQUEST,
            $e->errors()
        );
    }

    /**
     * Return a not found response.
     */
    protected function notFoundResponse(string $message = 'Resource not found'): JsonResponse
    {
        return $this->errorResponse($message, Response::HTTP_NOT_FOUND);
    }

    /**
     * Return an unauthorized response.
     */
    protected function unauthorizedResponse(string $message = 'Unauthorized'): JsonResponse
    {
        return $this->errorResponse($message, Response::HTTP_UNAUTHORIZED);
    }

    /**
     * Return a forbidden response.
     */
    protected function forbiddenResponse(string $message = 'Forbidden'): JsonResponse
    {
        return $this->errorResponse($message, Response::HTTP_FORBIDDEN);
    }

    /**
     * Handle exceptions and return appropriate error responses.
     */
    protected function handleException(\Exception $e, string $operation = 'operation'): JsonResponse
    {
        if ($e instanceof ValidationException) {
            return $this->validationErrorResponse($e);
        }

        // Log the exception for debugging
        \Illuminate\Support\Facades\Log::error("Exception in {$operation}: " . $e->getMessage(), [
            'exception' => $e,
            'trace' => $e->getTraceAsString()
        ]);

        return $this->errorResponse(
            "An error occurred while performing {$operation}",
            Response::HTTP_INTERNAL_SERVER_ERROR
        );
    }
}
