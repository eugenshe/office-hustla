<?php
    use yii\helpers\Html;
    use yii\widgets\ActiveForm;
?>

<?php $form = ActiveForm::begin([
    'id' => 'vacancy-form',
    'fieldConfig' => [
        'template' => '<div class="form-group">{input}{error}</div>',
    ],
]); ?>

    <div class="body bg-gray" style="width: 400px;">
        <?= $form->field($model, 'name', ['inputOptions' => [
            'class' => 'form-control',
            'placeholder' => 'Name']
        ]); ?>

        <?= $form->field($model, 'city', ['inputOptions' => [
            'class' => 'form-control',
            'placeholder' => 'City']
        ]); ?>

        <?= $form->field($model, 'type', ['inputOptions' => [
            'class' => 'form-control',
            'placeholder' => 'Type']
        ]); ?>

        <button type="submit" class="btn bg-olive btn-block">Done</button>
    </div>
<?php ActiveForm::end(); ?>