<?php
/**
 * Created by PhpStorm.
 * User: eugeny
 * Date: 12/1/14
 * Time: 8:35 PM
 */

namespace frontend\controllers;

use common\models\SearchVacancy;
use common\models\User;
use common\models\Vacancy;
use Yii;
use yii\base\InvalidParamException;
use yii\web\BadRequestHttpException;
use yii\web\HttpException;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

class VacancyController extends Controller {

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'actions' => ['index', 'create', 'update', 'view'],
                        'allow' => true,
                        'roles' => ['manager'],
                    ],
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['login','error'],
                        'allow' => true,
                    ],
                    [
                        'allow' => true,
                        'roles' => ['admin'],
                    ],

                ],
            ],
            /*'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],*/
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    public function actionIndex() {

        $searchModel = new SearchVacancy();
        $dataProvider = $searchModel->search(Yii::$app->request->getQueryParams());

        return $this->render('index', [
            'dataProvider' => $dataProvider,
            'searchModel' => $searchModel
        ]);
    }

    public function actionCreate() {

        $model = new Vacancy();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            $this->redirect('index');
        }

        return $this->render('create', array(
            'model' => $model
        ));
    }

    public function actionUpdate($id) {

        $model = Vacancy::findIdentity($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            $this->redirect('index');
        }

        return $this->render('update', array(
            'model' => $model
        ));
    }

    public function actionView($id) {

        return $this->render('view', array(
            'model' => Vacancy::findIdentity($id)
        ));

    }

} 