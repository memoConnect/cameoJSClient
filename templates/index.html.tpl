<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>cameoClient</title>

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/app.css">
    <link rel="stylesheet" href="css/font-awesome.css">

    <script data-main="base/main.js" src="vendor/requirejs/require.js"></script>
    <%= phonegapFiles %>
</head>
<body>
    <div cm-language-select style="text-align:right"></div>
    <div cm-notify></div>

    <div class="view-container container">
        <div ng-view class="view-frame center-block"></div>
    </div>
</body>
</html>