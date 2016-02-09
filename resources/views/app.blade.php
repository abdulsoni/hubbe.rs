<!DOCTYPE HTML>
<html lang="en" ng-app="fundator">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{!! config('app.site_name') !!}</title>

    <link rel="stylesheet" href="{!! asset('css/app/app.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app/vendor.css') !!}">

    <meta name="renderer" content="webkit">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="robots" content="none">
</head>

<body ng-class="{'navigation-is-open': isNavShown}">
    <header ui-view="header"></header>
    <div class="navigation" ui-view="navigation"></div>
    <main>
        <section class="body-content">
            <div class="container marginB60" ng-if="authenticated && user.registered == 1">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="flast-notice-list" ui-view="flashNotice"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-7 col-sm-12">
                        <div class="contest-list" ui-view="notifications"></div>
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
    </main>

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