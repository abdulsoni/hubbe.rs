<!DOCTYPE HTML>
<html lang="en" ng-app="fundator">
<head>
    <base href="/">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <title>{!! config('app.site_name') !!}</title> -->
    <title>Fundator | Community of creators</title>
    <link rel="stylesheet" href="{!! asset('css/app/bootstrap.min.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app/chosen.min.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app/app.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app/vendor.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app/style.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app/font-awesome.min.css') !!}">
    
    <!-- <link rel="stylesheet" type="text/css" href="http://cloud.github.com/downloads/lafeber/world-flags-sprite/flags16.css" /> -->

    <meta name="renderer" content="webkit">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="robots" content="none">
</head>

<body class="" ng-class="{'navigation-is-open': isNavShown === 1, 'navigation-half-open': isNavShown === 0.5, 'homepage': $state.current.data.bodyClass === 'homepage'}" flow-prevent-drop>
    <fd-loader class="center fixed-center" ng-class="{'opacity_hide': !appLoading}"></fd-loader>

    <div class="opacity-hideable opacity_hide" ng-class="{'opacity_hide': appLoading}">
        <header ui-view="header"></header>
        <div class="navigation" ui-view="navigation"></div>

        <main>
            <section class="body-content">
                <!-- <div class="container">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="flast-notice-list" ui-view="flashNotice"></div>
                        </div>
                    </div>
                </div> -->
                <div class="notification-section container marginB30 ng-hide" ng-class="{'collapsed': notificationCollapse}"
                    ng-show="authenticated && user.registered === 1" ng-if="authenticated && user.registered === 1">
                    <div class="row">
                        <div class="col-md-7 col-sm-12">
                            <span class="notification-section-label">Notifications</span>
                            <div class="contest-list-wrap" ui-view="notifications"></div>
                        </div>
                        <div class="col-md-5 col-sm-12">
                            <span class="notification-section-label">Quick View</span>
                            <div class="advertisingArea" ui-view="quickUpdate"></div>
                        </div>

                        <div class="notification-section-toggle">
                            <span class="icon icon-shrink2" ng-click="collapseNotification(true)" ng-if="notificationCollapse === false"></span>
                            <span class="icon icon-enlarge2" ng-click="collapseNotification(false)" ng-if="notificationCollapse === true"></span>
                        </div>
                    </div>
                </div>

                <div class="container position-relative body-content-container">
                    <div ui-view="main" class="main-content"></div>
                </div>
            </section>

            <footer ui-view="footer"></footer>
        </main>
    </div>

    <script src="{!! asset('js/app/jquery.min.js') !!}"></script>
    <script src="{!! asset('js/app/chosen.jquery.min.js') !!}"></script>
    <script src="{!! asset('js/app/vendor.js') !!}"></script>
    <script src="{!! asset('js/app/app.js') !!}"></script>
    <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.css">
    <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2-bootstrap.css">
    <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/select2/3.4.8/select2.min.js"></script>

    <script type="text/javascript">
    //Select2
    $(function(){  
      var select = $('.selectui').select2({
        placeholder:'Innovation'
      });
    });        
    </script>
   
<style type="text/css">
.ui-select-container{
  position: relative;
  border-radius: 0px;
  background: #F2F2F2!important;
  border-color: #F2F2F2!important;
  box-shadow: none!important;
  min-height: 40px!important;
}

.ui-select-multiple.ui-select-bootstrap input.ui-select-search {
  margin: 5px 0px!important;
}



</style>

    {{--livereload--}}
    @if ( Config::get('app.debug') )
        <script type="text/javascript">
            document.write('<script src="//localhost:35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
        </script>
    @endif
</body>
</html>