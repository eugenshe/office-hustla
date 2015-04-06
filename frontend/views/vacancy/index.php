<?php
use yii\grid\GridView;
use yii\helpers\Html;

$this->title = 'Vacancy';
$this->params['breadcrumbs'][] = ['label' => 'Vacancies', 'url' => ['index']];


?>

<div class="row">
    <div class="col-lg-4">
        <?= $this->render('_search', ['model' => $searchModel]); ?>
    </div>
</div>

<?php
/* @var $dataProvider common\models\SearchVacancy */
echo GridView::widget([
    'dataProvider' => $dataProvider,
    'columns' => [
        ['class' => 'yii\grid\SerialColumn'],
        'name',
        'city',
        [
            'attribute' => 'createdAtFormatted',
            'label' => 'Created at',
        ],
        ['class' => 'yii\grid\ActionColumn', 'template' => '{view} {update} {delete}', 'headerOptions' => ['width' => 70]],
    ],
]);
?>