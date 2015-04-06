<?php
namespace common\components\rbac;

use Yii;
use yii\rbac\Rule;
use yii\helpers\ArrayHelper;
use common\models\User;

class UserRoleRule extends Rule
{
    public $name = 'userRole';

    public function execute($user, $item, $params)
    {

        $user = ArrayHelper::getValue($params, 'user', User::findOne($user));

        if ($user) {

            $role = $user->role; //Значение из поля role базы данных

            if ($item->name === 'admin') {
                return $role == User::ROLE_ADMIN;
            } elseif ($item->name === 'manager') {
                //manager является потомком admin, который получает его права
                return $role == User::ROLE_ADMIN || $role == User::ROLE_MANAGER;
            }
            elseif ($item->name === 'employee') {
                return $role == User::ROLE_ADMIN || $role == User::ROLE_MANAGER || $role == User::ROLE_EMPLOYEE;
            }
        }else {
            if($item->name === 'guest') {
                return true;
            }
        }
        return false;
    }
}