!function () {
    "use strict";
    angular.module("fundator", ["fundator.controllers", "fundator.filters", "fundator.services", "fundator.directives", "fundator.routes", "fundator.config"]);
    angular.module("fundator.routes", ["ui.router", "satellizer"]),
            angular.module("fundator.controllers", ["ngResource", "ngCookies", "ngAnimate", "ui.bootstrap", "ui.router", "satellizer", "angularMoment", "angular-owl-carousel", "ngImgCrop", "angularFileUpload", "bootstrapLightbox"]),
            angular.module("fundator.filters", ["ordinal"]),
            angular.module("fundator.services", ["ui.router"]),
            angular.module("fundator.directives", ["dibari.angular-ellipsis", "localytics.directives", "textAngular", "flow", "angular-ladda", "ngFlag", "oitozero.ngSweetAlert", "ui.bootstrap-slider", "Firestitch.angular-counter", "ui.select", "ngSanitize"]),
            angular.module("fundator.config", [])
}

(),
        function () {
            "use strict";
            angular.module("fundator.routes").config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function (e, t, o) {
                    var n = function (e, t) {
                        return"undefined" == typeof t && (t = e), "./views/app/app/" + e + "/" + t + ".html"
                    }
                    ;
                    t.otherwise("/projects"), e.state("app", {
                        "abstract": !0, views: {
                            header: {
                                templateUrl: n("header"), controller: "HeaderCtrl"
                            }
                            , navigation: {
                                templateUrl: n("header", "navigation"), controller: "NavigationCtrl"
                            }
                            , flashNotice: {
                                templateUrl: n("header", "flash-notice"), controller: "FlashNoticeCtrl"
                            }
                            , footer: {
                                templateUrl: n("footer"), controller: "FooterController"
                            }
                            , notifications: {
                                templateUrl: n("notifications", "notifications"), controller: "NotificationsCtrl"
                            }
                            , quickUpdate: {
                                templateUrl: n("quick-update", "quick-update"), controller: "QuickUpdateCtrl"
                            }
                            , main: {}
                        }
                    }
                    ).state("app.auth", {
                        url: "/auth", "abstract": !0
                    }
                    ).state("app.auth.login", {
                        url: "/login", data: {
                            needLogin: !1
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("auth", "login"), controller: "AuthCtrl"
                            }
                        }
                    }
                    ).state("app.auth.signup", {
                        url: "/signup", data: {
                            needLogin: !1
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("auth", "signup"), controller: "AuthCtrl"
                            }
                        }
                    }
                    ).state("app.auth.forgot", {
                        url: "/forgot", data: {
                            needLogin: !1
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("auth", "forgot"), controller: "AuthCtrl"
                            }
                        }
                    }
                    ).state("app.auth.recover", {
                        url: "/recover/?token&email", data: {
                            needLogin: !1
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("auth", "recover"), controller: "AuthRecoverCtrl"
                            }
                        }
                    }
                    ).state("app.auth.confirm", {
                        url: "/confirm/?code&email", data: {
                            needLogin: !1
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("auth", "confirm"), controller: "AuthConfirmCtrl"
                            }
                        }
                    }
                    ).state("app.auth.register", {
                        url: "/register", data: {
                            needLogin: !1
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("auth", "register"), controller: "RegisterCtrl"
                            }
                        }
                    }
                    ).state("app.projects", {
                        url: "/projects", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("project", "projects"), controller: "ProjectsCtrl"
                            }
                        }
                    }
                    ).state("app.project", {
                        url: "/project/:projectId", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("project", "project"), controller: "ProjectCtrl"
                            }
                        }
                    }
                    ).state("app.project.details", {
                        url: "/details", data: {
                            needLogin: !0
                        }
                        , views: {
                            "project-states": {
                                templateUrl: n("project", "project-details"), controller: "ProjectDetailsCtrl"
                            }
                        }
                    }
                    ).state("app.project.progress", {
                        url: "/progress", data: {
                            needLogin: !0
                        }
                        , views: {
                            "project-states": {
                                templateUrl: n("project", "project-progress"), controller: "ProjectProgressCtrl"
                            }
                        }
                    }
                    ).state("app.project.board", {
                        url: "/board", data: {
                            needLogin: !0
                        }
                        , views: {
                            "project-states": {
                                templateUrl: n("project", "project-board"), controller: "ProjectBoardCtrl"
                            }
                        }
                    }
                    ).state("app.project.team", {
                        url: "/team", data: {
                            needLogin: !0
                        }
                        , views: {
                            "project-states": {
                                templateUrl: n("project", "project-team"), controller: "ProjectTeamCtrl"
                            }
                        }
                    }
                    ).state("app.project.investors", {
                        url: "/investors", data: {
                            needLogin: !0
                        }
                        , views: {
                            "project-states": {
                                templateUrl: n("project", "project-investors"), controller: "ProjectInvestorsCtrl"
                            }
                        }
                    }
                    ).state("app.project.mytask", {
                        url: "/mytask", data: {
                            needLogin: !0
                        }
                        , views: {
                            "project-states": {
                                templateUrl: n("project", "project-mytask"), controller: "ProjectTaskCtrl"
                            }
                        }
                    }
                    ).state("app.contests", {
                        url: "/contests", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("contest"), controller: "ContestCtrl"
                            }
                        }
                    }
                    ).state("app.contest", {
                        url: "/contests/:contestId/:contestName", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("contest", "contest-single"), controller: "ContestSingleCtrl"
                            }
                        }
                    }
                    ).state("app.expert", {
                        url: "/expert", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("expert"), controller: "ExpertCtrl"
                            }
                        }
                    }
                    ).state("app.expertise", {
                        url: "/expertise/:expertiseId", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("expert", "expertise"), controller: "ExpertiseCtrl"
                            }
                        }
                    }
                    ).state("app.invest", {
                        url: "/invest", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("invest"), controller: "InvestCtrl"
                            }
                        }
                    }
                    ).state("app.investment", {
                        url: "/investment/:projectId", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("invest", "investment"), controller: "InvestmentCtrl"
                            }
                        }
                    }
                    ).state("app.create", {
                        url: "/create?projectId", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("create"), controller: "CreateCtrl"
                            }
                        }
                    }
                    ).state("app.create.details", {
                        url: "/details", data: {
                            needLogin: !0
                        }
                        , views: {
                            steps: {
                                templateUrl: n("create", "create-details"), controller: "CreateDetailsCtrl"
                            }
                        }
                    }
                    ).state("app.create.superexpert", {
                        url: "/super-expert", data: {
                            needLogin: !0
                        }
                        , views: {
                            steps: {
                                templateUrl: n("create", "create-super-expert"), controller: "CreateSECtrl"
                            }
                        }
                    }
                    ).state("app.create.expertise", {
                        url: "/expertise", data: {
                            needLogin: !0
                        }
                        , views: {
                            steps: {
                                templateUrl: n("create", "create-expertise"), controller: "CreateExpertiseCtrl"
                            }
                        }
                    }
                    ).state("app.create.experts", {
                        url: "/experts", data: {
                            needLogin: !0
                        }
                        , views: {
                            steps: {
                                templateUrl: n("create", "create-experts"), controller: "CreateExpertCtrl"
                            }
                        }
                    }
                    ).state("app.create.budget", {
                        url: "/budget", data: {
                            needLogin: !0
                        }
                        , views: {
                            steps: {
                                templateUrl: n("create", "create-budget"), controller: "CreateBudgetCtrl"
                            }
                        }
                    }
                    ).state("app.create.investors", {
                        url: "/investors", data: {
                            needLogin: !0
                        }
                        , views: {
                            steps: {
                                templateUrl: n("create", "create-investors"), controller: "CreateInvestorsCtrl"
                            }
                        }
                    }
                    ).state("app.transaction", {
                        url: "/transaction", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("transaction", "transaction"), controller: "TransactionCtrl"
                            }
                        }
                    }
                    ).state("app.grabshare", {
                        url: "/grab-a-share", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("invest", "grab-a-share"), controller: "GrabShareCtrl"
                            }
                        }
                    }
                    ).state("app.notifications", {
                        url: "/notifications", data: {
                            needLogin: !0
                        }
                        , views: {
                            "main@": {
                                templateUrl: n("contest"), controller: "ContestCtrl"
                            }
                        }
                    }
                    )
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.routes").run(["$rootScope", "$state", "$stateParams", "$auth", "$timeout", "$http", "$urlRouter", "$filter", "$cookies", "FdNotifications", "FdScroller", "API", function (e, t, o, n, a, r, i, s, c, d, l, u) {
                    e.$state = t, e.$stateParams = o, e.initialLocationSetup = !1, e.initialRoleAssignment = !1, e.activeRole = "", e.activeState = {
                        name: "app.projects"
                    }
                    , e.activeStateParams = {}
                    , e.appLoading = !0, e.notificationCollapse = !1, e.isNavShown = !1, e.collapseNotification = function (t) {
                        e.notificationCollapse = t
                    }
                    , e.toggleNavigation = function () {
                        e.isNavShown >= .5 ? e.isNavShown = 0 : e.isNavShown = .5
                    }
                    , e.$on("startLoading", function () {
                        e.appLoading = !0
                    }
                    ), e.$on("stopLoading", function () {
                        e.appLoading = !1
                    }
                    ), e.$on("$locationChangeSuccess", function (o) {
                        "undefined" == typeof e.user && e.initialLocationSetup !== !0 && (o.preventDefault(), n.isAuthenticated() ? (e.authenticated = !0, r.get(u.path("user?token=") + n.getToken()).then(function (o) {
                            if ("undefined" == typeof o.error)
                                if (e.user = o.data, d.init(), 0 == e.user.registered)
                                    e.initialRoleAssignment = !0, t.go("app.auth.register");
                                else {
                                    var n = e.user.role, a = e.user.role;
                                    "undefined" != typeof c.get("fd_active_role") && (a = c.get("fd_active_role"));
                                    var r = s("filter")(e.user.user_roles, {
                                        role: a
                                    }
                                    , !0);
                                    if ("undefined" != typeof r && r.length > 0) {
                                        var i = r[0];
                                        e.switchUserRole(i.role, i.id, !e.initialRoleAssignment)
                                    } else
                                        e.switchUserRole(n.role, n.id, !e.initialRoleAssignment)
                                }
                        }
                        , function () {
                            n.logout().then(function () {
                                localStorage.removeItem("fundator_token"), e.authenticated = !1, e.user = void 0
                            }
                            )
                        }
                        ), i.sync(), i.listen()) : e.authenticated = !1)
                    }
                    , function (t) {
                        n.logout().then(function () {
                            localStorage.removeItem("fundator_token"), e.authenticated = !1, e.user = void 0
                        }
                        )
                    }
                    ), e.$on("$stateChangeStart", function (o, a, r, i, s) {
                        if (n.isAuthenticated())
                            return void(e.initialRoleAssignment || -1 !== a.name.indexOf("auth") || (e.activeState = a, e.activeStateParams = r, o.preventDefault()));
                        var c = !1;
                        return c = "undefined" == typeof a.data.needLogin ? !0 : a.data.needLogin, void(c && (e.activeState = a, e.activeStateParams = r, o.preventDefault(), t.go("app.auth.login", {}
                        , {
                            reload: !0
                        }
                        )))
                    }
                    );
                    var p = function (e, t) {
                        return"undefined" == typeof t && (t = e), "./views/app/app/" + e + "/" + t + ".html"
                    }
                    ;
                    e.switchUserRole = function (o, n, a, i, d) {
                        if (!e.switchingUserRole) {
                            e.activeRole = o, c.put("fd_active_role", o), e.switchingUserRole = !0, console.log("callig switch ... "), "undefined" == typeof i && (i = t.current.name), "undefined" == typeof d && (d = t.current.params), e.initialRoleAssignment || (e.initialRoleAssignment = !0), "undefined" != typeof e.user && 0 === e.user.user_roles.length && e.user.user_roles.push({
                                id: null, name: o, role: o
                            }
                            );
                            var l = [{
                                    route: "app", view: "quickUpdate", roles: {
                                        creator: p("quick-update", "quick-update-creator"), expert: p("quick-update", "quick-update-expert"), investor: p("quick-update", "quick-update-investor"), jury: p("quick-update", "quick-update-jury")
                                    }
                                    , defaultTemplate: p("quick-update")
                                }
                                , {
                                    route: "app.contest", view: "main@", roles: {
                                        creator: p("contest", "contest-single-creator"), jury: p("contest", "contest-single-jury")
                                    }
                                    , defaultTemplate: p("contest", "contest-single")
                                }
                                , {
                                    route: "app.contests", view: "main@", roles: {
                                        creator: p("contest", "contest-creator"), jury: p("contest", "contest-jury")
                                    }
                                    , defaultTemplate: p("contest")
                                }
                                , {
                                    route: "app.projects", view: "main@", roles: {
                                        creator: p("project", "projects-creator"), expert: p("project", "projects-expert"), investor: p("project", "projects-investor"), super_expert: p("project", "projects-se")
                                    }
                                }
                            ];
                            angular.forEach(l, function (e) {
                                var n = e.roles[o], a = t.get(e.route).views[e.view];
                                "undefined" != typeof n ? a.templateUrl = n : a.templateUrl = e.defaultTemplate
                            }
                            );
                            var g = null;
                            if (null === n) {
                                var f = s("filter")(e.user.user_roles, {
                                    role: o
                                }
                                , !0);
                                if ("undefined" != typeof f && f.length > 0) {
                                    var o = f[0];
                                    n = o.id
                                }
                            }
                            switch (o) {
                                case"creator":
                                    g = u.path("creators/") + n;
                                    break;
                                case"expert":
                                    g = u.path("experts/") + n;
                                    break;
                                case"investor":
                                    g = u.path("investors/") + n
                            }
                            null !== g ? r.get(g).then(function (n) {
                                e.user[o] = n.data, "" === i && (i = e.activeState.name, d = e.activeStateParams), t.go(i, d, {
                                    reload: a
                                }
                                ), e.switchingUserRole = !1
                            }
                            ) : ("" === i && (i = e.activeState.name, d = e.activeStateParams), t.go(i, d, {
                                reload: a
                            }
                            ), e.switchingUserRole = !1)
                        }
                    }
                    , e.hasUserRole = function (t) {
                        if ("undefined" != typeof e.user) {
                            var o = s("filter")(e.user.user_roles, {
                                role: t
                            }
                            , !0);
                            if (o.length > 0)
                                return!0
                        }
                        return!1
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.config").config(["$animateProvider", function (e) {
                    e.classNameFilter(/fd-animate/)
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.config").config(["$authProvider", "APIProvider", function (e, t) {
                    var o = window.location.protocol + "//" + window.location.hostname + "/";
                    e.loginUrl = o + "/api/v1/authenticate", e.tokenPrefix = "fundator", e.linkedin({
                        clientId: "77zjxfbh2928re", url: o + "/api/v1/authenticate/linkedin", authorizationEndpoint: "https://www.linkedin.com/uas/oauth2/authorization", redirectUri: o, requiredUrlParams: ["state"], scope: ["r_emailaddress"], scopeDelimiter: " ", state: "STATE", type: "2.0", display: "popup", popupOptions: {
                            width: 452, height: 633
                        }
                    }
                    ), e.google({
                        clientId: "1042247727091-dmqc55af7tl58h2rqv3pqnrmjjbb9733.apps.googleusercontent.com", url: o + "/api/v1/authenticate/google", authorizationEndpoint: "https://accounts.google.com/o/oauth2/auth", redirectUri: o + "/api/v1/authenticate/google", requiredUrlParams: ["scope"], optionalUrlParams: ["display"], scope: ["profile", "email"], scopePrefix: "openid", scopeDelimiter: " ", display: "popup", type: "2.0", popupOptions: {
                            width: 452, height: 633
                        }
                    }
                    ), e.facebook({
                        clientId: "900533123395920", name: "facebook", url: o + "/api/v1/authenticate/facebook", authorizationEndpoint: "https://www.facebook.com/v2.5/dialog/oauth", redirectUri: o, requiredUrlParams: ["display", "scope"], scope: ["email"], scopeDelimiter: ",", display: "popup", type: "2.0", popupOptions: {
                            width: 580, height: 400
                        }
                    }
                    )
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.config").config(["flowFactoryProvider", "APIProvider", function (e, t) {
                    e.defaults = {
                        uploadMethod: "POST", target: t.$get().path("files"), permanentErrors: [404, 500, 501]
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.config").config(["$httpProvider", function (e) {}
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.config").config(["laddaProvider", function (e) {
                    e.setOption({
                        style: "expand-right", spinnerSize: 35, spinnerColor: "#ffffff"
                    }
                    )
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.directives").directive("fdChart", function () {
                return {
                    template: '<canvas id="fdChart" width="{{width}}" height="{{height}}"></canvas>', restrict: "E", transclude: !0, scope: {
                        data: "="
                    }
                    , link: function (e, t, o) {
                        e.width = o.width, e.height = o.height, t.find("canvas").width(o.width), t.find("canvas").height(o.height);
                        var n = [{
                                value: 4, color: "#006837", highlight: "#02753f", label: "Public"
                            }
                            , {
                                value: 96, color: "#94c44d", highlight: "#8cba47", label: "Fundator"
                            }
                        ], a = {
                            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], datasets: [{
                                    label: "Planned", fillColor: "transparent", strokeColor: "#A6A8AB", pointColor: "#006837", pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "#006837", data: [65, 60, 59, 63, 59, 58, 63, 64, 65, 66, 70, 79]
                                }
                                , {
                                    label: "Realized", fillColor: "transparent", strokeColor: "#A6A8AB", pointColor: "#93C658", pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: "#93C658", data: [28, 22, 16, 21, 17, 20, 27, 25, 23, 32, 40, 45]
                                }
                            ]
                        }
                        ;
                        if ("A" === o.data) {
                            var r = t.find("canvas")[0].getContext("2d");
                            new Chart(r).Pie(n, {
                                segmentShowStroke: !1, legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
                            }
                            );
                            t.find("canvas").after('<div class="pie-chart-labels"></div>'), jQuery(n).each(function (e, o) {
                                t.find("canvas + .pie-chart-labels").prepend('<div class="pie-chart-label"><span style="background-color: ' + o.color + ';"></span> ' + o.value + "% " + o.label + "</div>")
                            }
                            )
                        } else {
                            var r = t.find("canvas")[0].getContext("2d");
                            new Chart(r).Line(a, {
                                segmentShowStroke: !1, legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
                            }
                            );
                            t.find("canvas").after('<div class="line-chart-labels"></div>'), t.find("canvas + .line-chart-labels").prepend('<div class="line-chart-label"><span style="background-color: #006837;"></span> Realized</div>'), t.find("canvas + .line-chart-labels").prepend('<div class="line-chart-label"><span style="background-color: #93C658;"></span> Planned</div>')
                        }
                    }
                }
            }
            )
        }

