<?php
use yii\helpers\Html;
use frontend\assets\AppAsset;
use frontend\assets\AdminAsset;
use frontend\widgets\Alert;
use frontend\widgets\RequireJS;


/**
 * @var \yii\web\View $this
 * @var string $content
 */
AppAsset::register($this);
AdminAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body  data-controller="<?= Yii::$app->controller->id ?>" data-action="<?= Yii::$app->controller->action->id ?>">

<?php $this->beginBody() ?>

<div class="form-box" id="login-box">
    <?= Alert::widget() ?>
    <?= $content ?>
</div>

<!-- <script data-main="js/app" src="/js/lib/require.js"></script>-->
<?= RequireJS::widget(); ?>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
