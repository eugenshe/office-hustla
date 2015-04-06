<?php

namespace common\behaviors;

/**
 * TimestampFormattedBehavior adds ability to get formatted values of attributes 
 * and raw seconds
 * 
 * `created_at` and `updated_at` must be instances of @see \MongoDate
 */
class TimestampFormattedBehavior extends \yii\base\Behavior {

    public $format = 'Y-m-d';

    public function getCreatedAtFormatted() {
        if (!is_a($this->owner->created_at, 'MongoDate')) {
            return date($this->format, $this->owner->created_at);
        }
        return date($this->format, $this->owner->created_at->sec);
    }

    public function getUpdatedAtFormatted() {
        // TODO: remove this block once updated_at field will be fixed in db
        if (!is_a($this->owner->updated_at, 'MongoDate')) {
            return date($this->format, $this->owner->updated_at);
        }

        return date($this->format, $this->owner->updated_at->sec);
    }

    public function getCreatedAtRaw() {
        return $this->owner->created_at->sec;
    }

    public function getFormattedValue($value) {
        return date($this->format, $value);
    }
}