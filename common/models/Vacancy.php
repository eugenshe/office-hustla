<?php
namespace common\models;

use yii\base\NotSupportedException;
use yii\mongodb\ActiveRecord;

/**
 * User model
 *
 * @property integer $_id
 * @property string $name
 * @property string $status
 * @property string $type
 * @property string $city
 * @property integer $created_at
 * @property integer $updated_at
 */
class Vacancy extends ActiveRecord
{
    const STATUS_DELETED = 0;
    const STATUS_ACTIVE = 1;

    public function init() {

        parent::init();
        $this->created_at = new \MongoDate();
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'timestampFormatted' => [
                'class' => 'common\behaviors\TimestampFormattedBehavior',
                'format' => 'Y-m-d H:i',
            ],
            'timestamp' => [
                'class' => 'yii\behaviors\TimestampBehavior',
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['created_at', 'updated_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at'],
                ],
                'value' => function() {
                    return new \MongoDate();
                },
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['status', 'default', 'value' => self::STATUS_ACTIVE],
            ['status', 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_DELETED]],
            [['_id','name', 'status', 'created_at', 'updated_at', 'createdAtFormatted',
                'type', 'city'], 'safe'],

        ];
    }

    public function attributes() {
        return [
            '_id', 'name', 'status', 'created_at', 'updated_at',
            'type', 'city'
        ];
    }


    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return static::findOne($id);
    }


}
