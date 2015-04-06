<?php
$this->title = 'Create';
$this->params['breadcrumbs'][] = ['label' => 'Vacancies', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
echo $this->render('_form', ['model' => $model]);