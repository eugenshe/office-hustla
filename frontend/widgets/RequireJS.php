<?php

namespace frontend\widgets;

/**
 * Renders RequireJS script based on ENV params
 */
class RequireJS extends \yii\base\Widget {

    protected $compiledPath;
    protected $src = '/js/lib/require.js';
    protected $mainScript = '/js/app';

    protected function useMinified() {
        return !empty(\Yii::$app->params['useMinifiedScripts']);
    }

    public function init() {
        if ($this->useMinified()) {
            $this->compiledPath = \Yii::getAlias('@webroot') . '/compiled/dist';

            $files = \yii\helpers\FileHelper::findFiles($this->compiledPath, ['only' => ['all*.js']]);
            
            if (empty($files)) {
                throw new \Exception("Unable to find minified scripts");
            }

            $this->mainScript = str_replace(\Yii::getAlias('@webroot'), '', array_pop($files));
        } 
    }

    public function run() {
        echo \yii\helpers\Html::script('', ['src' => $this->src, 'data-main' => $this->mainScript]);
    }
}
