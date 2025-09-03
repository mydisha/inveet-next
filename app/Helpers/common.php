<?php

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

if (!function_exists('g')) {
    /**
     * Fail safe get for array or object
     *
     * @param mixed $data
     * @param mixed $key
     * @param mixed $default Optional
     *
     * @return mixed
     */
    function g($data, $key, $default = null)
    {
        if (is_object($data) && !($data instanceof Collection)) {
            if ($data instanceof Model) {
                if ($data->getAttribute($key)) {
                    return $data->getAttribute($key);
                }
            }

            return $data->$key ?? $default;
        } elseif (is_array($data) || $data instanceof Collection) {
            return isset($data[$key]) ? $data[$key] : $default;
        } else {
            return $default;
        }
    }
}
