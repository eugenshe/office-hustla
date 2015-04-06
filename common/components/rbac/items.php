<?php
return [
    'login' => [
        'type' => 2,
    ],
    'logout' => [
        'type' => 2,
    ],
    'error' => [
        'type' => 2,
    ],
    'sign-up' => [
        'type' => 2,
    ],
    'index' => [
        'type' => 2,
    ],
    'view' => [
        'type' => 2,
    ],
    'update' => [
        'type' => 2,
    ],
    'delete' => [
        'type' => 2,
    ],
    'employee' => [
        'type' => 1,
        'ruleName' => 'userRole',
        'children' => [
            'login',
            'logout',
            'error',
            'sign-up',
            'index',
            'view',
        ],
    ],
    'manager' => [
        'type' => 1,
        'ruleName' => 'userRole',
        'children' => [
            'update',
            'delete',
            'employee',
        ],
    ],
];
