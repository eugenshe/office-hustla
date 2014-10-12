<?php
return [
    'dashboard' => [
        'type' => 2,
        'description' => 'Админ панель',
    ],
    'about' => [
        'type' => 2,
    ],
    'employee' => [
        'type' => 1,
        'description' => 'Employee',
        'ruleName' => 'userRole',
    ],
    'manager' => [
        'type' => 1,
        'description' => 'Manager',
        'ruleName' => 'userRole',
        'children' => [
            'employee',
            'dashboard',
            'about',
        ],
    ],
    'admin' => [
        'type' => 1,
        'description' => 'Admin',
        'ruleName' => 'userRole',
        'children' => [
            'manager',
        ],
    ],
];
