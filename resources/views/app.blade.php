<!DOCTYPE HTML>
<html lang="en" ng-app="fundator">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <title>{!! config('app.site_name') !!}</title> -->
    <title>Fundator | Community of creators</title>

    <link rel="stylesheet" href="{!! asset('css/app/chosen.min.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app/app.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app/vendor.css') !!}">
    <!-- <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha256-3dkvEK0WLHRJ7/Csr0BZjAWxERc5WH7bdeUya2aXxdU= sha512-+L4yy6FRcDGbXJ9mPG8MT/3UCDzwR9gPeyFNMCtInsol++5m3bk2bXWKdZjvybmohrAsn3Ua5x8gfLnbE1YkOg==" crossorigin="anonymous"> -->

    <meta name="renderer" content="webkit">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="robots" content="none">
</head>

<body class="ng-class:[$state.current.data.bodyClass]" ng-class="{'navigation-is-open': isNavShown === 1, 'navigation-half-open': isNavShown === 0.5}" flow-prevent-drop>
    <header ui-view="header"></header>
    <div class="navigation" ui-view="navigation"></div>

    <main>

        <section class="body-content">
            <div class="notification-section container marginB60 ng-hide" ng-show="authenticated && user.registered === 1" ng-if="authenticated && user.registered === 1">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="flast-notice-list" ui-view="flashNotice"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-7 col-sm-12">
                        <div class="contest-list-wrap" ui-view="notifications"></div>
                    </div>
                    <div class="col-md-5 col-sm-12">
                        <div class="advertisingArea" ui-view="quickUpdate"></div>
                    </div>

                </div>
            </div>

            <div class="container position-relative">
                <fd-loader class="center" ng-class="{'opacity_hide': !appLoading}"></fd-loader>
                <div class="opacity-hideable" ng-class="{'opacity_hide': appLoading}">
                    <div ui-view="main" class="main-content"></div>
                </div>
            </div>
        </section>

        <footer ui-view="footer"></footer>
    </main>

    <script src="{!! asset('js/app/jquery.min.js') !!}"></script>
    <script src="{!! asset('js/app/chosen.jquery.min.js') !!}"></script>
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