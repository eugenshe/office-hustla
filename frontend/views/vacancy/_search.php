<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/**
 * @var yii\web\View $this
 * @var common\models\SearchVacancy $model
 * @var yii\widgets\ActiveForm $form
 */
?>

<div class="user-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'name') ?>
    <?= $form->field($model, 'city') ?>

    <!--<div class="form-group">
        <div class="checkbox">
            <?/*= Html::label(Html::checkbox('editedUsers', \Yii::$app->request->get('editedUsers', false), ['id' => 'editedUsers']) . 'Show only edited users', 'editedUsers'); */?>
        </div>
    </div>-->


    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>