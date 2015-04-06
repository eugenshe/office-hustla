<?php

$this->title = 'Update';
$this->params['breadcrumbs'][] = ['label' => 'Vacancies', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
echo $this->render('_form', ['model' => $model]);