<!DOCTYPE HTML>
<html lang="en" ng-app="fundator">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title ng-bind="pageTitle()">Fundator</title>

    <link rel="stylesheet" href="{!! asset('css/app/app.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app/vendor.css') !!}">

    <meta name="renderer" content="webkit">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="robots" content="none">

    {{--<link href="css/bootstrap.css" rel="stylesheet" type="text/css">--}}
    {{--<link href="css/main.css" rel="stylesheet" type="text/css">--}}
    {{--<link rel="stylesheet" href="IcoMoon/icoMoon.css" type="text/css">--}}
    {{--<link href="css/responsive.css" rel="stylesheet" type="text/css">--}}
</head>

<body>
    <header ui-view="header"></header>

    <div ui-view="main" class="main"></div>

    <footer ui-view="footer"></footer>

    <script src="{!! asset('js/app/jquery.min.js') !!}"></script>
    <script src="{!! asset('js/app/vendor.js') !!}"></script>
    <script src="{!! asset('js/app/app.js') !!}"></script>

    {{--livereload--}}
    @if ( Config::get('app.debug') )
        <script type="text/javascript">
            document.write('<script src="//localhost:35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
        </script>
    @endif
</body>
</html>