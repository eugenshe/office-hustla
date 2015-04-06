<?php
use yii\helpers\Url;
use yii\widgets\Menu;
use yii\helpers\Html;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use frontend\assets\AdminAsset;
use frontend\widgets\Alert;
use frontend\widgets\RequireJS;

/* @var $this \yii\web\View */
/* @var $content string */

$controller = \Yii::$app->controller->id;
AppAsset::register($this);
AdminAsset::register($this);

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title><?= Html::encode($this->title) ?></title>
    <?= Html::csrfMetaTags() ?>
    <?php $this->head() ?>
</head>

<body class="skin-black">
<?php $this->beginBody() ?>


<!-- header logo: style can be found in header.less -->
<header class="header">
    <a href="<?= Url::home(); ?>" class="logo">
        Office Hustla
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </a>
        <div class="navbar-right">
            <ul class="nav navbar-nav">
                <?php if (!Yii::$app->user->isGuest) { ?>
                    <li><a class="btn-btn-default" href="<?= Url::to(['site/logout']); ?>">Log Out</a></li>
                <?php } ?>
            </ul>
        </div>
    </nav>
</header>

<div class="wrapper row-offcanvas row-offcanvas-left">
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="left-side sidebar-offcanvas">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- search form -->
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search..."/>
					<span class="input-group-btn">
						<button type='submit' name='seach' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>
					</span>
                </div>
            </form>
            <!-- /.search form -->

            <?= Menu::widget([
                'options' => [ 'class' => 'sidebar-menu' ],
                'encodeLabels' => false,
                'submenuTemplate' => "\n<ul class=\"treeview-menu\">\n{items}\n</ul>\n",
                'items' => [
                    ['label' => '<i class="fa fa-dashboard"></i> <span>Dashboard</span>', 'url' => ['site/index']],
                    /*['label' => '<i class="fa fa-dashboard"></i> <span>Vacancies</span>', 'url' => ['vacancy/index'],],*/

                    ['label' => '<span>Vacancies</span><i class="fa fa-angle-left pull-right"></i>',
                        'url' => ['vacancy/index'], 'options' => ['class' => 'treeview'],
                        'active' => ($controller == 'vacancy'), 'items' => [
                        ['label' => 'List', 'url' => ['vacancy/index']],
                        ['label' => 'Create', 'url' => ['vacancy/create']],
                    ]],

                ],
            ]); ?>
        </section>
        <!-- /.sidebar -->
    </aside>

    <!-- Right side column. Contains the navbar and content of the page -->
    <aside class="right-side">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                <?= $this->title; ?>
            </h1>

            <?= Breadcrumbs::widget([
                'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
            ]) ?>

        </section>

        <!-- Main content -->
        <section class="content">

            <?= Alert::widget(); ?>
            <?= $content ?>

        </section><!-- /.content -->
        <footer>

        </footer>
    </aside><!-- /.right-side -->
</div><!-- ./wrapper -->

<?= RequireJS::widget(); ?>
<?php $this->endBody() ?>

</body>

</html>
<?php $this->endPage() ?>

