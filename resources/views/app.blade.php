<!DOCTYPE HTML>
<html lang="en" ng-app="fundator">
<head>
    <base href="/">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <title>{!! config('app.site_name') !!}</title> -->
    <title>Fundator | Community of creators</title>
    <link rel="stylesheet" href="{!! asset('css/app/app.css') !!}">
    <link rel="stylesheet" href="{!! asset('css/app/vendor.css') !!}">

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
    <script src="http://code.jquery.com/jquery-1.10.2.js" type="text/javascript"></script>
    <script src="{!! asset('js/app/selectize.js') !!}"></script>
    <script src="{!! asset('js/app/angular-selectize.js') !!}"></script>
    <script src="{!! asset('js/app/vendor.js') !!}"></script>
    <script src="{!! asset('js/app/app.js') !!}"></script>

    <script type="text/javascript">
    $(function(){
        $(document).on('keyup blur change','[data-validate]', function(){
            $( ".form-control" ).focusin(function() {
                var e = $(this).next();
                $(e).find('.msg1').css('display','block');
            });
            $(".form-control").focusout(function(){
                var e = $(this).next();
                $(e).find('.msg1').css('display','none');
            });
            var getval = $(this).val();
            var getminl = $(this).data('minlength');
            var getmaxl = $(this).data('maxlength');
            var getInValue = $(this).data('validate');
            if (getval.length<=getminl-1) {
                $('[data-alertshow="'+getInValue+'"]').addClass('show2');
                if (getval.length<=0) {
                    $('[data-alertshow="'+getInValue+'"]').removeClass('show2');
                }   
            }
            else{
                $('[data-alertshow="'+getInValue+'"]').removeClass('show2');

                if (getval.length>=getmaxl) {
                    $('[data-alertshow="'+getInValue+'"]').addClass('show3');
                }
                else{   $('[data-alertshow="'+getInValue+'"]').removeClass('show3');}
            } 
        });


        $(document).on('mouseenter','.btn-save', function(){
            $('.onnext-msg2').show();
        });

        $(document).on('mouseout','.btn-save', function(){
            $('.onnext-msg2').hide();
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

.exclaiminate{
        position: relative;
        padding-right: 28px;
    }
    .inp-tool{
        width: 22px;
        height: 22px;
        font-size: 20px;
        line-height: 22px;
        text-align: center;
        position: absolute;
        right: 0px;
        top: 12px;
        cursor: pointer;
        color: #888;
    }
    .tooltip-inner{
        max-width: 300px;
    }
    .exclaiminate .msg-alert{
        width: 300px;
        position: absolute;
        border: 1px solid #000;
        z-index: 100;
        white-space: normal;
        background: #000;
        font-size: 14px;
        color: #fff;
        padding: 3px 10px 4px 10px;
        bottom: 20px;
        display: none;
}

/*display: too short*/
.show2 .msg-alert.msg2{ display: block;}
/*too long*/
.show3 .msg-alert.msg3{ display: block;}


.exclaiminate p:before{
    content: ' ';
    width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #000;
  position: absolute;
  bottom:-9px;
  left: 0px;
}
.exclaiminate span:hover .msg-alert.msg1{
    display: block;
}

.exclaiminate span.show2:hover .msg-alert.msg1,
.exclaiminate span.show3:hover .msg-alert.msg1{
    display: none;
}
.inptool{
    right:-22px!important;
    top:-5px!important;
}
.inptool1{
    right: -25px!important;
    top: -20px!important;
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
