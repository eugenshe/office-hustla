<?php
$url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';

function getMoney($url) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);

    $data = curl_exec($ch);
    curl_close($ch);

    echo $data;
}
getMoney($url);
?>