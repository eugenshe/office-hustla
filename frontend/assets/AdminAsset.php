<?php

namespace frontend\assets;

use yii\web\AssetBundle;

class AdminAsset extends AssetBundle
{
    public $sourcePath = '@bower/';
    public $css = ['admin-lte/css/AdminLTE.css'];
    public $js = ['admin-lte/js/AdminLTE/app.js'];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
        'yii\bootstrap\BootstrapPluginAsset',
    ];
}