(),
        function () {
            "use strict";
            angular.module("fundator.directives").directive("fdLoader", function () {
                return {
                    scope: {
                        viewBox: "@"
                    }
                    , restrict: "E", template: '<div class="fd-loader la-ball-pulse"><div></div><div></div><div></div></div>', link: function (e, t, o) {
                        t.addClass(o["class"])
                    }
                }
            }
            )
        }

(),
        function () {
            "use strict";
            angular.module("fundator.directives").directive("fdMessenger", ["$rootScope", "$resource", "$timeout", "API", function (e, t, o, n) {
                    return {
                        template: '<div class="chatbox" ng-if="threadId"><div class="chatRow" ng-repeat="message in messages"><div class="chat-userSendbox" ng-class="{\'chat-send\': user.id == message.user.id, \'chat-comein\': user.id != message.user.id}"><div class="chat-content">{{message.body}}</div></div><div class="caht-label" ng-class=\'{"text-right": user.id == message.user.id}\'>{{message.user.name}} <span>{{message.created_at | amDateFormat:"MMM Do YYYY"}}:</span></div></div><p class="no-have no-margin" ng-if="messages.length === 0">There are currently no messages.</p></div><form class="chatsendform" ng-if="threadId"><div class="input-group"><input type="text" class="form-control" placeholder="Enter your message here ..." ng-model="data.messageToSend" fd-enter="sendMessage()"><span class="input-group-addon sendbtn" ng-click="sendMessage()"><span class="glyphicon">Send</span></span></div></form>', restrict: "E", scope: {
                            threadId: "="
                        }
                        , link: function (a, r, i) {
                            a.data = {}
                            , a.messages = [], a.user = e.user;
                            var s = t(n.path("messages/:threadId"), {
                                threadId: "@id"
                            }
                            , {
                                get: {
                                    method: "GET", isArray: !0
                                }
                            }
                            );
                            a.$watch("threadId", function (e) {
                                "undefined" != typeof e && null !== e && s.get({
                                    threadId: a.threadId
                                }
                                ).$promise.then(function (e) {
                                    console.log("retriving the thread : " + a.threadId), a.messages = e, $(".chatbox").animate({
                                        scrollTop: 1e4
                                    }
                                    )
                                }
                                )
                            }
                            ), a.sendMessage = function () {
                                var e = new s;
                                e.thread_id = a.threadId, e.message = a.data.messageToSend, e.$save().then(function (e) {
                                    a.messages.push(e), a.data.messageToSend = "", o(function () {
                                        $(".chatbox").animate({
                                            scrollTop: 1e4
                                        }
                                        )
                                    }
                                    , 100)
                                }
                                )
                            }
                        }
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            function e(e) {
                return angular.isUndefined(e) || "" === e || null === e || e !== e
            }
            angular.module("fundator.directives").directive("ngMin", function () {
                return {
                    restrict: "A", require: "ngModel", link: function (t, o, n, a) {
                        t.$watch(n.ngMin, function () {
                            a.$setViewValue(a.$viewValue)
                        }
                        );
                        var r = function (o) {
                            console.log("minValidator");
                            var r = t.$eval(n.ngMin) || 0;
                            return console.log(r), console.log(o), console.log(!e(o) && r > o), !e(o) && r > o ? void a.$setValidity("ngMin", !1) : (a.$setValidity("ngMin", !0), o)
                        }
                        ;
                        a.$parsers.push(r), a.$formatters.push(r)
                    }
                }
            }
            ),
                    angular.module("fundator.directives").directive("ngMax", function () {
                return {
                    restrict: "A", require: "ngModel", link: function (t, o, n, a) {
                        t.$watch(n.ngMax, function () {
                            a.$setViewValue(a.$viewValue)
                        }
                        );
                        var r = function (o) {
                            console.log("maxValidator");
                            var r = t.$eval(n.ngMax) || 1 / 0;
                            return console.log(r), console.log(o), console.log(!e(o) && o > r), !e(o) && o > r ? void a.$setValidity("ngMax", !1) : (a.$setValidity("ngMax", !0), o)
                        }
                        ;
                        a.$parsers.push(r), a.$formatters.push(r)
                    }
                }
            }
            )
        }

(),
        function () {
            "use strict";
            angular.module("fundator.directives").filter("trustedHtml", ["$sce", function (e) {
                    return function (t) {
                        return e.trustAsHtml(t)
                    }
                }
            ]),
                    angular.module("fundator.directives").directive("fdEnter", function () {
                return function (e, t, o) {
                    t.bind("keydown keypress", function (t) {
                        13 === t.which && (e.$apply(function () {
                            e.$eval(o.fdEnter)
                        }
                        ), t.preventDefault())
                    }
                    )
                }
            }
            ),
                    angular.module("fundator.directives").directive("numbersOnly", function () {
                return {
                    require: "ngModel", link: function (e, t, o, n) {
                        n.$parsers.push(function (e) {
                            var t = e.toLowerCase().replace(/\D/g, "");
                            return t != e && (n.$setViewValue(t), n.$render()), t
                        }
                        )
                    }
                }
            }
            )
        }

(),
        function () {
            "use strict";
            angular.module("fundator.directives").directive("fdProfileInput", ["$compile", "$timeout", function (e, t) {
                    return {
                        restrict: "E", scope: {
                            form: "@", type: "@", required: "@", label: "@", ngModel: "=", placeholder: "@", facebookValue: "=", linkedinValue: "="
                        }
                        , controller: ["$scope", "$element", "$attrs", function (e, t, o) {
                                e.formError = "", e.conditions = [], e.isPristine = !0, e.validation = null, e.validationMessage = "", e.replaceValue = function (t) {
                                    e.ngModel = t
                                }
                            }
                        ], link: function (t, o, n) {
                            var a = {
                                text: '<input type="{{type}}" class="form-control" placeholder="{{placeholder}}" ng-model="ngModel">', textarea: '<textarea class="textarea form-control" placeholder="{{placeholder}}" ng-model="ngModel" rows="6"></textarea>'
                            }
                            , r = a[t.type], i = "";
                            "textarea" !== t.type && (i = '<div class="social-alternative"><span class="icon icon-facebook" uib-tooltip="{{facebookValue}}" ng-class="{\'checked\': (ngModel === facebookValue) && ngModel !== \'\'}" ng-disabled="!facebookValue" ng-click="replaceValue(facebookValue)"></span><span class="icon icon-linkedin2" uib-tooltip="{{linkedinValue}}" ng-class="{\'checked\': (ngModel === linkedinValue) && ngModel !== \'\'}" ng-disabled="!linkedinValue" ng-click="replaceValue(linkedinValue)"></span></div>');
                            var s = '<div><label>{{label}}:</label><div class="form-group">' + r + i + "</div></div>";
                            o.html(e(s)(t))
                        }
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.filters").filter("stripTags", function () {
                return function (e) {
                    if ("undefined" != typeof e) {
                        var t = new RegExp(String.fromCharCode(160), "g");
                        e = String(e).replace(t, " "), e = e.replace(/[^\x00-\x7F]/g, ""), e = e.replace(/&nbsp;/gi, " ")
                    }
                    return e ? String(e).replace(/<[^>]+>/gm, "") : ""
                }
            }
            ),
                    angular.module("fundator.filters").filter("cleanHtml", function () {
                return function (e) {
                    return"undefined" != typeof e && (e = e.replace(/[^\x00-\x7F]/g, "")), e
                }
            }
            )
        }

(),
        function () {
            "use strict";
            angular.module("fundator.services").factory("FdNotifications", ["$rootScope", "$q", "$interval", "$http", "$state", "API", function (e, t, o, n, a, r) {
                    var i = {
                        notifications: [], unread: 0
                    }
                    , s = function (e, t, o) {
                        i.notifications.unshift({
                            type: e, title: t, message: o
                        }
                        )
                    }
                    ;
                    return {
                        init: function (t) {
                            e.$watch("user", function (e) {
                                "undefined" != typeof e && ("undefined" != typeof t ? i = t : n.get(r.path("notifications/") + e.id).then(function (e) {
                                    i = e.data
                                }
                                ))
                            }
                            )
                        }
                        , getLatestNotifications: function () {
                            var e = t.defer(), n = o(function () {
                                if (i.notifications.length > 0) {
                                    var t = angular.copy(i);
                                    t.notifications = t.notifications.slice(0, 5), o.cancel(n), e.resolve(t)
                                }
                            }
                            , 1e3);
                            return e.promise
                        }
                        , readNotification: function (e) {
                            return n.post(r.path("notifications/") + notificationId + "/read").then(function (t) {
                                e.read = 1
                            }
                            )
                        }
                        , readAllNotifications: function () {
                            return n.post(r.path("notifications/user/") + e.user.id + "/read").then(function (e) {
                                i.unread = 0
                            }
                            )
                        }
                        , getNotifications: function () {
                            return notifications
                        }
                        , notify: function (e, t, o, n) {
                            toaster.pop(e, t, o), n && s(e, t, o)
                        }
                        , notifyError: function () {
                            toaster.pop("error", title, message), s(type, title, message)
                        }
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.services").factory("FdScroller", ["$window", function (e) {
                    return {
                        toTop: function () {
                            var e = $("html, body");
                            e.stop().animate({
                                scrollTop: 0
                            }
                            , "500", "swing")
                        }
                        , toSection: function (e) {
                            var t = $(e);
                            if (console.log(t), t.length > 0) {
                                var o = t.offset().top - 70, n = $("html, body");
                                n.stop().animate({
                                    scrollTop: o
                                }
                                , "500", "swing")
                            }
                        }
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.services").value("Countries", function () {
                return[{
                        name: "Afghanistan", code: "AF"
                    }
                    , {
                        name: "Åland Islands", code: "AX"
                    }
                    , {
                        name: "Albania", code: "AL"
                    }
                    , {
                        name: "Algeria", code: "DZ"
                    }
                    , {
                        name: "American Samoa", code: "AS"
                    }
                    , {
                        name: "AndorrA", code: "AD"
                    }
                    , {
                        name: "Angola", code: "AO"
                    }
                    , {
                        name: "Anguilla", code: "AI"
                    }
                    , {
                        name: "Antarctica", code: "AQ"
                    }
                    , {
                        name: "Antigua and Barbuda", code: "AG"
                    }
                    , {
                        name: "Argentina", code: "AR"
                    }
                    , {
                        name: "Armenia", code: "AM"
                    }
                    , {
                        name: "Aruba", code: "AW"
                    }
                    , {
                        name: "Australia", code: "AU"
                    }
                    , {
                        name: "Austria", code: "AT"
                    }
                    , {
                        name: "Azerbaijan", code: "AZ"
                    }
                    , {
                        name: "Bahamas", code: "BS"
                    }
                    , {
                        name: "Bahrain", code: "BH"
                    }
                    , {
                        name: "Bangladesh", code: "BD"
                    }
                    , {
                        name: "Barbados", code: "BB"
                    }
                    , {
                        name: "Belarus", code: "BY"
                    }
                    , {
                        name: "Belgium", code: "BE"
                    }
                    , {
                        name: "Belize", code: "BZ"
                    }
                    , {
                        name: "Benin", code: "BJ"
                    }
                    , {
                        name: "Bermuda", code: "BM"
                    }
                    , {
                        name: "Bhutan", code: "BT"
                    }
                    , {
                        name: "Bolivia", code: "BO"
                    }
                    , {
                        name: "Bosnia and Herzegovina", code: "BA"
                    }
                    , {
                        name: "Botswana", code: "BW"
                    }
                    , {
                        name: "Bouvet Island", code: "BV"
                    }
                    , {
                        name: "Brazil", code: "BR"
                    }
                    , {
                        name: "Brunei Darussalam", code: "BN"
                    }
                    , {
                        name: "Bulgaria", code: "BG"
                    }
                    , {
                        name: "Burkina Faso", code: "BF"
                    }
                    , {
                        name: "Burundi", code: "BI"
                    }
                    , {
                        name: "Cambodia", code: "KH"
                    }
                    , {
                        name: "Cameroon", code: "CM"
                    }
                    , {
                        name: "Canada", code: "CA"
                    }
                    , {
                        name: "Cape Verde", code: "CV"
                    }
                    , {
                        name: "Cayman Islands", code: "KY"
                    }
                    , {
                        name: "Central African Republic", code: "CF"
                    }
                    , {
                        name: "Chad", code: "TD"
                    }
                    , {
                        name: "Chile", code: "CL"
                    }
                    , {
                        name: "China", code: "CN"
                    }
                    , {
                        name: "Christmas Island", code: "CX"
                    }
                    , {
                        name: "Cocos (Keeling) Islands", code: "CC"
                    }
                    , {
                        name: "Colombia", code: "CO"
                    }
                    , {
                        name: "Comoros", code: "KM"
                    }
                    , {
                        name: "Congo", code: "CG"
                    }
                    , {
                        name: "Congo, The Democratic Republic of the", code: "CD"
                    }
                    , {
                        name: "Cook Islands", code: "CK"
                    }
                    , {
                        name: "Costa Rica", code: "CR"
                    }
                    , {
                        name: 'Cote D"Ivoire', code: "CI"
                    }
                    , {
                        name: "Croatia", code: "HR"
                    }
                    , {
                        name: "Cuba", code: "CU"
                    }
                    , {
                        name: "Cyprus", code: "CY"
                    }
                    , {
                        name: "Czech Republic", code: "CZ"
                    }
                    , {
                        name: "Denmark", code: "DK"
                    }
                    , {
                        name: "Djibouti", code: "DJ"
                    }
                    , {
                        name: "Dominica", code: "DM"
                    }
                    , {
                        name: "Dominican Republic", code: "DO"
                    }
                    , {
                        name: "Ecuador", code: "EC"
                    }
                    , {
                        name: "Egypt", code: "EG"
                    }
                    , {
                        name: "El Salvador", code: "SV"
                    }
                    , {
                        name: "Equatorial Guinea", code: "GQ"
                    }
                    , {
                        name: "Eritrea", code: "ER"
                    }
                    , {
                        name: "Estonia", code: "EE"
                    }
                    , {
                        name: "Ethiopia", code: "ET"
                    }
                    , {
                        name: "Falkland Islands (Malvinas)", code: "FK"
                    }
                    , {
                        name: "Faroe Islands", code: "FO"
                    }
                    , {
                        name: "Fiji", code: "FJ"
                    }
                    , {
                        name: "Finland", code: "FI"
                    }
                    , {
                        name: "France", code: "FR"
                    }
                    , {
                        name: "French Guiana", code: "GF"
                    }
                    , {
                        name: "French Polynesia", code: "PF"
                    }
                    , {
                        name: "French Southern Territories", code: "TF"
                    }
                    , {
                        name: "Gabon", code: "GA"
                    }
                    , {
                        name: "Gambia", code: "GM"
                    }
                    , {
                        name: "Georgia", code: "GE"
                    }
                    , {
                        name: "Germany", code: "DE"
                    }
                    , {
                        name: "Ghana", code: "GH"
                    }
                    , {
                        name: "Gibraltar", code: "GI"
                    }
                    , {
                        name: "Greece", code: "GR"
                    }
                    , {
                        name: "Greenland", code: "GL"
                    }
                    , {
                        name: "Grenada", code: "GD"
                    }
                    , {
                        name: "Guadeloupe", code: "GP"
                    }
                    , {
                        name: "Guam", code: "GU"
                    }
                    , {
                        name: "Guatemala", code: "GT"
                    }
                    , {
                        name: "Guernsey", code: "GG"
                    }
                    , {
                        name: "Guinea", code: "GN"
                    }
                    , {
                        name: "Guinea-Bissau", code: "GW"
                    }
                    , {
                        name: "Guyana", code: "GY"
                    }
                    , {
                        name: "Haiti", code: "HT"
                    }
                    , {
                        name: "Heard Island and Mcdonald Islands", code: "HM"
                    }
                    , {
                        name: "Holy See (Vatican City State)", code: "VA"
                    }
                    , {
                        name: "Honduras", code: "HN"
                    }
                    , {
                        name: "Hong Kong", code: "HK"
                    }
                    , {
                        name: "Hungary", code: "HU"
                    }
                    , {
                        name: "Iceland", code: "IS"
                    }
                    , {
                        name: "India", code: "IN"
                    }
                    , {
                        name: "Indonesia", code: "ID"
                    }
                    , {
                        name: "Iran, Islamic Republic Of", code: "IR"
                    }
                    , {
                        name: "Iraq", code: "IQ"
                    }
                    , {
                        name: "Ireland", code: "IE"
                    }
                    , {
                        name: "Isle of Man", code: "IM"
                    }
                    , {
                        name: "Israel", code: "IL"
                    }
                    , {
                        name: "Italy", code: "IT"
                    }
                    , {
                        name: "Jamaica", code: "JM"
                    }
                    , {
                        name: "Japan", code: "JP"
                    }
                    , {
                        name: "Jersey", code: "JE"
                    }
                    , {
                        name: "Jordan", code: "JO"
                    }
                    , {
                        name: "Kazakhstan", code: "KZ"
                    }
                    , {
                        name: "Kenya", code: "KE"
                    }
                    , {
                        name: "Kiribati", code: "KI"
                    }
                    , {
                        name: 'Korea, Democratic People"S Republic of', code: "KP"
                    }
                    , {
                        name: "Korea, Republic of", code: "KR"
                    }
                    , {
                        name: "Kuwait", code: "KW"
                    }
                    , {
                        name: "Kyrgyzstan", code: "KG"
                    }
                    , {
                        name: 'Lao People"S Democratic Republic', code: "LA"
                    }
                    , {
                        name: "Latvia", code: "LV"
                    }
                    , {
                        name: "Lebanon", code: "LB"
                    }
                    , {
                        name: "Lesotho", code: "LS"
                    }
                    , {
                        name: "Liberia", code: "LR"
                    }
                    , {
                        name: "Libyan Arab Jamahiriya", code: "LY"
                    }
                    , {
                        name: "Liechtenstein", code: "LI"
                    }
                    , {
                        name: "Lithuania", code: "LT"
                    }
                    , {
                        name: "Luxembourg", code: "LU"
                    }
                    , {
                        name: "Macao", code: "MO"
                    }
                    , {
                        name: "Macedonia, The Former Yugoslav Republic of", code: "MK"
                    }
                    , {
                        name: "Madagascar", code: "MG"
                    }
                    , {
                        name: "Malawi", code: "MW"
                    }
                    , {
                        name: "Malaysia", code: "MY"
                    }
                    , {
                        name: "Maldives", code: "MV"
                    }
                    , {
                        name: "Mali", code: "ML"
                    }
                    , {
                        name: "Malta", code: "MT"
                    }
                    , {
                        name: "Marshall Islands", code: "MH"
                    }
                    , {
                        name: "Martinique", code: "MQ"
                    }
                    , {
                        name: "Mauritania", code: "MR"
                    }
                    , {
                        name: "Mauritius", code: "MU"
                    }
                    , {
                        name: "Mayotte", code: "YT"
                    }
                    , {
                        name: "Mexico", code: "MX"
                    }
                    , {
                        name: "Micronesia, Federated States of", code: "FM"
                    }
                    , {
                        name: "Moldova, Republic of", code: "MD"
                    }
                    , {
                        name: "Monaco", code: "MC"
                    }
                    , {
                        name: "Mongolia", code: "MN"
                    }
                    , {
                        name: "Montserrat", code: "MS"
                    }
                    , {
                        name: "Morocco", code: "MA"
                    }
                    , {
                        name: "Mozambique", code: "MZ"
                    }
                    , {
                        name: "Myanmar", code: "MM"
                    }
                    , {
                        name: "Namibia", code: "NA"
                    }
                    , {
                        name: "Nauru", code: "NR"
                    }
                    , {
                        name: "Nepal", code: "NP"
                    }
                    , {
                        name: "Netherlands", code: "NL"
                    }
                    , {
                        name: "Netherlands Antilles", code: "AN"
                    }
                    , {
                        name: "New Caledonia", code: "NC"
                    }
                    , {
                        name: "New Zealand", code: "NZ"
                    }
                    , {
                        name: "Nicaragua", code: "NI"
                    }
                    , {
                        name: "Niger", code: "NE"
                    }
                    , {
                        name: "Nigeria", code: "NG"
                    }
                    , {
                        name: "Niue", code: "NU"
                    }
                    , {
                        name: "Norfolk Island", code: "NF"
                    }
                    , {
                        name: "Northern Mariana Islands", code: "MP"
                    }
                    , {
                        name: "Norway", code: "NO"
                    }
                    , {
                        name: "Oman", code: "OM"
                    }
                    , {
                        name: "Pakistan", code: "PK"
                    }
                    , {
                        name: "Palau", code: "PW"
                    }
                    , {
                        name: "Palestinian Territory, Occupied", code: "PS"
                    }
                    , {
                        name: "Panama", code: "PA"
                    }
                    , {
                        name: "Papua New Guinea", code: "PG"
                    }
                    , {
                        name: "Paraguay", code: "PY"
                    }
                    , {
                        name: "Peru", code: "PE"
                    }
                    , {
                        name: "Philippines", code: "PH"
                    }
                    , {
                        name: "Pitcairn", code: "PN"
                    }
                    , {
                        name: "Poland", code: "PL"
                    }
                    , {
                        name: "Portugal", code: "PT"
                    }
                    , {
                        name: "Puerto Rico", code: "PR"
                    }
                    , {
                        name: "Qatar", code: "QA"
                    }
                    , {
                        name: "Reunion", code: "RE"
                    }
                    , {
                        name: "Romania", code: "RO"
                    }
                    , {
                        name: "Russian Federation", code: "RU"
                    }
                    , {
                        name: "RWANDA", code: "RW"
                    }
                    , {
                        name: "Saint Helena", code: "SH"
                    }
                    , {
                        name: "Saint Kitts and Nevis", code: "KN"
                    }
                    , {
                        name: "Saint Lucia", code: "LC"
                    }
                    , {
                        name: "Saint Pierre and Miquelon", code: "PM"
                    }
                    , {
                        name: "Saint Vincent and the Grenadines", code: "VC"
                    }
                    , {
                        name: "Samoa", code: "WS"
                    }
                    , {
                        name: "San Marino", code: "SM"
                    }
                    , {
                        name: "Sao Tome and Principe", code: "ST"
                    }
                    , {
                        name: "Saudi Arabia", code: "SA"
                    }
                    , {
                        name: "Senegal", code: "SN"
                    }
                    , {
                        name: "Serbia and Montenegro", code: "CS"
                    }
                    , {
                        name: "Seychelles", code: "SC"
                    }
                    , {
                        name: "Sierra Leone", code: "SL"
                    }
                    , {
                        name: "Singapore", code: "SG"
                    }
                    , {
                        name: "Slovakia", code: "SK"
                    }
                    , {
                        name: "Slovenia", code: "SI"
                    }
                    , {
                        name: "Solomon Islands", code: "SB"
                    }
                    , {
                        name: "Somalia", code: "SO"
                    }
                    , {
                        name: "South Africa", code: "ZA"
                    }
                    , {
                        name: "South Georgia and the South Sandwich Islands", code: "GS"
                    }
                    , {
                        name: "Spain", code: "ES"
                    }
                    , {
                        name: "Sri Lanka", code: "LK"
                    }
                    , {
                        name: "Sudan", code: "SD"
                    }
                    , {
                        name: "Suriname", code: "SR"
                    }
                    , {
                        name: "Svalbard and Jan Mayen", code: "SJ"
                    }
                    , {
                        name: "Swaziland", code: "SZ"
                    }
                    , {
                        name: "Sweden", code: "SE"
                    }
                    , {
                        name: "Switzerland", code: "CH"
                    }
                    , {
                        name: "Syrian Arab Republic", code: "SY"
                    }
                    , {
                        name: "Taiwan, Province of China", code: "TW"
                    }
                    , {
                        name: "Tajikistan", code: "TJ"
                    }
                    , {
                        name: "Tanzania, United Republic of", code: "TZ"
                    }
                    , {
                        name: "Thailand", code: "TH"
                    }
                    , {
                        name: "Timor-Leste", code: "TL"
                    }
                    , {
                        name: "Togo", code: "TG"
                    }
                    , {
                        name: "Tokelau", code: "TK"
                    }
                    , {
                        name: "Tonga", code: "TO"
                    }
                    , {
                        name: "Trinidad and Tobago", code: "TT"
                    }
                    , {
                        name: "Tunisia", code: "TN"
                    }
                    , {
                        name: "Turkey", code: "TR"
                    }
                    , {
                        name: "Turkmenistan", code: "TM"
                    }
                    , {
                        name: "Turks and Caicos Islands", code: "TC"
                    }
                    , {
                        name: "Tuvalu", code: "TV"
                    }
                    , {
                        name: "Uganda", code: "UG"
                    }
                    , {
                        name: "Ukraine", code: "UA"
                    }
                    , {
                        name: "United Arab Emirates", code: "AE"
                    }
                    , {
                        name: "United Kingdom", code: "GB"
                    }
                    , {
                        name: "United States", code: "US"
                    }
                    , {
                        name: "United States Minor Outlying Islands", code: "UM"
                    }
                    , {
                        name: "Uruguay", code: "UY"
                    }
                    , {
                        name: "Uzbekistan", code: "UZ"
                    }
                    , {
                        name: "Vanuatu", code: "VU"
                    }
                    , {
                        name: "Venezuela", code: "VE"
                    }
                    , {
                        name: "Viet Nam", code: "VN"
                    }
                    , {
                        name: "Virgin Islands, British", code: "VG"
                    }
                    , {
                        name: "Virgin Islands, U.S.", code: "VI"
                    }
                    , {
                        name: "Wallis and Futuna", code: "WF"
                    }
                    , {
                        name: "Western Sahara", code: "EH"
                    }
                    , {
                        name: "Yemen", code: "YE"
                    }
                    , {
                        name: "Zambia", code: "ZM"
                    }
                    , {
                        name: "Zimbabwe", code: "ZW"
                    }
                ]
            }
            )
        }

(),
        function () {
            "use strict";
            angular.module("fundator.services").value("CountryCodes", function () {
                return[{
                        code: "1", country: "US"
                    }
                    , {
                        code: "1", country: "CA"
                    }
                    , {
                        code: "7", country: "RU"
                    }
                    , {
                        code: "7", country: "KZ"
                    }
                    , {
                        code: "20", country: "EG"
                    }
                    , {
                        code: "27", country: "ZA"
                    }
                    , {
                        code: "30", country: "GR"
                    }
                    , {
                        code: "31", country: "NL"
                    }
                    , {
                        code: "32", country: "BE"
                    }
                    , {
                        code: "33", country: "FR"
                    }
                    , {
                        code: "34", country: "ES"
                    }
                    , {
                        code: "36", country: "HU"
                    }
                    , {
                        code: "39", country: "IT"
                    }
                    , {
                        code: "40", country: "RO"
                    }
                    , {
                        code: "41", country: "CH"
                    }
                    , {
                        code: "43", country: "AT"
                    }
                    , {
                        code: "44", country: "GB"
                    }
                    , {
                        code: "45", country: "DK"
                    }
                    , {
                        code: "46", country: "SE"
                    }
                    , {
                        code: "47", country: "NO"
                    }
                    , {
                        code: "47", country: "SJ"
                    }
                    , {
                        code: "48", country: "PL"
                    }
                    , {
                        code: "49", country: "DE"
                    }
                    , {
                        code: "51", country: "PE"
                    }
                    , {
                        code: "52", country: "MX"
                    }
                    , {
                        code: "53", country: "CU"
                    }
                    , {
                        code: "54", country: "AR"
                    }
                    , {
                        code: "55", country: "BR"
                    }
                    , {
                        code: "56", country: "CL"
                    }
                    , {
                        code: "57", country: "CO"
                    }
                    , {
                        code: "58", country: "VE"
                    }
                    , {
                        code: "60", country: "MY"
                    }
                    , {
                        code: "61", country: "AU"
                    }
                    , {
                        code: "61", country: "CC"
                    }
                    , {
                        code: "61", country: "CX"
                    }
                    , {
                        code: "62", country: "ID"
                    }
                    , {
                        code: "63", country: "PH"
                    }
                    , {
                        code: "64", country: "NZ"
                    }
                    , {
                        code: "64", country: "PN"
                    }
                    , {
                        code: "65", country: "SG"
                    }
                    , {
                        code: "66", country: "TH"
                    }
                    , {
                        code: "81", country: "JP"
                    }
                    , {
                        code: "82", country: "KR"
                    }
                    , {
                        code: "84", country: "VN"
                    }
                    , {
                        code: "86", country: "CN"
                    }
                    , {
                        code: "90", country: "TR"
                    }
                    , {
                        code: "91", country: "IN"
                    }
                    , {
                        code: "92", country: "PK"
                    }
                    , {
                        code: "93", country: "AF"
                    }
                    , {
                        code: "94", country: "LK"
                    }
                    , {
                        code: "95", country: "MM"
                    }
                    , {
                        code: "98", country: "IR"
                    }
                    , {
                        code: "211", country: "SS"
                    }
                    , {
                        code: "212", country: "MA"
                    }
                    , {
                        code: "212", country: "EH"
                    }
                    , {
                        code: "213", country: "DZ"
                    }
                    , {
                        code: "216", country: "TN"
                    }
                    , {
                        code: "218", country: "LY"
                    }
                    , {
                        code: "220", country: "GM"
                    }
                    , {
                        code: "221", country: "SN"
                    }
                    , {
                        code: "222", country: "MR"
                    }
                    , {
                        code: "223", country: "ML"
                    }
                    , {
                        code: "224", country: "GN"
                    }
                    , {
                        code: "225", country: "CI"
                    }
                    , {
                        code: "226", country: "BF"
                    }
                    , {
                        code: "227", country: "NE"
                    }
                    , {
                        code: "228", country: "TG"
                    }
                    , {
                        code: "229", country: "BJ"
                    }
                    , {
                        code: "230", country: "MU"
                    }
                    , {
                        code: "231", country: "LR"
                    }
                    , {
                        code: "232", country: "SL"
                    }
                    , {
                        code: "233", country: "GH"
                    }
                    , {
                        code: "234", country: "NG"
                    }
                    , {
                        code: "235", country: "TD"
                    }
                    , {
                        code: "236", country: "CF"
                    }
                    , {
                        code: "237", country: "CM"
                    }
                    , {
                        code: "238", country: "CV"
                    }
                    , {
                        code: "239", country: "ST"
                    }
                    , {
                        code: "240", country: "GQ"
                    }
                    , {
                        code: "241", country: "GA"
                    }
                    , {
                        code: "242", country: "CG"
                    }
                    , {
                        code: "243", country: "CD"
                    }
                    , {
                        code: "244", country: "AO"
                    }
                    , {
                        code: "245", country: "GW"
                    }
                    , {
                        code: "246", country: "IO"
                    }
                    , {
                        code: "248", country: "SC"
                    }
                    , {
                        code: "249", country: "SD"
                    }
                    , {
                        code: "250", country: "RW"
                    }
                    , {
                        code: "251", country: "ET"
                    }
                    , {
                        code: "252", country: "SO"
                    }
                    , {
                        code: "253", country: "DJ"
                    }
                    , {
                        code: "254", country: "KE"
                    }
                    , {
                        code: "255", country: "TZ"
                    }
                    , {
                        code: "256", country: "UG"
                    }
                    , {
                        code: "257", country: "BI"
                    }
                    , {
                        code: "258", country: "MZ"
                    }
                    , {
                        code: "260", country: "ZM"
                    }
                    , {
                        code: "261", country: "MG"
                    }
                    , {
                        code: "262", country: "YT"
                    }
                    , {
                        code: "262", country: "RE"
                    }
                    , {
                        code: "263", country: "ZW"
                    }
                    , {
                        code: "264", country: "NA"
                    }
                    , {
                        code: "265", country: "MW"
                    }
                    , {
                        code: "266", country: "LS"
                    }
                    , {
                        code: "267", country: "BW"
                    }
                    , {
                        code: "268", country: "SZ"
                    }
                    , {
                        code: "269", country: "KM"
                    }
                    , {
                        code: "290", country: "SH"
                    }
                    , {
                        code: "291", country: "ER"
                    }
                    , {
                        code: "297", country: "AW"
                    }
                    , {
                        code: "298", country: "FO"
                    }
                    , {
                        code: "299", country: "GL"
                    }
                    , {
                        code: "350", country: "GI"
                    }
                    , {
                        code: "351", country: "PT"
                    }
                    , {
                        code: "352", country: "LU"
                    }
                    , {
                        code: "353", country: "IE"
                    }
                    , {
                        code: "354", country: "IS"
                    }
                    , {
                        code: "355", country: "AL"
                    }
                    , {
                        code: "356", country: "MT"
                    }
                    , {
                        code: "357", country: "CY"
                    }
                    , {
                        code: "358", country: "FI"
                    }
                    , {
                        code: "359", country: "BG"
                    }
                    , {
                        code: "370", country: "LT"
                    }
                    , {
                        code: "371", country: "LV"
                    }
                    , {
                        code: "372", country: "EE"
                    }
                    , {
                        code: "373", country: "MD"
                    }
                    , {
                        code: "374", country: "AM"
                    }
                    , {
                        code: "375", country: "BY"
                    }
                    , {
                        code: "376", country: "AD"
                    }
                    , {
                        code: "377", country: "MC"
                    }
                    , {
                        code: "378", country: "SM"
                    }
                    , {
                        code: "379", country: "VA"
                    }
                    , {
                        code: "380", country: "UA"
                    }
                    , {
                        code: "381", country: "RS"
                    }
                    , {
                        code: "382", country: "ME"
                    }
                    , {
                        code: "383", country: "XK"
                    }
                    , {
                        code: "385", country: "HR"
                    }
                    , {
                        code: "386", country: "SI"
                    }
                    , {
                        code: "387", country: "BA"
                    }
                    , {
                        code: "389", country: "MK"
                    }
                    , {
                        code: "420", country: "CZ"
                    }
                    , {
                        code: "421", country: "SK"
                    }
                    , {
                        code: "423", country: "LI"
                    }
                    , {
                        code: "500", country: "FK"
                    }
                    , {
                        code: "501", country: "BZ"
                    }
                    , {
                        code: "502", country: "GT"
                    }
                    , {
                        code: "503", country: "SV"
                    }
                    , {
                        code: "504", country: "HN"
                    }
                    , {
                        code: "505", country: "NI"
                    }
                    , {
                        code: "506", country: "CR"
                    }
                    , {
                        code: "507", country: "PA"
                    }
                    , {
                        code: "508", country: "PM"
                    }
                    , {
                        code: "509", country: "HT"
                    }
                    , {
                        code: "590", country: "BL"
                    }
                    , {
                        code: "590", country: "MF"
                    }
                    , {
                        code: "591", country: "BO"
                    }
                    , {
                        code: "592", country: "GY"
                    }
                    , {
                        code: "593", country: "EC"
                    }
                    , {
                        code: "595", country: "PY"
                    }
                    , {
                        code: "597", country: "SR"
                    }
                    , {
                        code: "598", country: "UY"
                    }
                    , {
                        code: "599", country: "CW"
                    }
                    , {
                        code: "599", country: "AN"
                    }
                    , {
                        code: "670", country: "TL"
                    }
                    , {
                        code: "672", country: "AQ"
                    }
                    , {
                        code: "673", country: "BN"
                    }
                    , {
                        code: "674", country: "NR"
                    }
                    , {
                        code: "675", country: "PG"
                    }
                    , {
                        code: "676", country: "TO"
                    }
                    , {
                        code: "677", country: "SB"
                    }
                    , {
                        code: "678", country: "VU"
                    }
                    , {
                        code: "679", country: "FJ"
                    }
                    , {
                        code: "680", country: "PW"
                    }
                    , {
                        code: "681", country: "WF"
                    }
                    , {
                        code: "682", country: "CK"
                    }
                    , {
                        code: "683", country: "NU"
                    }
                    , {
                        code: "685", country: "WS"
                    }
                    , {
                        code: "686", country: "KI"
                    }
                    , {
                        code: "687", country: "NC"
                    }
                    , {
                        code: "688", country: "TV"
                    }
                    , {
                        code: "689", country: "PF"
                    }
                    , {
                        code: "690", country: "TK"
                    }
                    , {
                        code: "691", country: "FM"
                    }
                    , {
                        code: "692", country: "MH"
                    }
                    , {
                        code: "850", country: "KP"
                    }
                    , {
                        code: "852", country: "HK"
                    }
                    , {
                        code: "853", country: "MO"
                    }
                    , {
                        code: "855", country: "KH"
                    }
                    , {
                        code: "856", country: "LA"
                    }
                    , {
                        code: "880", country: "BD"
                    }
                    , {
                        code: "886", country: "TW"
                    }
                    , {
                        code: "960", country: "MV"
                    }
                    , {
                        code: "961", country: "LB"
                    }
                    , {
                        code: "962", country: "JO"
                    }
                    , {
                        code: "963", country: "SY"
                    }
                    , {
                        code: "964", country: "IQ"
                    }
                    , {
                        code: "965", country: "KW"
                    }
                    , {
                        code: "966", country: "SA"
                    }
                    , {
                        code: "967", country: "YE"
                    }
                    , {
                        code: "968", country: "OM"
                    }
                    , {
                        code: "970", country: "PS"
                    }
                    , {
                        code: "971", country: "AE"
                    }
                    , {
                        code: "972", country: "IL"
                    }
                    , {
                        code: "973", country: "BH"
                    }
                    , {
                        code: "974", country: "QA"
                    }
                    , {
                        code: "975", country: "BT"
                    }
                    , {
                        code: "976", country: "MN"
                    }
                    , {
                        code: "977", country: "NP"
                    }
                    , {
                        code: "992", country: "TJ"
                    }
                    , {
                        code: "993", country: "TM"
                    }
                    , {
                        code: "994", country: "AZ"
                    }
                    , {
                        code: "995", country: "GE"
                    }
                    , {
                        code: "996", country: "KG"
                    }
                    , {
                        code: "998", country: "UZ"
                    }
                    , {
                        code: "1-242", country: "BS"
                    }
                    , {
                        code: "1-246", country: "BB"
                    }
                    , {
                        code: "1-264", country: "AI"
                    }
                    , {
                        code: "1-268", country: "AG"
                    }
                    , {
                        code: "1-284", country: "VG"
                    }
                    , {
                        code: "1-340", country: "VI"
                    }
                    , {
                        code: "1-345", country: "KY"
                    }
                    , {
                        code: "1-441", country: "BM"
                    }
                    , {
                        code: "1-473", country: "GD"
                    }
                    , {
                        code: "1-649", country: "TC"
                    }
                    , {
                        code: "1-664", country: "MS"
                    }
                    , {
                        code: "1-670", country: "MP"
                    }
                    , {
                        code: "1-671", country: "GU"
                    }
                    , {
                        code: "1-684", country: "AS"
                    }
                    , {
                        code: "1-721", country: "SX"
                    }
                    , {
                        code: "1-758", country: "LC"
                    }
                    , {
                        code: "1-767", country: "DM"
                    }
                    , {
                        code: "1-784", country: "VC"
                    }
                    , {
                        code: "1-939", country: "PR"
                    }
                    , {
                        code: "1-849", country: "DO"
                    }
                    , {
                        code: "1-868", country: "TT"
                    }
                    , {
                        code: "1-869", country: "KN"
                    }
                    , {
                        code: "1-876", country: "JM"
                    }
                    , {
                        code: "44-1481", country: "GG"
                    }
                    , {
                        code: "44-1534", country: "JE"
                    }
                    , {
                        code: "44-1624", country: "IM"
                    }
                ]
            }
            )
        }

(),
        function () {
            "use strict";
            angular.module("fundator.services").factory("API", function () {
                var e = (-1 !== window.location.hostname.indexOf("fundator.co") ? "fundator.co" : "fundator.app", "http://" + window.location.hostname + "/api/"), t = "";
                return {
                    path: function (o, n) {
                        "undefined" == typeof n && (n = "v1");
                        var a = o.startsWith("/") ? "" : "/";
                        return t = e + n + a + o
                    }
                }
            }
            ),
                    angular.module("fundator.services").provider("APIProvider", function () {
                var e = (-1 !== window.location.hostname.indexOf("fundator.co") ? "fundator.co" : "fundator.app", "http://" + window.location.hostname + "/api/"), t = "";
                this.$get = function () {
                    return {
                        path: function (o, n) {
                            "undefined" == typeof n && (n = "v1");
                            var a = o.startsWith("/") ? "" : "/";
                            return t = e + n + a + o
                        }
                    }
                }
            }
            )
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("AuthCtrl", ["$rootScope", "$scope", "$state", "$auth", "$http", "$timeout", "FdScroller", "API", function (e, t, o, n, a, r, i, s) {
                    t.$on("$viewContentLoaded", function () {
                        r(function () {
                            e.appLoaded = !0
                        }
                        , 1e3)
                    }
                    ), e.$broadcast("stopLoading"), n.isAuthenticated() ? o.go("app.projects") : i.toTop(), t.data = {}
                    , t.signup = function () {
                        var e = {
                            name: t.data.name, email: t.data.email, password: t.data.password
                        }
                        ;
                        a.post(s.path("authenticate/signup"), e).then(function (e) {
                            "undefined" == typeof e.data.error && e.data.success === !0 && "undefined" != typeof e.data.message && (t.errorMessage = null, t.successMessage = e.data.message)
                        }
                        , function (e) {
                            "undefined" != typeof e.data.message.email && (console.log(e.data.message.email[0]), t.successMessage = null, t.errorMessage = e.data.message.email[0])
                        }
                        )
                    }
                    , t.login = function () {
                        t.errorMessage = "", e.$broadcast("startLoading"), i.toTop();
                        var a = {
                            email: t.data.email, password: t.data.password
                        }
                        ;
                        n.login(a).then(function (t) {
                            n.setToken(t.data.token);
                            var a = n.getPayload(), i = e.activeState.name, s = e.activeStateParams;
                            r(function () {
                                "undefined" == typeof i ? o.go("app.auth.signup") : (o.go("app.projects"), e.switchUserRole(a.role, a.role_id, !0, i, s))
                            }
                            , 100)
                        }
                        , function (o) {
                            e.$broadcast("stopLoading"), "Unauthorized" === o.statusText ? t.errorMessage = "The email or password you entered is incorrect." : t.errorMessage = o.statusText
                        }
                        )
                    }
                    , t.authenticate = function (t) {
                        e.$broadcast("startLoading"), n.authenticate(t).then(function (t) {
                            n.setToken(result.data.token);
                            var a = n.getPayload(), i = e.activeState.name, s = e.activeStateParams;
                            r(function () {
                                "undefined" == typeof i ? o.go("app.auth.signup") : (o.go("app.projects"), e.switchUserRole(a.role, a.role_id, !0, i, s))
                            }
                            , 100)
                        }
                        )["catch"](function (t) {
                            console.log("Not Logged in "), console.log(t), e.$broadcast("stopLoading")
                        }
                        )
                    }
                    , t.logout = function () {
                        n.logout().then(function () {
                            localStorage.removeItem("fundator_token"), e.authenticated = !1, e.user = void 0, o.go("app.auth.login", {}
                            , {
                                reload: !0
                            }
                            )
                        }
                        )
                    }
                }
            ]),
                    angular.module("fundator.controllers").controller("AuthConfirmCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$auth", "$timeout", "$http", "API", function (e, t, o, n, a, r, i, s) {
                    if (e.$broadcast("stopLoading"), "undefined" != typeof n.code && "undefined" != typeof n.email) {
                        var c = {
                            confirmation_code: n.code, email: n.email
                        }
                        ;
                        console.log("authenticating ..."), t.loading = !0, i.post(s.path("authenticate/confirm"), c).then(function (e) {
                            console.log("confirm result"), console.log(e), a.setToken(e.data.token), o.go("app.auth.login")
                        }
                        , function (e) {
                            console.log("error"), console.log(e), t.errorMessage = e.data.error
                        }
                        )["finally"](function () {
                            t.loading = !1
                        }
                        )
                    } else
                        o.go("app.auth.login")
                }
            ]),
                    angular.module("fundator.controllers").controller("AuthRecoverCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$auth", "$timeout", "$http", "API", function (e, t, o, n, a, r, i, s) {
                    e.$broadcast("stopLoading"), console.log("recovering ..."), t.data = {
                        recoveryEmail: "", password: "", password_repeat: ""
                    }
                    , "undefined" == typeof n.token && "undefined" == typeof n.email ? t.viewState = "recover" : t.viewState = "set", t.recover = function () {
                        t.viewState = "loading";
                        var e = {
                            email: t.data.recoveryEmail
                        }
                        ;
                        i.post(s.path("authenticate/forgot"), e).then(function (e) {
                            "undefined" == typeof e.data.error ? (t.successMessage = "A password reset link has been sent to your email.", t.viewState = "") : (t.viewState = "recover", "Invalid User" === e.data.error ? t.errorMessage = "User does not exist" : t.errorMessage = "Error in recovering password")
                        }
                        , function (e) {
                            t.viewState = "recover", "Invalid User" === e.data.error ? t.errorMessage = "User does not exist" : t.errorMessage = "Error in recovering password"
                        }
                        )
                    }
                    , t.set = function () {
                        if (t.data.password.length >= 6)
                            if (t.data.password === t.data.password_repeat) {
                                t.viewState = "loading";
                                var e = {
                                    token: n.token, email: n.email, password: t.data.password, password_confirmation: t.data.password_repeat
                                }
                                ;
                                i.post(s.path("authenticate/recover"), e).then(function (e) {
                                    "undefined" == typeof e.data.error ? (a.removeToken(), a.setToken(e.data.token), o.go("app.auth.login", {}
                                    )) : (t.errorMessage = "Error in resetting password", t.viewState = "set")
                                }
                                , function (e) {
                                    t.errorMessage = "Error in resetting password", t.viewState = "set"
                                }
                                )
                            } else
                                t.errorMessage = "Passwords do not match!";
                        else
                            t.errorMessage = "Passwords need to be longer than 6 characters!"
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            function e(e) {
                console.log(e);
                var t;
                t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]);
                for (var o = e.split(",")[0].split(":")[1].split(";")[0], n = new Uint8Array(t.length), a = 0;
                        a < t.length;
                        a++)
                    n[a] = t.charCodeAt(a);
                return new Blob([n], {
                    type: o
                }
                )
            }
            angular.module("fundator.directives").directive("focusOn", function () {
                return {
                    scope: {
                        focusOn: "="
                    }
                    , link: function (e, t, o) {
                        console.log(e.focusOn), e.focusOn && t[0].focus()
                    }
                }
            }
            ),
                    angular.module("fundator.controllers").controller("RegisterCtrl", ["$rootScope", "$scope", "$state", "$auth", "$timeout", "$http", "$resource", "FdScroller", "$filter", "FileUploader", "Countries", "CountryCodes", "API", function (t, o, n, a, r, i, s, c, d, l, u, p, g) {
                    function f() {
                        var e = {
                            selectedExpertise: "null", otherExpertise: {
                                status: 1
                            }
                        }
                        ;
                        o.inputtedExpertiseList.length > 0 && o.inputtedExpertiseList[o.inputtedExpertiseList.length - 1], console.log(o.inputtedExpertiseList), console.log(e), o.inputtedExpertiseList.length < 3 && null !== e.selectedExpertise && 0 !== e.otherExpertise.status && o.inputtedExpertiseList.push({
                            expertiseCategoryList: [], expertiseSubCategoryList: [], expertiseList: [], skillsList: [], selectedExpertiseCategory: null, otherExpertiseCategory: {
                                name: "", status: 0
                            }
                            , selectedExpertiseSubCategory: null, otherExpertiseSubCategory: {
                                name: "", status: 0
                            }
                            , selectedExpertise: null, otherExpertise: {
                                name: "", status: 0
                            }
                            , selectedSkills: [], otherSkills: {
                                list: [], status: 0
                            }
                            , step: 1, loading: !1
                        }
                        ), o.fetchExpertiseCategory(o.inputtedExpertiseList.length - 1)
                    }
                    i.get('api/v1/innovationList').success(function (innovationlist) {
                        o.innovations = innovationlist;
                    });
                    i.get('api/v1/creationList').success(function (creationlist) {
                        o.creations = creationlist;
                    });
                    o.form = {
                        currentStep: 1, totalSteps: 3
                    }
                    , o.totalSteps = {
                        creator: 4, expert: 4, investor: 4
                    }
                    , o.changeFormStep = function (e) {
                        c.toTop(), o.form.currentStep = e
                    }
                    , o.countries = u(), o.countryCodes = p(),
                            o.contactTimes = [{
                                    name: "Working hours (9am to 6 pm)", value: "9-6"
                                }
                                , {
                                    name: "Evening time (6am to 9 pm)", value: "6-9"
                                }
                            ],
                            o.data = {
                                selectedRole: "creator", ageGate: "yes", countryOrigin: "", countryResidence: "", contactTime: "", expertiseForm: {
                                    step: 1, loading: !0
                                }
                                , croppedThumbnail: null, email: ""
                            }

                    ;
                    a.getPayload();
                    t.$broadcast("stopLoading"), o.changeRole = function () {
                        o.form.totalSteps = o.totalSteps[o.data.selectedRole]
                    }
                    , o.getProgress = function () {
                        return Math.min(o.form.currentStep / o.form.totalSteps * 100, 96)
                    }
                    , o.getProgressInverted = function () {
                        return Math.max(100 * (1 - o.form.currentStep / o.form.totalSteps), 4)
                    }
                    , o.thumbnail = null, o.croppedThumbnail = null, o.fileName = "No file selected", o.imageError = null, t.$watch("user", function (e) {
                        "undefined" != typeof e && (1 == e.registered && n.go("app.contests"), o.data.email = e.email)
                    }
                    , !0);
                    var m = function (e, t) {
                        if (e.stopPropagation(), e.preventDefault(), o.$apply(function () {
                            o.dropable = !1
                        }
                        ), e.originalEvent.dataTransfer)
                            var n = e.originalEvent.dataTransfer.files[0];
                        else
                            var n = e.currentTarget.files[0];
                        var a = new FileReader;
                        return-1 == n.type.indexOf("image") ? void o.$apply(function (e) {
                            e.imageError = "Please select a valid image to crop"
                        }
                        ) : (o.imageError = null, o.fileName = n.name, a.onload = function (e) {
                            o.$apply(function (t) {
                                console.log(e.target.result), t.thumbnail = e.target.result
                            }
                            )
                        }
                        , void(n && a.readAsDataURL(n)))
                    }
                    ;
                    $(document).on("dragover dragleave dragenter", ".img-upload-show", function (e) {
                        e.stopPropagation(), e.preventDefault()
                    }
                    ), $(document).on("dragenter", ".img-upload-show", function (e) {
                        e.stopPropagation(), e.preventDefault(), o.$apply(function () {
                            o.dropable = !0
                        }
                        )
                    }
                    ), $(document).on("dragleave", ".img-upload-show", function (e) {
                        e.stopPropagation(), e.preventDefault(), o.$apply(function () {
                            o.dropable = !1
                        }
                        )
                    }
                    ), $(document).on("change", "#fileInput", function (e) {
                        m(e, !1)
                    }
                    ), $(document).on("drop", ".img-upload-show", function (e) {
                        m(e, !0)
                    }
                    ), o.uploader = new l({
                        url: g.path("files"), removeAfterUpload: !0
                    }
                    ), o.confirmImage = function () {
                        var n = o.data.croppedThumbnail;
                        o.uploader.onBeforeUploadItem = function (e) {
                            e.file.name = "thumbnail_" + t.user.id + ".png", e.formData = [], e.formData.push({
                                attach: "thumbnail"
                            }
                            ), e.formData.push({
                                user_id: t.user.id
                            }
                            ), o.data.imageSuccess = null
                        }
                        , o.uploader.onSuccessItem = function (e, t, n, a) {
                            "undefined" != typeof t.file ? o.data.imageSuccess = "Your profile picture was successfully uploaded!" : o.data.imageError = "Profile picture failed to upload, please try again!"
                        }
                        , o.uploader.addToQueue(e(n)), o.uploader.uploadAll()
                    }
                    , o.allSkills = s("api/skills").query(), o.inputtedExpertiseList = [], o.selectExpertiseCategory = function (e, t, n) {
                        0 === n ? (o.inputtedExpertiseList[e].selectedExpertiseCategory = t, o.inputtedExpertiseList[e].step = 2, o.fetchExpertiseSubCategory(e)) : (o.inputtedExpertiseList[e].selectedExpertiseSubCategory = t, o.inputtedExpertiseList[e].step = 3, o.fetchExpertiseList(e))
                    }
                    , o.deselectExpertiseCategory = function (e, t, n) {
                        0 === n ? (o.inputtedExpertiseList[t].selectedExpertiseCategory = null, o.inputtedExpertiseList[t].otherExpertiseCategory = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[t].selectedExpertiseSubCategory = null, o.inputtedExpertiseList[t].otherExpertiseSubCategory = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[t].selectedExpertise = null, o.inputtedExpertiseList[t].otherExpertise = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[t].selectedSkills = []) : (o.inputtedExpertiseList[t].selectedExpertiseSubCategory = null, o.inputtedExpertiseList[t].otherExpertiseSubCategory = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[t].selectedExpertise = null, o.inputtedExpertiseList[t].otherExpertise = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[t].selectedSkills = []), e.stopPropagation()
                    }
                    , o.saveOtherExpertiseCategory = function (e, t) {
                        0 === t ? (o.inputtedExpertiseList[e].selectedExpertiseCategory = null, o.inputtedExpertiseList[e].selectedExpertiseSubCategory = null, o.inputtedExpertiseList[e].otherExpertiseSubCategory = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[e].selectedExpertise = null, o.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[e].selectedSkills = [], o.inputtedExpertiseList[e].otherExpertiseCategory.status = 1, o.inputtedExpertiseList[e].step = 2) : (o.inputtedExpertiseList[e].selectedExpertiseSubCategory = null, o.inputtedExpertiseList[e].selectedExpertise = null, o.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[e].selectedSkills = [], o.inputtedExpertiseList[e].otherExpertiseSubCategory.status = 1, o.inputtedExpertiseList[e].step = 3)
                    }
                    , o.removeOtherExpertiseCategory = function (e, t) {
                        0 === t ? (o.inputtedExpertiseList[e].otherExpertiseCategory = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[e].otherExpertiseSubCategory = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                        ) : (o.inputtedExpertiseList[e].otherExpertiseSubCategory = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                        )
                    }
                    , o.selectExpertise = function (e, t) {
                        o.inputtedExpertiseList[e].selectedExpertise = t, o.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                        , o.inputtedExpertiseList[e].step = 4, o.fetchSkillsList(e), f()
                    }
                    , o.deselectExpertise = function (e, t) {
                        o.inputtedExpertiseList[t].selectedExpertise = null, o.inputtedExpertiseList[t].selectedSkills = [], e.stopPropagation(t)
                    }
                    , o.saveOtherExpertise = function (e) {
                        o.inputtedExpertiseList[e].selectedExpertise = null, o.inputtedExpertiseList[e].selectedSkills = [], o.inputtedExpertiseList[e].otherExpertise.status = 1, o.inputtedExpertiseList[e].step = 4, f()
                    }
                    , o.removeOtherExpertise = function (e) {
                        o.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                    }
                    , o.inSkills = function (e, t) {
                        var n = d("filter")(o.inputtedExpertiseList[e].selectedSkills, {
                            id: t.id
                        }
                        , !0);
                        return"undefined" != typeof n ? n.length > 0 : !1
                    }
                    , o.selectSkill = function (e, t) {
                        o.inSkills(e, t) || o.inputtedExpertiseList[e].selectedSkills.push(t), o.inputtedExpertiseList[e].step = 4
                    }
                    , o.deselectSkill = function (e, t, n) {
                        o.inputtedExpertiseList[t].selectedSkills = d("filter")(o.inputtedExpertiseList[t].selectedSkills, {
                            id: n.id
                        }
                        , function (e, t) {
                            return!angular.equals(e, t)
                        }
                        ), e.stopPropagation()
                    }
                    , o.saveSkills = function (e) {
                        o.inputtedExpertiseList[e].skillsList = angular.copy(o.inputtedExpertiseList[e].otherSkills.list), o.inputtedExpertiseList[e].selectedSkills = angular.copy(o.inputtedExpertiseList[e].otherSkills.list), o.inputtedExpertiseList[e].otherSkills = {
                            list: [], status: 0
                        }
                    }
                    , o.fetchExpertiseCategory = function (e) {
                        o.inputtedExpertiseList[e].expertiseCategoryList = [], o.inputtedExpertiseList[e].loading = !0, i.get(g.path("expertise-category/0")).then(function (t) {
                            o.inputtedExpertiseList[e].expertiseCategoryList = t.data, o.inputtedExpertiseList[e].loading = !1
                        }
                        )
                    }
                    , o.fetchExpertiseSubCategory = function (e) {
                        o.expertiseSubCategoryList = [], o.inputtedExpertiseList[e].loading = !0, i.get(g.path("expertise-category/") + o.inputtedExpertiseList[e].selectedExpertiseCategory.id).then(function (t) {
                            o.inputtedExpertiseList[e].expertiseSubCategoryList = t.data, o.inputtedExpertiseList[e].loading = !1
                        }
                        )
                    }
                    , o.fetchExpertiseList = function (e) {
                        o.inputtedExpertiseList[e].expertiseList = [], o.inputtedExpertiseList[e].loading = !0, i.get(g.path("expertise/category/") + o.inputtedExpertiseList[e].selectedExpertiseSubCategory.id).then(function (t) {
                            o.inputtedExpertiseList[e].expertiseList = t.data, o.inputtedExpertiseList[e].loading = !1
                        }
                        , 2e3)
                    }
                    , o.fetchSkillsList = function (e) {
                        o.inputtedExpertiseList[e].skillsList = [], o.inputtedExpertiseList[e].loading = !0, i.get(g.path("expertise/") + o.inputtedExpertiseList[e].selectedExpertise.id + "/skills/").then(function (t) {
                            o.inputtedExpertiseList[e].skillsList = t.data, o.inputtedExpertiseList[e].selectedSkills = t.data, o.inputtedExpertiseList[e].loading = !1
                        }
                        , 2e3)
                    }
                    , f(), o.submitDetails = function () {
                        var e = {
                            name: o.data.fname, last_name: o.data.lname, role: o.data.selectedRole, age_gate: o.data.ageGate, country_origin: o.data.countryOrigin, country_residence: o.data.countryResidence, contact_number: o.data.contactNumber, contact_number_country_code: o.data.contactNumberCountryCode.code, contact_time: o.data.contactTime.value
                        }
                        ;
                        switch (o.data.selectedRole) {
                            case"investor":
                                var a = o.data.selectedInvestmentBudget;
                                "other" === a && (a = o.data.selectedInvestmentBudgetOther), e.investor = {}
                                , e.investor.investment_budget = a, e.investor.investment_goal = o.data.selectedInvestmentGoal, e.investor.investment_reason = o.data.selectedInvestmentReason;
                                break;
                            case"creator":
                                e.creator = {}
                                ;
                                break;
                            case"expert":
                                e.expert = {
                                    list: []
                                }
                                , angular.forEach(o.inputtedExpertiseList, function (t) {
                                    (null !== t.selectedExpertise || 1 === t.otherExpertise.status) && (console.log(t.selectedExpertise), console.log(t.otherExpertise), e.expert.list.push({
                                        expertise_category: t.selectedExpertiseCategory, other_expertise_category: t.otherExpertiseCategory, expertise_sub_category: t.selectedExpertiseSubCategory, other_expertise_sub_category: t.otherExpertiseSubCategory, expertise: t.selectedExpertise, other_expertise: t.otherExpertise, skills: t.selectedSkills
                                    }
                                    ))
                                }
                                )
                        }
                        t.$broadcast("startLoading"), c.toTop(), i.put(g.path("users/") + t.user.id, e).then(function (e) {
                            "Updated" === e.data && (t.user.name = o.data.fname, t.user.last_name = o.data.lname, t.user.role = o.data.selectedRole, t.user.registered = 1, t.initialRoleAssignment = !0, t.activeRole = o.data.selectedRole, n.go("app.contests"), t.switchUserRole(o.data.selectedRole, null, !0))
                            // console.log(t.user.name=o.data.fname, t.user.last_name=o.data.lname, t.user.role=o.data.selectedRole, t.user.registered=1, t.initialRoleAssignment=!0, t.activeRole=o.data.selectedRole, n.go("app.contests"), t.switchUserRole(o.data.selectedRole, null, !0));
                        }
                        , function (e) {
                            console.log("error"), console.log(e)
                        }
                        )["finally"](function () {
                            t.$broadcast("stopLoading");
                            n.go("app.projects");
                            //window.location.href = "/#/projects";



                        })
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("ContestCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function (e, t, o, n, a, r, i, s, c) {
                    e.$broadcast("stopLoading"), t.contests = [], t.sectionLoading = !0;
                    var d = a(c.path("contests/:contestId"), {
                        contestId: "@id"
                    }
                    );
                    d.query().$promise.then(function (o) {
                        if (t.contests = o, t.ongoingContests = [], t.judgingContests = [], "creator" === e.activeRole && "undefined" != typeof e.user.creator)
                            for (var n in e.user.creator.ongoing_contest) {
                                var a = e.user.creator.ongoing_contest[n], r = s("filter")(o, {
                                    id: a
                                }
                                , !0)[0];
                                if ("undefined" != typeof r) {
                                    t.ongoingContests.push(r);
                                    var i = t.contests.indexOf(r);
                                    t.contests.splice(i, 1)
                                }
                            }
                        else if ("jury" === e.activeRole && e.user.judging.length > 0)
                            for (var c in e.user.judging) {
                                var a = e.user.judging[c].contest_id, r = s("filter")(o, {
                                    id: a
                                }
                                , !0)[0];
                                "undefined" != typeof r && t.judgingContests.push(r)
                            }
                    }
                    )["finally"](function () {
                        i(function () {
                            t.sectionLoading = !1
                        }
                        , 1e3)
                    }
                    )
                }
            ]),
                    angular.module("fundator.controllers").controller("ContestSingleCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$filter", "$timeout", "FdScroller", "$http", "Lightbox", "API", function (e, t, o, n, a, r, i, s, c, d, l) {
                    e.$broadcast("stopLoading"), t.contestId = n.contestId, t.data = {
                        contestFullDescription: !1, addEntry: !1, addEntryForm: {
                            description: "", attachedFiles: []
                        }
                        , selectedEntry: null, rating: {
                            design: "", creativity: "", industrial: "", market: ""
                        }
                    }
                    ;
                    var u = a(l.path("contests/:contestId"), {
                        contestId: "@id"
                    }
                    ), p = a(l.path("entries/:entryId"), {
                        entryId: "@id"
                    }
                    , {
                        contestantEntries: {
                            method: "GET", url: l.path("entries/contest/:contestId/creator/:creatorId"), isArray: !0
                        }
                        , judgeEntries: {
                            method: "GET", url: l.path("entries/contest/:contestId/judge/:judgeId"), isArray: !0
                        }
                        , sendMessage: {
                            method: "POST", url: l.path("entries/:entryId/messages"), isArray: !1
                        }
                    }
                    ), g = a(l.path("entry-ratings/:entryRatingId"), function () {}
                    , {
                        update: {
                            method: "PUT"
                        }
                    }
                    );
                    s.toTop(), t.showFullText = function () {
                        s.toSection(".contest-single", 50), t.data.contestFullDescription = !0
                    }
                    , t.hideFullText = function () {
                        s.toTop(), t.data.contestFullDescription = !1
                    }
                    , u.get({
                        contestId: t.contestId
                    }
                    ).$promise.then(function (n) {
                        t.contest = n;
                        var a = r("filter")(e.user.judging, {
                            contest_id: t.contestId, status: 1
                        }
                        ), i = r("filter")(e.user.judging, {
                            contest_id: t.contestId, status: 0
                        }
                        ), s = r("filter")(e.user.contesting, {
                            contest_id: t.contestId, status: 1
                        }
                        ), c = r("filter")(e.user.contesting, {
                            contest_id: t.contestId, status: 0
                        }
                        );
                        "undefined" != typeof a && (a.length > 0 && "jury" !== e.activeRole && "creator" !== e.activeRole ? (e.flashNotices.juryView.show = !0, e.flashNotices.juryView.contestId = n.id, e.flashNotices.juryView.onClick = function () {
                            o.go("app.contest", {
                                role: "jury", contestId: n.id
                            }
                            )
                        }
                        ) : "jury" === e.activeRole && a.length > 0 && (t.data.showJudgeNdaCompleted = !0, t.loadEntries(e.activeRole))), "undefined" != typeof i && i.length > 0 && (t.data.showJudgeNdaPending = !0), "undefined" != typeof s && s.length > 0 && "creator" === e.activeRole && (t.data.showContestantNdaCompleted = !0, t.loadEntries(e.activeRole)), "undefined" != typeof c && c.length > 0 && (t.data.showContestantNdaPending = !0)
                    }
                    )["finally"](function () {
                        i(function () {
                            e.$broadcast("stopLoading")
                        }
                        , 1e3)
                    }
                    ), t.loadEntries = function (o) {
                        switch (o) {
                            case"jury":
                                p.judgeEntries({
                                    contestId: t.contestId, judgeId: e.user.id
                                }
                                ).$promise.then(function (e) {
                                    t.contest.entries = angular.copy(e)
                                }
                                );
                                break;
                            case"creator":
                                var n = r("filter")(e.user.user_roles, {
                                    role: "creator"
                                }
                                , !0);
                                if (n.length > 0) {
                                    var a = n[0];
                                    p.contestantEntries({
                                        contestId: t.contestId, creatorId: a.id
                                    }
                                    ).$promise.then(function (e) {
                                        t.contest.entries = angular.copy(e)
                                    }
                                    )
                                }
                        }
                    }
                    , t.selectEntry = function (o) {
                        t.data.addEntry = !1, t.data.selectedEntry = o, s.toSection(".entries-list");
                        var n = null;
                        "jury" === e.activeRole && (n = e.user.id), null !== n ? c.get(l.path("entries/") + o.id + "/judge/" + n).then(function (e) {
                            t.data.selectedEntry = e.data, t.data.selectedEntry.rating = e.data.rating, t.data.selectedEntry.gallery = ["images/1.png", "images/2.png", "images/3.png"], i(function () {
                                $(".chatbox").animate({
                                    scrollTop: 1e4
                                }
                                )
                            }
                            , 100)
                        }
                        ) : p.get({
                            entryId: o.id
                        }
                        ).$promise.then(function (e) {
                            t.data.selectedEntry = e, t.data.selectedEntry.gallery = ["images/1.png", "images/2.png", "images/3.png"], i(function () {
                                $(".chatbox").animate({
                                    scrollTop: 1e4
                                }
                                )
                            }
                            , 100)
                        }
                        )
                    }
                    , t.openLightbox = function (e) {
                        var o = t.data.selectedEntry.files, n = [], a = 0;
                        for (var r in o) {
                            var i = o[r];
                            n.push(i.url), i.url === e.url && (a = r)
                        }
                        d.openModal(n, a)
                    }
                    , t.$on("flow::fileAdded", function (e, t, o) {
                        e.preventDefault(), console.log("fileAdded"), console.log(t), console.log(o)
                    }
                    ), t.entryFileSuccess = function (e, o) {
                        var n = JSON.parse(o);
                        console.log(e), console.log("Adding files : " + n.file.id), e.ref_id = n.file.id;
                        var a = t.data.addEntryForm.attachedFiles.indexOf(n.file.id);
                        -1 === a && t.data.addEntryForm.attachedFiles.push({
                            id: n.file.id, caption: ""
                        }
                        )
                    }
                    , t.entryFileRemove = function (e, o) {
                        var n = t.data.addEntryForm.attachedFiles.indexOf(e.ref_id);
                        -1 !== n && t.data.addEntryForm.attachedFiles.splice(n, 1);
                        var a = o.files.indexOf(e);
                        -1 !== a && (console.log("remove files ... " + a), o.files.splice(a, 1)), console.log(o.files), console.log(t.data.addEntryForm.attachedFiles)
                    }
                    , t.showAddEntry = function () {
                        s.toSection(".entries-list"), t.data.selectedEntry = null, t.data.addEntry = !0, t.data.addEntryForm.description = "", t.data.addEntryForm.attachedFiles = [], t.data.addEntryForm.description = t.contest.entries[t.contest.entries.length - 1].description
                    }
                    , t.submitEntry = function () {
                        t.data.savingEntry = !0;
                        var o = {}
                        , n = null;
                        angular.forEach(t.data.addEntryForm.flow.files, function (e) {
                            o[e.ref_id] = {
                                caption: e.ref_caption
                            }
                            , console.log("prepare to assign thumbnail"), -1 !== e.file.type.indexOf("image") && null === n && (console.log("whoopie it matches"), n = e.ref_id)
                        }
                        );
                        var a = r("filter")(e.user.user_roles, {
                            role: "creator"
                        }
                        , !0);
                        if (a.length > 0) {
                            var s = a[0], c = new p;
                            c.creator_id = s.id, c.contest_id = t.contest.id, c.thumbnail_id = n, c.name = e.user.name + "'s Entry", c.description = t.data.addEntryForm.description, c.attached_files = o, console.log(c.thumbnail_id), c.$save().then(function (e) {
                                console.log("Entry Saved!"), console.log(e), t.data.savingEntry = !1, t.data.savedEntry = !0, i(function () {
                                    t.data.selectedEntry = !1, t.selectEntry(e), t.loadEntries("creator")
                                }
                                , 1e3)
                            }
                            )
                        }
                    }
                    , t.sendMessage = function () {
                        var e = {
                            message: t.data.messageToSend
                        }
                        ;
                        p.sendMessage({
                            entryId: t.data.selectedEntry.id
                        }
                        , e, function (e) {
                            t.data.selectedEntry.messages.push(e), t.data.messageToSend = "", i(function () {
                                $(".chatbox").animate({
                                    scrollTop: 1e4
                                }
                                )
                            }
                            , 100)
                        }
                        )
                    }
                    , t.saveMarks = function (o) {
                        t.data.savingMarks = !0;
                        var n = {
                            design: t.data.selectedEntry.rating.design, creativity: t.data.selectedEntry.rating.creativity, industrial: t.data.selectedEntry.rating.industrial, market: t.data.selectedEntry.rating.market
                        }
                        ;
                        if (n.judge_id = e.user.id, n.entry_id = t.data.selectedEntry.id, "undefined" != typeof o)
                            g.update({
                                entryRatingId: o
                            }
                            , n).$promise.then(function (e) {
                                "error" !== e && (console.log("entry rating saved!"), t.data.savingMarks = !1, t.data.savedMarks = !0, t.loadEntries("jury"), i(function () {
                                    t.data.savedMarks = !1
                                }
                                , 1e3))
                            }
                            );
                        else {
                            var a = new g(n);
                            a.$save().then(function (e) {
                                "error" !== e && (console.log("entry rating created!"), t.data.savingMarks = !1, t.data.savedMarks = !0, t.loadEntries("jury"), i(function () {
                                    t.data.savedMarks = !1
                                }
                                , 1e3))
                            }
                            )
                        }
                    }
                    , t.becomeJudge = function () {
                        s.toSection(".contest-single", 50), t.data.showJudgeNda = !0
                    }
                    , t.acceptJudge = function () {
                        t.data.showJudgeNdaLoading = !0, c.post(l.path("users/becomeJudge"), {
                            contest_id: t.contest.id
                        }
                        ).then(function (e) {
                            console.log(e), "undefined" == typeof e.data.error && (t.data.showJudgeNdaSuccess = !0, i(function () {
                                s.toTop(), t.data.showJudgeNda = !1
                            }
                            , 1e3))
                        }
                        )["finally"](function () {
                            t.data.showJudgeNdaLoading = !1
                        }
                        )
                    }
                    , t.becomeContestant = function () {
                        s.toSection(".contest-single", 50), t.data.showContestantNda = !0
                    }
                    , t.acceptContestant = function () {
                        t.data.showContestantNdaLoading = !0, c.post(l.path("users/becomeContestant"), {
                            contest_id: t.contest.id
                        }
                        ).then(function (e) {
                            console.log(e), "undefined" == typeof e.data.error && (t.data.showContestantNdaSuccess = !0, i(function () {
                                s.toTop(), t.data.showContestantNda = !1
                            }
                            , 1e3))
                        }
                        )["finally"](function () {
                            t.data.showContestantNdaLoading = !1
                        }
                        )
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("CreateCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$timeout", "$filter", "FdScroller", "API", function (e, t, o, n, a, r, i, s, c) {
                    e.$broadcast("stopLoading"), e.sectionLoading = !0, e.innerSectionLoading = !1, t.project = null, t.view = "list", t.data = {
                        newProjectLoading: !1
                    }
                    , t.productCategories = [], t.innovationCategories = [];
                    var d = a(c.path("categories/:type/:categoryId"), {
                        categoryId: "@id"
                    }
                    );
                    t.fetchCategories = function () {
                        d.query({
                            type: "product"
                        }
                        ).$promise.then(function (e) {
                            t.productCategories = e, console.log("product categories : " + e)
                        }
                        , function () {
                            console.log("failed to retrive the product cateories")
                        }
                        ), d.query({
                            type: "innovation"
                        }
                        ).$promise.then(function (e) {
                            t.innovationCategories = e, console.log("innovation categories : " + e)
                        }
                        , function () {
                            console.log("failed to retrive the innovation cateories")
                        }
                        )
                    }
                    , t.fetchCategories(), t.steps = [{
                            title: "Your Project", progress: 0, isOpen: !1, ongoing: !1, state: "app.create.details", body: '<h3>Great!</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
                        }
                        , {
                            title: "Meet your Super Expert", progress: 0, isOpen: !1, ongoing: !1, state: "app.create.superexpert", body: '<h3>Expertise you need</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
                        }
                        , {
                            title: "Expertise you need", progress: 0, isOpen: !1, ongoing: !1, state: "app.create.expertise", body: '<h3>Expertise you need</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
                        }
                        , {
                            title: "Experts on your team", progress: 0, isOpen: !1, ongoing: !1, state: "app.create.experts", body: '<h3>Experts on your team</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
                        }
                        , {
                            title: "Validate the budget", progress: 0, isOpen: !1, ongoing: !1, state: "app.create.budget", body: '<h3>Validate the budget</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
                        }
                        , {
                            title: "Your investors", progress: 0, isOpen: !1, ongoing: !1, state: "app.create.investors", body: '<h3>Your Investor</h3><p><dfn>You have been completed a very important step, we will now be able to communicate efficiently.</dfn></p><p><dfn>Your great idea will be under the TOYS & AMUSEMENTS” category.</dfn></p><p><dfn>In order to make your project come true we will go through 4 steps.</dfn></p><p><dfn>Beforehand, make sure to read all tutorials (with link) and make sure you understand the concept of Fundator.</dfn></p><p><a href="#" class="btn btn-info marginT10">I read the tutorial and guidelines. I want to start.</a></p>'
                        }
                    ], t.$watch("steps", function (e) {
                        angular.forEach(e, function (e) {
                            e.isOpen && (o.go(e.state), s.toSection("#projectSteps"))
                        }
                        )
                    }
                    , !0), t.$watch("project", function (e) {
                        if ("undefined" != typeof e && null !== e) {
                            for (var o = Math.floor(t.project.state), n = t.project.state - o, a = 0;
                                    o > a;
                                    a++)
                                t.steps[a].progress = 1;
                            t.steps[o].ongoing = !0, t.steps[o].isOpen = !0, t.steps[o].progress = n
                        }
                    }
                    , !0);
                    var l = a(c.path("projects/:projectId"), {
                        projectId: "@id"
                    }
                    , {
                        update: {
                            method: "PUT"
                        }
                    }
                    ), u = "creator", p = i("filter")(e.user.user_roles, {
                        role: u
                    }
                    , !0);
                    if ("undefined" != typeof p && p.length > 0) {
                        var g = p[0];
                        e.activeRole !== u && e.switchUserRole(u, g.id, !0);
                        var f = parseInt(n.projectId);
                        console.log("getting stuff"), "undefined" == typeof f || isNaN(f) ? (console.log("getting draft_only"), l.query({
                            draft_only: 1, fd_active_role: e.activeRole
                        }
                        ).$promise.then(function (e) {
                            t.allProjects = e
                        }
                        )["finally"](function () {
                            e.sectionLoading = !1
                        }
                        )) : angular.isNumber(f) && isFinite(f) && l.get({
                            projectId: f, fd_active_role: e.activeRole
                        }
                        ).$promise.then(function (e) {
                            t.project = e
                        }
                        )["finally"](function () {
                            e.sectionLoading = !1, e.innerSectionLoading = !0
                        }
                        )
                    } else
                        r(function () {
                            e.sectionLoading = !1, o.go("app.projects")
                        }
                        , 2e3);
                    t.goToProject = function (e) {
                        o.go("app.create.details", {
                            projectId: e.id
                        }
                        )
                    }
                    , t.createNewProject = function () {
                        t.data.newProjectLoading = !0;
                        (new l).$save().then(function (e) {
                            t.goToProject(e), t.data.newProjectLoading = !1
                        }
                        )
                    }
                    , t.saveProgress = function () {
                        var e = angular.copy(t.project);
                        console.log(e), "undefined" != typeof t.project && l.update({
                            projectId: t.project.id
                        }
                        , e).$promise.then(function (e) {
                            console.log("result"), console.log(e)
                        }
                        )
                    }
                    , s.toTop()
                }
            ]),
                    angular.module("fundator.controllers").controller("CreateDetailsCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "FdScroller", function (e, t, o, n, a, r) {
                    t.data = {
                        featuredImage: {}
                        , datepicker: {
                            isOpen: !1
                        }
                    }
                    , t.details = {
                        name: "", geography: "wherever"
                    }
                    , t.languages = ["English", "Chinese", "French", "Korean"], t.countries = [{
                            code: "us", name: "United States"
                        }
                        , {
                            code: "cn", name: "China"
                        }
                        , {
                            code: "fr", name: "France"
                        }
                        , {
                            code: "kr", name: "South Korea"
                        }
                    ], t.tagTransform = function (e) {
                        var t = {
                            name: e
                        }
                        ;
                        return t
                    }
                    , t.$watch("project", function (o) {
                        null !== o ? (t.details = o, e.innerSectionLoading = !1) : console.log("project still loading")
                    }
                    ), t.$on("flow::fileAdded", function (e, t, o) {
                        e.preventDefault()
                    }
                    ), t.featuredImageSuccess = function (e, o) {
                        var n = JSON.parse(o);
                        t.project.thumbnail_id = n.file.id, t.project.thumbnail = n.file.file_url, t.saveProgress()
                    }
                    , t.attachedFilesSuccess = function (e, o) {
                        var n = JSON.parse(o), a = t.project.attachedFiles.indexOf(n.file.id);
                        -1 === a && t.project.attachedFiles.push(n.file.id)
                    }
                    , t.submitDraft = function () {
                        t.project.state = .9, t.saveProgress(), r.toSection(".steps-content")
                    }
                    , r.toSection("#projectSteps")
                }
            ]),
                    angular.module("fundator.controllers").controller("CreateSECtrl", ["$rootScope", "$scope", "$state", "$http", "$timeout", "FdScroller", "API", function (e, t, o, n, a, r, i) {
                    console.log("CreateSECtrl Started"), n.get(i.path("super-experts")).then(function (e) {
                        t.superExperts = e.data
                    }
                    )["finally"](function () {
                        e.innerSectionLoading = !1
                    }
                    ), t.chooseSuperExpert = function (e) {
                        t.project.super_expert_id = e.id, t.saveProgress(), r.toSection(".steps-content"), a(function () {
                            o.go("app.create.expertise")
                        }
                        , 300)
                    }
                }
            ]),
                    angular.module("fundator.controllers").controller("CreateExpertiseCtrl", ["$rootScope", "$scope", "$state", "$resource", "$http", "$timeout", "FdScroller", "API", function (e, t, o, n, a, r, i, s) {
                    console.log("CreateExpertiseCtrl Started"), e.innerSectionLoading = !0, t.inputtedExpertiseList = [], t.expertiseList = [], t.inputtedEpxertise = null, t.savingExpertise = !1, t.loadedOnce = !1;
                    var c = n(s.path("/projects/:projectId/expertise"), {
                        projectId: "@id"
                    }
                    );
                    t.fetchExpertise = function () {
                        c.query({
                            projectId: t.project.id
                        }
                        ).$promise.then(function (e) {
                            t.expertiseList = e
                        }
                        )["finally"](function () {
                            e.innerSectionLoading = !1, t.loadedOnce = !0
                        }
                        )
                    }
                    , t.$watch("project", function (e) {
                        "undefined" != typeof e && null !== e && t.fetchExpertise()
                    }
                    ), t.saveExpertise = function (e) {
                        t.savingExpertise = !0;
                        var o = {
                            task: e.mainTask, budget: e.budget, lead_time: e.leadTime, start_date: e.startDate
                        }
                        ;
                        null !== e.selectedExpertise ? o.expertise_id = e.selectedExpertise.id : o.other_expertise = e.otherExpertise, null !== e.selectedExpertiseSubCategory ? o.expertise_sub_category_id = e.selectedExpertiseSubCategory.id : o.other_expertise_sub_category = e.otherExpertiseSubCategory, null !== e.selectedExpertiseCategory ? o.expertise_category_id = e.selectedExpertiseCategory.id : o.other_expertise_category = e.otherExpertiseCategory, a.post(s.path("/projects/") + t.project.id + "/expertise", o).then(function (e) {
                            console.log(e.data), t.expertiseList.push(e.data)
                        }
                        )["finally"](function () {
                            t.savingExpertise = !1
                        }
                        ), t.inputtedExpertiseList = [], t.inputtedEpxertise = null
                    }
                    , t.saveExpertiseSelection = function () {
                        t.project.state = 2.9, t.saveProgress(), i.toSection(".steps-content")
                    }
                    , t.addNewInputtedExpertise = function () {
                        var e = {
                            selectedExpertise: "null", otherExpertise: {
                                status: 1
                            }
                        }
                        ;
                        t.inputtedExpertiseList.length > 0 && t.inputtedExpertiseList[t.inputtedExpertiseList.length - 1], t.inputtedExpertiseList.length < 3 && null !== e.selectedExpertise && 0 !== e.otherExpertise.status && (t.inputtedExpertiseList.push({
                            expertiseCategoryList: [], expertiseSubCategoryList: [], expertiseList: [], selectedExpertiseCategory: null, otherExpertiseCategory: {
                                name: "", status: 0
                            }
                            , selectedExpertiseSubCategory: null, otherExpertiseSubCategory: {
                                name: "", status: 0
                            }
                            , selectedExpertise: null, otherExpertise: {
                                name: "", status: 0
                            }
                            , mainTask: "", budget: "", leadTime: "", startDate: "", step: 1, loading: !1
                        }
                        ), t.inputtedEpxertise = t.inputtedExpertiseList[t.inputtedExpertiseList.length - 1]), t.fetchExpertiseCategory(t.inputtedExpertiseList.length - 1)
                    }
                    , t.selectExpertiseCategory = function (e, o, n) {
                        0 === n ? (t.inputtedExpertiseList[e].selectedExpertiseCategory = o, t.inputtedExpertiseList[e].step = 2, t.fetchExpertiseSubCategory(e)) : (t.inputtedExpertiseList[e].selectedExpertiseSubCategory = o, t.inputtedExpertiseList[e].step = 3, t.fetchExpertiseList(e))
                    }
                    , t.deselectExpertiseCategory = function (e, o, n) {
                        0 === n ? (t.inputtedExpertiseList[o].selectedExpertiseCategory = null, t.inputtedExpertiseList[o].otherExpertiseCategory = {
                            name: "", status: 0
                        }
                        , t.inputtedExpertiseList[o].selectedExpertiseSubCategory = null, t.inputtedExpertiseList[o].otherExpertiseSubCategory = {
                            name: "", status: 0
                        }
                        , t.inputtedExpertiseList[o].selectedExpertise = null, t.inputtedExpertiseList[o].otherExpertise = {
                            name: "", status: 0
                        }
                        ) : (t.inputtedExpertiseList[o].selectedExpertiseSubCategory = null, t.inputtedExpertiseList[o].otherExpertiseSubCategory = {
                            name: "", status: 0
                        }
                        , t.inputtedExpertiseList[o].selectedExpertise = null, t.inputtedExpertiseList[o].otherExpertise = {
                            name: "", status: 0
                        }
                        ), e.stopPropagation()
                    }
                    , t.saveOtherExpertiseCategory = function (e, o) {
                        0 === o ? (t.inputtedExpertiseList[e].selectedExpertiseCategory = null, t.inputtedExpertiseList[e].selectedExpertiseSubCategory = null, t.inputtedExpertiseList[e].otherExpertiseSubCategory = {
                            name: "", status: 0
                        }
                        , t.inputtedExpertiseList[e].selectedExpertise = null, t.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                        , t.inputtedExpertiseList[e].otherExpertiseCategory.status = 1, t.inputtedExpertiseList[e].step = 2) : (t.inputtedExpertiseList[e].selectedExpertiseSubCategory = null, t.inputtedExpertiseList[e].selectedExpertise = null, t.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                        , t.inputtedExpertiseList[e].otherExpertiseSubCategory.status = 1, t.inputtedExpertiseList[e].step = 3)
                    }
                    , t.removeOtherExpertiseCategory = function (e, o) {
                        0 === o ? (t.inputtedExpertiseList[e].otherExpertiseCategory = {
                            name: "", status: 0
                        }
                        , t.inputtedExpertiseList[e].otherExpertiseSubCategory = {
                            name: "", status: 0
                        }
                        , t.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                        ) : (t.inputtedExpertiseList[e].otherExpertiseSubCategory = {
                            name: "", status: 0
                        }
                        , t.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                        )
                    }
                    , t.selectExpertise = function (e, o) {
                        t.inputtedExpertiseList[e].selectedExpertise = o, t.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                        , t.inputtedExpertiseList[e].step = 4
                    }
                    , t.deselectExpertise = function (e, o) {
                        t.inputtedExpertiseList[o].selectedExpertise = null, e.stopPropagation(o)
                    }
                    , t.saveOtherExpertise = function (e) {
                        t.inputtedExpertiseList[e].selectedExpertise = null, t.inputtedExpertiseList[e].otherExpertise.status = 1, t.inputtedExpertiseList[e].step = 4
                    }
                    , t.removeOtherExpertise = function (e) {
                        t.inputtedExpertiseList[e].otherExpertise = {
                            name: "", status: 0
                        }
                    }
                    , t.fetchExpertiseCategory = function (e) {
                        t.inputtedExpertiseList[e].expertiseCategoryList = [], t.inputtedExpertiseList[e].loading = !0, a.get(s.path("/expertise-category/0")).then(function (o) {
                            t.inputtedExpertiseList[e].expertiseCategoryList = o.data, t.inputtedExpertiseList[e].loading = !1
                        }
                        )
                    }
                    , t.fetchExpertiseSubCategory = function (e) {
                        t.expertiseSubCategoryList = [], t.inputtedExpertiseList[e].loading = !0, a.get(s.path("/expertise-category/") + t.inputtedExpertiseList[e].selectedExpertiseCategory.id).then(function (o) {
                            t.inputtedExpertiseList[e].expertiseSubCategoryList = o.data, t.inputtedExpertiseList[e].loading = !1
                        }
                        )
                    }
                    , t.fetchExpertiseList = function (e) {
                        t.inputtedExpertiseList[e].expertiseList = [], t.inputtedExpertiseList[e].loading = !0, a.get(s.path("/expertise/category/") + t.inputtedExpertiseList[e].selectedExpertiseSubCategory.id).then(function (o) {
                            t.inputtedExpertiseList[e].expertiseList = o.data, t.inputtedExpertiseList[e].loading = !1
                        }
                        , 2e3)
                    }
                }
            ]),
                    angular.module("fundator.controllers").controller("CreateExpertCtrl", ["$rootScope", "$scope", "$state", "$resource", "$http", "$timeout", "API", "SweetAlert", "FdScroller", function (e, t, o, n, a, r, i, s, c) {
                    console.log("CreateExpertCtrl Started"), t.data = {
                        selectedBid: null
                    }
                    ;
                    var d = n(i.path("/projects/:projectId/expertise"), {
                        projectId: "@id"
                    }
                    );
                    t.fetchExpertise = function () {
                        d.query({
                            projectId: t.project.id
                        }
                        ).$promise.then(function (e) {
                            t.expertiseList = e
                        }
                        )["finally"](function () {
                            e.innerSectionLoading = !1
                        }
                        )
                    }
                    , t.$watch("project", function (e) {
                        "undefined" != typeof e && null !== e && t.fetchExpertise()
                    }
                    ), t.shortlistExpert = function (e, t) {
                        "undefined" == typeof e.shortlist && (e.shortlist = []), e.shortlist.push(t)
                    }
                    , t.isShortlistExpert = function (e, t) {
                        return"undefined" != typeof e.shortlist ? -1 !== e.shortlist.indexOf(t) : !1
                    }
                    , t.removeShortlistExpert = function (e, t) {
                        var o = e.shortlist.indexOf(t);
                        -1 !== o && e.shortlist.splice(o, 1)
                    }
                    , t.discussExpert = function (e, o) {
                        t.data.selectedBid = o
                    }
                    , t.hideDiscussExpert = function () {
                        t.data.selectedBid = null
                    }
                    , t.selectExpert = function (e, t) {
                        s.swal({
                            title: "Are you sure?", text: "You are selecting " + t.expert.name + " to complete your task.", type: "warning", showCancelButton: !0, confirmButtonColor: "#F8C486", confirmButtonText: "Yes, go ahead!", cancelButtonText: "Cancel", closeOnConfirm: !1, closeOnCancel: !0
                        }
                        , function (o) {
                            o && a.put(i.path("/project-expertise/" + e.id + "/bid/" + t.id), {}
                            ).then(function (o) {
                                "undefined" == typeof o.data.error && (e.selected_bid = t, s.swal("Selected!", "You have selected the expert.", "success"))
                            }
                            )
                        }
                        )
                    }
                    , t.confirmExperts = function () {
                        t.project.state = 3.9, t.saveProgress(), c.toSection(".steps-content")
                    }
                }
            ]),
                    angular.module("fundator.controllers").controller("CreateBudgetCtrl", ["$rootScope", "$scope", "$state", "$resource", "API", "FdScroller", function (e, t, o, n, a, r) {
                    console.log("CreateBudgetCtrl Started"), e.innerSectionLoading = !0;
                    var i = n(a.path("project-finance/:projectFinanceId"), {
                        projectFinanceId: "@id"
                    }
                    , {
                        update: {
                            method: "PUT"
                        }
                    }
                    );
                    t.data = {
                        startMonthRepayment: "3", investorSliderRange: [5, 15], paybackDuration: null
                    }
                    , t.projectFinance = {
                        base_budget: 600, adjustment_margin: 10, self_funding_amount: 0, funding_amount: 0, payable_intrest: 15, payback_duration: 6, payback_duration_extended: 2, investors_message_creator: "", investors_message_se: ""
                    }
                    , t.$watch("project", function (o) {
                        "undefined" != typeof o && null !== o && i.get({
                            projectFinanceId: o.project_finance_id
                        }
                        ).$promise.then(function (e) {
                            t.projectFinance = e, t.data.investorSliderRange[0] = e.investors_min, t.data.investorSliderRange[1] = e.investors_max, t.data.paybackDuration = "" !== e.mini_plan ? JSON.parse(e.mini_plan) : t.getPaybackDuration(), t.data.oldPaybackDuration = angular.copy(t.data.paybackDuration)
                        }
                        )["finally"](function () {
                            e.innerSectionLoading = !1
                        }
                        )
                    }
                    ), t.$watch("projectFinance", function (e) {
                        "undefined" != typeof e && t.data.oldPaybackDuration !== t.data.paybackDuration && (t.data.paybackDuration = t.getPaybackDuration())
                    }
                    , !0), t.getRepaymentMonths = function () {
                        var e = angular.copy(t.projectFinance.payback_duration), o = [];
                        e >= 12 && (e = 11);
                        for (var n = 0;
                                e > n;
                                n++)
                            o.push(n);
                        return o
                    }
                    , t.getTotalBudget = function (e) {
                        var o = t.projectFinance.base_budget + t.projectFinance.base_budget * (t.projectFinance.adjustment_margin / 100);
                        if (e) {
                            var n = angular.copy(t.projectFinance.payback_duration), a = t.projectFinance.payable_intrest / 12, r = a * n;
                            o += o * (r / 100)
                        }
                        return o
                    }
                    , t.getRemainingBudget = function (e) {
                        var o = t.projectFinance.base_budget - t.projectFinance.self_funding_amount, n = o + o * (t.projectFinance.adjustment_margin / 100);
                        if (e) {
                            var a = angular.copy(t.projectFinance.payback_duration), r = t.projectFinance.payable_intrest / 12, i = r * a;
                            n += n * (i / 100)
                        }
                        return n
                    }
                    , t.getPaybackDuration = function () {
                        if (t.projectFinance.payback_duration === t.data.oldPaybackDuration)
                            return t.data.paybackDurationArray;
                        var e = [];
                        t.data.oldPaybackDuration = angular.copy(t.projectFinance.payback_duration);
                        for (var o = angular.copy(t.projectFinance.payback_duration), n = Math.floor(o / 12), a = o % 12, r = 0;
                                n > r;
                                r++) {
                            for (var i = [], s = 0;
                                    12 > s;
                                    s++)
                                i.push({
                                    sold: 0
                                }
                                );
                            e.push(i)
                        }
                        if (a > 0) {
                            for (var c = [], d = 0;
                                    a > d;
                                    d++)
                                c.push({
                                    sold: 0
                                }
                                );
                            e.push(c)
                        }
                        return t.data.paybackDurationArray = angular.copy(e), angular.copy(e)
                    }
                    , t.saveInvestorLimit = function () {
                        t.projectFinance.investors_min = t.data.investorSliderRange[0], t.projectFinance.investors_max = t.data.investorSliderRange[1], t.saveFinanceProgress()
                    }
                    , t.saveFinanceProgress = function () {
                        var e = angular.copy(t.projectFinance);
                        e.funding_amount = t.getTotalBudget() - e.self_funding_amount, "undefined" != typeof e && i.update({
                            projectFinanceId: e.id
                        }
                        , e).$promise.then(function (e) {
                            console.log("result"), console.log(e)
                        }
                        )
                    }
                    , t.confirmBudget = function () {
                        t.projectFinance.mini_plan = JSON.stringify(t.data.paybackDuration), t.saveFinanceProgress(), t.project.state = 4.9, t.saveProgress(), r.toSection(".steps-content")
                    }
                }
            ]),
                    angular.module("fundator.controllers").controller("CreateInvestorsCtrl", ["$rootScope", "$scope", "$state", "$http", "$filter", "API", "SweetAlert", function (e, t, o, n, a, r, i) {
                    console.log("CreateInvestorsCtrl Started"), t.investmentBids = [], t.shortlistBid = function (e) {
                        e.type = "shortlist", n.put(r.path("/projects/" + e.project.id + "/investment-bids/" + e.id), e).then(function (o) {
                            o && (t.investmentData.shortlist_bids.push(e), t.investmentData.amount_shortlist = t.investmentData.amount_shortlist + e.bid_amount_max)
                        }
                        )
                    }
                    , t.unShortlistBid = function (e) {
                        e.type = "", n.put(r.path("/projects/" + e.project.id + "/investment-bids/" + e.id), e).then(function (o) {
                            if (o) {
                                var n = t.investmentData.shortlist_bids.indexOf(e);
                                t.investmentData.shortlist_bids.splice(n, 1), t.investmentData.amount_shortlist = t.investmentData.amount_shortlist - e.bid_amount_max
                            }
                        }
                        )
                    }
                    , t.unSelectBid = function (e) {
                        i.swal({
                            title: "Are you sure?", text: "You are removing an investment bid from : " + e.investor.name + " " + e.investor.last_name, type: "warning", showCancelButton: !0, confirmButtonColor: "#F8C486", confirmButtonText: "Yes, go ahead!", cancelButtonText: "Cancel", closeOnConfirm: !1, closeOnCancel: !0
                        }
                        , function (o) {
                            o && (e.type = "", n.put(r.path("/projects/" + e.project.id + "/investment-bids/" + e.id), e).then(function (o) {
                                if (o) {
                                    var n = t.investmentData.shortlist_bids.indexOf(e);
                                    t.investmentData.shortlist_bids.splice(n, 1), t.investmentData.amount_selected = t.investmentData.amount_selected - e.bid_amount_max
                                }
                                i.swal("Removed!", "You have removed an Investor!", "success")
                            }
                            ))
                        }
                        )
                    }
                    , t.selectBid = function (e) {
                        i.swal({
                            title: "Are you sure?", text: "You are selecting an investment bid from :  " + e.investor.name + " " + e.investor.last_name, type: "warning", showCancelButton: !0, confirmButtonColor: "#F8C486", confirmButtonText: "Yes, go ahead!", cancelButtonText: "Cancel", closeOnConfirm: !1, closeOnCancel: !0
                        }
                        , function (o) {
                            o && (e.type = "select", n.put(r.path("/projects/" + e.project.id + "/investment-bids/" + e.id), e).then(function (o) {
                                o && (t.investmentData.selected_bids.push(e), t.investmentData.amount_selected = t.investmentData.amount_selected + e.bid_amount_max), i.swal("Selected!", "You have selected an Investor!", "success")
                            }
                            , function () {
                                i.swal("Error!", "Investor could not be selected", "error")
                            }
                            ))
                        }
                        )
                    }
                    , t.switchSource = function (e) {
                        switch (e) {
                            case"shortlist":
                                t.bidSource = t.investmentData.shortlist_bids, t.bidSourceType = "shortlist";
                                break;
                            case"selected":
                                t.bidSource = t.investmentData.selected_bids, t.bidSourceType = "selected";
                                break;
                            default:
                                t.bidSource = t.investmentData.all_bids, t.bidSourceType = "all"
                        }
                    }
                    , t.$watch("project", function (o) {
                        "undefined" != typeof o && null !== o && n.get(r.path("/projects/" + o.id + "/investment-bids")).then(function (e) {
                            t.investmentData = e.data;
                            var o = angular.copy(t.investmentData.shortlist_bids), n = [], r = angular.copy(t.investmentData.selected_bids), i = [];
                            angular.forEach(o, function (e) {
                                var o = a("filter")(t.investmentData.all_bids, {
                                    id: e
                                }
                                , !0)[0];
                                n.push(o)
                            }
                            ), t.investmentData.shortlist_bids = n, angular.forEach(r, function (e) {
                                var o = a("filter")(t.investmentData.all_bids, {
                                    id: e
                                }
                                , !0)[0];
                                i.push(o)
                            }
                            ), t.investmentData.selected_bids = i, t.bidSource = t.investmentData.all_bids, t.bidSourceType = "all"
                        }
                        )["finally"](function () {
                            e.innerSectionLoading = !1
                        }
                        )
                    }
                    ), t.confirmInvestors = function () {
                        t.project.state = 5.9, t.saveProgress(), FdScroller.toSection(".steps-content")
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("ExpertCtrl", ["$rootScope", "$scope", "$state", "$resource", "$filter", "$timeout", "FdScroller", "API", function (e, t, o, n, a, r, i, s) {
                    console.log("Expert Started"), t.expertiseSource = null, t.availableExpertise = [], t.matchingExpertise = [], t.data = {}
                    ;
                    var c = n(s.path("expertise/available")), d = n(s.path("expertise/matching"), {}
                    , {
                        query: {
                            method: "GET", isArray: !1
                        }
                    }
                    ), l = "expert", u = a("filter")(e.user.user_roles, {
                        role: l
                    }
                    , !0), p = !1;
                    if ("undefined" != typeof u && u.length > 0) {
                        var g = u[0];
                        e.activeRole !== l ? e.switchUserRole(l, g.id, !0) : p = !0
                    } else
                        r(function () {
                            e.$broadcast("stopLoading"), o.go("app.contests")
                        }
                        , 2e3);
                    p && (e.$broadcast("stopLoading"), c.query().$promise.then(function (e) {
                        t.availableExpertise = e, t.expertiseSource = t.availableExpertise
                    }
                    ), d.query().$promise.then(function (e) {
                        t.matchingExpertise = e.expertise
                    }
                    ))
                }
            ]),
                    angular.module("fundator.controllers").controller("ExpertiseCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "FdScroller", "API", function (e, t, o, n, a, r, i, s) {
                    console.log("Expertise Started"), i.toTop(), t.data = {}
                    , t.expertise = null;
                    var c = a(s.path("/project-expertise/:expertiseId"), {
                        expertiseId: "@id"
                    }
                    );
                    c.get({
                        expertiseId: n.expertiseId
                    }
                    ).$promise.then(function (o) {
                        t.expertise = o, e.$broadcast("stopLoading")
                    }
                    ), t.submitBid = function () {
                        t.data.bidLoading = !0;
                        var e = {
                            bid_amount: t.data.bid_amount, description: t.data.bid_description
                        }
                        ;
                        r.post(s.path("/project-expertise/") + n.expertiseId + "/bid", e).then(function (e) {
                            t.expertise.bid = e.data
                        }
                        )["finally"](function () {
                            t.data.bidLoading = !1
                        }
                        )
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("FooterController", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function (e, t, o, n, a, r, i, s, c) {
                    t.notifications = null;
                    var d = a(c.path("/contests/:contestId"), {
                        contestId: "@id"
                    }
                    );
                    d.query().$promise.then(function (e) {
                        t.ongoingContests = e
                    }
                    )
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("FlashNoticeCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$timeout", function (e, t, o, n, a, r) {
                    e.flashNotices = {}
                    , e.flashNotices.juryView = {
                        show: !1, contestId: 0, onClick: function () {
                            console.log("onClick"), e.switchUserRole("jury", 5, !0)
                        }
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("HeaderCtrl", ["$rootScope", "$scope", "$state", "$auth", "$uibModal", function (e, t, o, n, a) {
                    t.triggerLogin = function () {
                        console.log("trigger login!");
                        var e = a.open({
                            animation: !0, templateUrl: "login.html", controller: "LoginCtrl", size: "md", windowClass: "login-modal"
                        }
                        );
                        e.result.then(function () {
                            console.log("Got close feedback!")
                        }
                        , function () {
                            console.log("Modal dismissed at: " + new Date)
                        }
                        )
                    }
                }
            ]),
                    angular.module("fundator.controllers").controller("LoginCtrl", ["$scope", "$uibModalInstance", function (e, t) {
                    e.login = function () {
                        console.log("logging in now !")
                    }
                    , e.authenticate = function () {
                        console.log("auth in now !")
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            function e(e) {
                var t;
                t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]);
                for (var o = e.split(",")[0].split(":")[1].split(";")[0], n = new Uint8Array(t.length), a = 0;
                        a < t.length;
                        a++)
                    n[a] = t.charCodeAt(a);
                return new Blob([n], {
                    type: o
                }
                )
            }
            angular.module("fundator.controllers").controller("NavigationCtrl", ["$rootScope", "$scope", "$state", "$auth", "$log", "$timeout", "$filter", "$http", "$resource", "$uibModal", "FileUploader", "CountryCodes", "API", function (t, o, n, a, r, i, s, c, d, l, u, p, g) {
                    o.allSkills = [], o.allSkills = d(g.path("skills")).query(), o.uploader = new u({
                        url: g.path("files"), removeAfterUpload: !0
                    }
                    ), o.data = {
                        userSettingsMode: "view", userSettingsSave: -1, socialConnect: {
                            facebook: {}
                            , linkedin: {}
                        }
                        , twoFA: {}
                    }
                    , "undefined" != typeof t.user && (o.data.twoFA = {
                        countryCode: angular.copy(t.user.contact_number_country_code), number: angular.copy(t.user.contact_number), verificationCode: ""
                    }
                    ), o.countryCodes = p(), o.startTwoFAVerify = function () {
                        o.data.twoFA.loading = !0;
                        var e = 1;
                        e = "undefined" != typeof o.data.twoFA.countryCode.code ? o.data.twoFA.countryCode.code : o.data.twoFA.countryCode;
                        var t = {
                            via: "sms", country_code: parseInt(e), phone_number: parseInt(o.data.twoFA.number), locale: "en"
                        }
                        ;
                        c.post(g.path("/verification/start"), t).then(function (e) {
                            e.data.success && (o.data.twoFA.loading = !1, o.data.twoFA.codeSent = !0)
                        }
                        , function (e) {
                            alert(JSON.stringify(e))
                        }
                        )
                    }
                    , o.completeTwoFAVerfiy = function () {
                        o.data.twoFA.loading = !0;
                        var e = 1;
                        e = "undefined" != typeof o.data.twoFA.countryCode.code ? o.data.twoFA.countryCode.code : o.data.twoFA.countryCode;
                        var n = {
                            country_code: parseInt(e), phone_number: parseInt(o.data.twoFA.number), verification_code: parseInt(o.data.twoFA.verificationCode)
                        }
                        ;
                        c.post(g.path("/verification/check"), n).then(function (e) {
                            console.log("verification data"), console.log(e.data), e.data.success && (o.data.twoFA.codeSent = !1, o.data.twoFA.verify = !1, t.user.phone_verified = 1)
                        }
                        , function (e) {
                            alert(JSON.stringify(e))
                        }
                        )
                    }
                    , o.socialConnect = function (e) {
                        o.data.socialConnect[e].loading = !0, a.authenticate(e).then(function (n) {
                            console.log("Logged in "), console.log(n), t.user[e] = !0, o.data.socialConnect[e].loading = !1
                        }
                        )["catch"](function (t) {
                            console.log("Not Logged in "), console.log(t), alert(JSON.stringify(t)), o.data.socialConnect[e].loading = !1
                        }
                        )
                    }
                    , o.socialUnlink = function (e) {
                        var n = null;
                        switch (o.data.socialConnect[e].loading = !0, e) {
                            case"facebook":
                                n = "unlinkFacebook";
                                break;
                            case"linkedin":
                                n = "unlinkLinkedin"
                        }
                        c.post(g.path("authenticate/") + n, {}
                        ).then(function (o) {
                            console.log(o), t.user[e] = null
                        }
                        , function (e) {
                            alert(JSON.stringify(e))
                        }
                        )["finally"](function () {
                            o.data.socialConnect[e].loading = !1
                        }
                        )
                    }
                    , o.saveProfile = function () {
                        var e = angular.copy(t.user);
                        delete e.creator, delete e.investor, delete e.judging, o.data.userSettingsSave = 0, c.put(g.path("users/") + t.user.id, e).then(function (e) {
                            "Updated" === e.data && (o.data.userSettingsSave = 1, o.data.userSettingsMode = "view", i(function () {
                                o.data.userSettingsSave = -1
                            }
                            , 1e3))
                        }
                        , function (e) {
                            console.log("error"), alert(e)
                        }
                        )["finally"](function () {
                            i(function () {
                                o.data.userSettingsSave = -1
                            }
                            , 1e3)
                        }
                        )
                    }
                    , o.changeThumbnail = function () {
                        var n = l.open({
                            animation: !0, templateUrl: "./views/app/app/header/user-thumbnail.html", controller: "UserThumbnailCtrl", size: "md"
                        }
                        );
                        n.result.then(function (n) {
                            t.user.thumbnail = angular.copy(n), o.uploader.onBeforeUploadItem = function (e) {
                                e.file.name = "thumbnail_" + t.user.id + ".png", e.formData = [], e.formData.push({
                                    attach: "thumbnail"
                                }
                                ), e.formData.push({
                                    user_id: t.user.id
                                }
                                )
                            }
                            , o.uploader.onSuccessItem = function (e, t, o, n) {
                                console.log("updated user thumbnail"), console.log(t)
                            }
                            , o.uploader.addToQueue(e(n)), o.uploader.uploadAll()
                        }
                        , function () {
                            r.info("Modal dismissed at: " + new Date)
                        }
                        )
                    }
                    , o.logout = function () {
                        console.log("actually logging out! ..."), a.logout().then(function () {
                            localStorage.removeItem("fundator_token"), t.authenticated = !1, t.user = void 0, t.isNavShown = !1, n.go("app.auth.login", {}
                            , {
                                reload: !0
                            }
                            )
                        }
                        )
                    }
                    , o.populateSideNavigation = function () {
                        c.get(g.path("users/sideNavigationData")).then(function (e) {
                            "undefined" == typeof e.data.error && (o.sideNavigationData = e.data)
                        }
                        )
                    }
                    , t.$watch("user", function (e) {
                        "undefined" != typeof e && t.initialRoleAssignment !== !1 && o.populateSideNavigation()
                    }
                    ), o.openFullMenu = function () {
                        t.isNavShown = 1
                    }
                    , o.goToLink = function (e, o, n) {
                        t.isNavShown = 0;
                        var a = s("filter")(t.user.user_roles, {
                            role: n
                        }
                        , !0);
                        if ("undefined" != typeof a && a.length > 0) {
                            var n = a[0];
                            t.switchUserRole(n.role, n.id, !0, e, o)
                        }
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("UserThumbnailCtrl", ["$scope", "$rootScope", "$uibModalInstance", function (e, t, o) {
                    e.thumbnail = null, e.croppedThumbnail = null, e.fileName = "No file selected", e.imageError = null;
                    var n = function (t, o) {
                        if (t.stopPropagation(), t.preventDefault(), e.$apply(function () {
                            e.dropable = !1
                        }
                        ), t.originalEvent.dataTransfer)
                            var n = t.originalEvent.dataTransfer.files[0];
                        else
                            var n = t.currentTarget.files[0];
                        var a = new FileReader;
                        return-1 == n.type.indexOf("image") ? void e.$apply(function (e) {
                            e.imageError = "Please select a valid image to crop"
                        }
                        ) : (e.imageError = null, e.fileName = n.name, a.onload = function (t) {
                            e.$apply(function (e) {
                                console.log(t.target.result), e.thumbnail = t.target.result
                            }
                            )
                        }
                        , void(n && a.readAsDataURL(n)))
                    }
                    ;
                    $(document).on("dragover dragleave dragenter", ".img-upload-show", function (e) {
                        e.stopPropagation(), e.preventDefault()
                    }
                    ), $(document).on("dragenter", ".img-upload-show", function (t) {
                        t.stopPropagation(), t.preventDefault(), e.$apply(function () {
                            e.dropable = !0
                        }
                        )
                    }
                    ), $(document).on("dragleave", ".img-upload-show", function (t) {
                        t.stopPropagation(), t.preventDefault(), e.$apply(function () {
                            e.dropable = !1
                        }
                        )
                    }
                    ), $(document).on("change", "#fileInput", function (e) {
                        n(e, !1)
                    }
                    ), $(document).on("drop", ".img-upload-show", function (e) {
                        n(e, !0)
                    }
                    ), e.setThumbnail = function () {
                        o.close(e.croppedThumbnail)
                    }
                    , e.cancel = function () {
                        o.dismiss("cancel")
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("HomeCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$http", "$resource", "FdScroller", function (e, t, o, n, a, r, i) {
                    console.log("Home View Started"), e.$broadcast("stopLoading"), i.toTop(), console.log("get the current user role"), console.log(e.activeRole)
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("GrabShareCtrl", ["$rootScope", "$scope", "$state", "$http", "$timeout", "FdScroller", "API", function (e, t, o, n, a, r, i) {
                    function s() {
                        t.data.primaryShareListing = null, n.get(i.path("share-listing")).then(function (e) {
                            t.data.primaryShareListing = e.data
                        }
                        )
                    }
                    e.$broadcast("startLoading"), t.Math = window.Math, t.data = {
                        primaryShareListing: null, showBidNow: !1, myBid: {
                            bid_amount: .72, num_shares: 10, saving: !1
                        }
                    }
                    , r.toTop(), a(function () {
                        e.$broadcast("stopLoading")
                    }
                    , 2e3), t.investors = [{
                            name: "Alain Amoretti", country: "France", image: "1.jpg", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa eveniet deserunt ad pariatur praesentium, incidunt molestiae beatae quam quasi reiciendis mollitia accusantium voluptate quaerat sequi officia a facere repellat adipisci."
                        }
                        , {
                            name: "Charles d'anterroches", country: "France", image: "2.jpg", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita dignissimos nemo, sequi doloribus accusantium, obcaecati natus iure quam esse ex labore neque consequatur voluptate in, nihil ea, cum recusandae ut."
                        }
                        , {
                            name: "Christophe Brissiaud", country: "China", image: "3.jpg", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo enim officia optio dolorum harum, soluta culpa unde veniam nobis eos, ducimus quod praesentium veritatis atque non nostrum ipsam. Nostrum, et!"
                        }
                        , {
                            name: "Jean-Bernard Antoine", country: "China", image: "4.jpeg", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia recusandae aliquid quos aperiam molestiae quibusdam qui eos iure saepe optio vitae fugit unde nam, atque excepturi deserunt est, repellat alias."
                        }
                        , {
                            name: "Xavier Paulin", country: "Taiwan", image: "5.jpg", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt."
                        }
                        , {
                            name: "Cindy Chung", country: "Hong Kong", image: "6.jpg", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure inventore nesciunt illum, pariatur molestias dignissimos ipsa iste est. Sed, assumenda dolorum? Ab blanditiis quasi, voluptates iste iusto vero deserunt sunt."
                        }
                    ], s(), t.confirmBid = function () {
                        t.data.myBid.saving = !0;
                        var e = {
                            share_listing_id: t.data.primaryShareListing.id, bid_amount: t.data.myBid.bid_amount, num_shares: t.data.myBid.num_shares
                        }
                        ;
                        n.post(i.path("share-bids"), e).then(function (e) {
                            t.data.myBid.saving = !1, "undefined" == typeof e.error && (t.data.showBidNow = !1, s())
                        }
                        )
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("InvestCtrl", ["$rootScope", "$scope", "$state", "$resource", "FdScroller", function (e, t, o, n, a) {
                    console.log("Invest Started"), e.$broadcast("stopLoading"), a.toTop()
                }
            ]),
                    angular.module("fundator.controllers").controller("InvestmentCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "FdScroller", "API", function (e, t, o, n, a, r, i, s) {
                    console.log("Investment Started"), i.toTop(), t.data = {
                        paybackDuration: []
                    }
                    , t.investment = {}
                    ;
                    var c = a(s.path("/projects/:projectId"), {
                        projectId: "@id"
                    }
                    ), d = a(s.path("project-finance/:projectFinanceId"), {
                        projectFinanceId: "@id"
                    }
                    );
                    c.get({
                        projectId: n.projectId, fd_active_role: e.activeRole
                    }
                    ).$promise.then(function (o) {
                        t.project = o, d.get({
                            projectFinanceId: o.project_finance_id
                        }
                        ).$promise.then(function (o) {
                            t.project.finance = o, t.data.paybackDuration = JSON.parse(o.mini_plan), console.log(JSON.parse(o.mini_plan)), e.$broadcast("stopLoading")
                        }
                        )
                    }
                    ), t.submitBid = function () {
                        t.data.bidLoading = !0;
                        var e = {
                            bid_amount_min: t.data.bid_amount_min, bid_amount_max: t.data.bid_amount_max, description: t.data.bid_description
                        }
                        ;
                        r.post(s.path("/projects/" + n.projectId + "/investment-bids"), e).then(function (e) {
                            t.investment.bid = e.data
                        }
                        )["finally"](function () {
                            t.data.bidLoading = !1
                        }
                        )
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("NotificationsCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$http", "FdNotifications", function (e, t, o, n, a, r) {
                    t.fetchNotifications = function () {
                        t.notifications = null, t.notificationsLoading = !0, e.initialRoleAssignment && r.getLatestNotifications().then(function (e) {
                            t.notifications = e.notifications
                        }
                        )["finally"](function () {
                            t.notificationsLoading = !1
                        }
                        )
                    }
                    , console.log("notifications"), console.log(t.notifications), t.notifications || t.fetchNotifications()
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("PageCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$http", "FdScroller", "API", function (e, t, o, n, a, r, i) {
                    e.$broadcast("startLoading"), r.toTop(), t.page = {
                        title: "", content: ""
                    }
                    , a.get(i.path("pages") + n.slug).then(function (e) {
                        console.log("Success"), console.log(e), t.page = e.data
                    }
                    , function (e) {
                        console.log("Error"), console.log(e), "404" == e.status && console.log("load 404")
                    }
                    )["finally"](function () {
                        e.$broadcast("stopLoading")
                    }
                    )
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("ProjectsCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function (e, t, o, n, a, r, i, s, c) {
                    e.$broadcast("stopLoading"), t.data = {}
                    , t.projects = [], t.sectionLoading = !0;
                    var d = a(c.path("projects/:projectId"), {
                        projectId: "@id"
                    }
                    , {
                        query: {
                            method: "GET", isArray: !1
                        }
                    }
                    );
                    d.query({
                        fd_active_role: e.activeRole
                    }
                    ).$promise.then(function (o) {
                        "creator" === e.activeRole ? (t.projects = o.ongoing, t.draftProjects = o.draft) : "expert" === e.activeRole ? (t.ongoingTasks = o.ongoing, t.ongoingBids = o.bids, t.availableExpertise = o.available, t.matchingExpertise = o.matching, t.expertiseSource = t.availableExpertise) : "investor" === e.activeRole && (console.log("investable projects"), console.log(o), t.ongoingProjects = o.ongoing, t.investableProjects = o.investable)
                    }
                    )["finally"](function () {
                        i(function () {
                            t.sectionLoading = !1
                        }
                        , 1e3)
                    }
                    ), t.createNewProject = function () {
                        t.data.newProjectLoading = !0;
                        (new d).$save().then(function (e) {
                            t.goToProject(e), t.data.newProjectLoading = !1
                        }
                        )
                    }
                    , t.goToProject = function (e) {
                        o.go("app.create.details", {
                            projectId: e.id
                        }
                        )
                    }
                }
            ]),
                    angular.module("fundator.controllers").controller("ProjectCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function (e, t, o, n, a, r, i, s, c) {
                    e.$broadcast("stopLoading"), t.data = {}
                    , t.project = null, t.sectionLoading = !0, t.sections = [{
                            title: "PROJECT DETAILS", state: "app.project.details"
                        }
                        , {
                            title: "PUBLIC BOARD", state: "app.project.board"
                        }
                        , {
                            title: "TEAM", state: "app.project.team"
                        }
                    ], t.goToSection = function (e) {
                        o.go(e)
                    }
                    ;
                    var d = a(c.path("projects/:projectId"), {
                        projectId: "@id"
                    }
                    , {
                        query: {
                            method: "GET", isArray: !1
                        }
                    }
                    );
                    d.get({
                        projectId: n.projectId, fd_active_role: e.activeRole
                    }
                    ).$promise.then(function (e) {
                        t.project = e
                    }
                    )["finally"](function () {
                        i(function () {
                            t.sectionLoading = !1
                        }
                        , 1e3)
                    }
                    )
                }
            ]),
                    angular.module("fundator.controllers").controller("ProjectDetailsCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function (e, t, o, n, a, r, i, s, c) {
                    e.$broadcast("stopLoading"), t.data = {}
                    , e.innerSectionLoading = !0, t.$watch("project", function (o) {
                        null !== o ? (t.details = o, e.innerSectionLoading = !1) : console.log("project still loading")
                    }
                    )
                }
            ]),
                    angular.module("fundator.controllers").controller("ProjectTaskCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function (e, t, o, n, a, r, i, s, c) {
                    e.$broadcast("stopLoading"), t.data = {}
                    , e.innerSectionLoading = !0, t.$watch("project", function (o) {
                        null !== o ? (console.log("got in now!"), t.myTasks = o.tasks, e.innerSectionLoading = !1) : console.log("project still loading")
                    }
                    )
                }
            ]),
                    angular.module("fundator.controllers").controller("ProjectTeamCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function (e, t, o, n, a, r, i, s, c) {
                    e.$broadcast("stopLoading"), t.data = {}
                    , e.innerSectionLoading = !0, t.$watch("project", function (o) {
                        null !== o ? (t.details = o, e.innerSectionLoading = !1) : console.log("project still loading")
                    }
                    )
                }
            ]),
                    angular.module("fundator.controllers").controller("ProjectProgressCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function (e, t, o, n, a, r, i, s, c) {
                    e.$broadcast("stopLoading"), t.data = {}
                    , e.innerSectionLoading = !0, t.$watch("project", function (o) {
                        null !== o ? (t.details = o, e.innerSectionLoading = !1) : console.log("project still loading")
                    }
                    )
                }
            ]),
                    angular.module("fundator.controllers").controller("ProjectBoardCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "$http", "$timeout", "$filter", "API", function (e, t, o, n, a, r, i, s, c) {
                    e.$broadcast("stopLoading"), t.data = {}
                    , e.innerSectionLoading = !0, t.$watch("project", function (o) {
                        null !== o ? (t.details = o, e.innerSectionLoading = !1) : console.log("project still loading")
                    }
                    )
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("QuickUpdateCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$resource", "FdNotifications", "API", function (e, t, o, n, a, r, i) {
                    console.log("quickupdate"), t.data = {
                        editMode: !1
                    }
                    ;
                    var s = a(i.path("investors/:investorId"), {
                        investorId: "@id"
                    }
                    , {
                        update: {
                            method: "PUT"
                        }
                    }
                    );
                    t.editInvestment = function (e) {
                        t.data.editMode = e
                    }
                    , t.modifyInvestment = function () {
                        var o = {
                            investment_budget: e.user.investor.investment_budget
                        }
                        ;
                        t.editInvestment(!1), s.update({
                            investorId: e.user.investor.id
                        }
                        , o).$promise.then(function (e) {
                            "undefined" == typeof e.error && console.log(e)
                        }
                        )
                    }
                }
            ])
        }

(),
        function () {
            "use strict";
            angular.module("fundator.controllers").controller("TransactionCtrl", ["$rootScope", "$scope", "$state", "$stateParams", "$http", "$timeout", "FdScroller", function (e, t, o, n, a, r, i) {
                    console.log("TransactionCtrl"), e.$broadcast("startLoading"), i.toTop(), r(function () {
                        e.$broadcast("stopLoading")
                    }
                    , 2e3)
                }
            ])
        }

();
;