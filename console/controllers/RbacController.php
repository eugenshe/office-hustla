<?php

namespace console\controllers;
use Yii;
use yii\console\Controller;
use common\components\rbac\UserRoleRule;

class RbacController extends Controller {

    public function actionInit() {

        $authManager = \Yii::$app->authManager;
        $authManager->removeAll();


        // Create roles
        $employee = $authManager->createRole('employee');
        $manager = $authManager->createRole('manager');

        // Create simple, based on action{$NAME} permissions
        $login  = $authManager->createPermission('login');
        $logout = $authManager->createPermission('logout');
        $error  = $authManager->createPermission('error');
        $signUp = $authManager->createPermission('sign-up');
        $index  = $authManager->createPermission('index');
        $view   = $authManager->createPermission('view');
        $update = $authManager->createPermission('update');
        $create = $authManager->createPermission('create');
        $delete = $authManager->createPermission('delete');

        // Add permissions in Yii::$app->authManager
        $authManager->add($login);
        $authManager->add($logout);
        $authManager->add($error);
        $authManager->add($signUp);
        $authManager->add($index);
        $authManager->add($view);
        $authManager->add($update);
        $authManager->add($delete);


        // Add rule, based on UserExt->group === $user->group
        $userGroupRule = new UserRoleRule();
        $authManager->add($userGroupRule);

        // Add rule "UserGroupRule" in roles
        $employee->ruleName  = $userGroupRule->name;
        $manager->ruleName = $userGroupRule->name;

        // Add roles in Yii::$app->authManager
        $authManager->add($employee);
        $authManager->add($manager);

        // Add permission-per-role in Yii::$app->authManager
        // employee
        $authManager->addChild($employee, $login);
        $authManager->addChild($employee, $logout);
        $authManager->addChild($employee, $error);
        $authManager->addChild($employee, $signUp);
        $authManager->addChild($employee, $index);
        $authManager->addChild($employee, $view);

        // manager
        $authManager->addChild($manager, $update);
        //$authManager->addChild($manager, $create);
        $authManager->addChild($manager, $delete);
        $authManager->addChild($manager, $employee);

    }
}