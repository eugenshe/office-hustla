<?php
    use yii\helpers\Html;
    use yii\widgets\ActiveForm;
?>

<div class="header">Sign In</div>

<?php $form = ActiveForm::begin([
    'id' => 'login-form',
    'fieldConfig' => [
        'template' => '<div class="form-group">{input}{error}</div>',
    ],
]); ?>

<div class="body bg-gray">
    <?= $form->field($model, 'username', ['inputOptions' => [
        'class' => 'form-control',
        'placeholder' => 'Username']
    ]); ?>

    <?= $form->field($model, 'password', ['inputOptions' => [
        'class' => 'form-control',
        'placeholder' => 'Password']
    ])->passwordInput(); ?>

    <?= $form->field($model, 'rememberMe', [
        'template' => '<div class="form-group">{input}</div>',
    ])->checkbox() ?>

    <button type="submit" class="btn bg-olive btn-block">Log in</button>
</div>
<?php ActiveForm::end(); ?>