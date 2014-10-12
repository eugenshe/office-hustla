<?php

namespace console\controllers;
use Yii;
use yii\console\Controller;
use common\components\rbac\UserRoleRule;

class RbacController extends Controller {

    public function actionInit() {

        $auth = Yii::$app->authManager;
        $auth->removeAll(); //удаляем старые данные

        //Создадим для примера права для доступа к админке
        $dashboard = $auth->createPermission('dashboard');
        $about = $auth->createPermission('about');
        $dashboard->description = 'Админ панель';
        $auth->add($dashboard);
        $auth->add($about);

        //Включаем наш обработчик
        $rule = new UserRoleRule();
        $auth->add($rule);

        //Добавляем роли
        $employee = $auth->createRole('employee');
        $employee->description = 'Employee';
        $employee->ruleName = $rule->name;
        $auth->add($employee);

        $manager = $auth->createRole('manager');
        $manager->description = 'Manager';

        $manager->ruleName = $rule->name;
        $auth->add($manager);

        //Добавляем потомков
        $auth->addChild($manager, $employee);
        $auth->addChild($manager, $dashboard);
        $auth->addChild($manager, $about);

        $admin = $auth->createRole('admin');
        $admin->description = 'Admin';

        $admin->ruleName = $rule->name;

        $auth->add($admin);
        $auth->addChild($admin, $manager);
    }
}