<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Body background example</title>
    <style>
        html, body {
            margin: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body data-vide-bg="video/Koala">
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="../libs/jquery/dist/jquery.min.js"><\/script>')</script>
<script src="../src/jquery.vide.js"></script>
<link rel="stylesheet" href="http://zenrus.ru/css/main.css?v=29">
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">
<link rel="stylesheet" href="http://zenrus.ru/css/reset.css">
<script type="text/css">
    .quotes {
        text-align: center!important;
    }
</script>
<script>
    $(document).ready(function () {
       //$('.output').load('//zenrus.ru .usd .value');
        $.get('https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function(data){
            console.log(data);
        });

        function getMoney() {
           $.get('money.php', function(data){
               if(data.length) {
                   $('.usdd').text(data[2].sale.substring(0, 5));
                   $('.euro').text(data[1].sale.substring(0, 5));

               }
               console.log(data);
           }, 'json');
       }
        getMoney();

    });
</script>
    <div class="output"></div>
    <div class="quotes" style="margin-top: -86px; text-align: center">
        <div class="item usd" style="width: 33%;">
            <div class="value usdd" style="font-size: 136.129032258065px;"></div>
            <div class="note">гривень за долар</div>
        </div>
        <div class="item eur" style="width: 33%;">
            <div class="value euro" style="font-size: 136.129032258065px;"></div>
            <div class="note">гривень за евро</div>
        </div>
    </div>
</body>
</html>
