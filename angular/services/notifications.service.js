(function() {
    "use strict";

    angular.module('fundator.services').factory('FdNotifications', function($rootScope, $q, $interval, $http, $state, API) {
        var globalNotifications = {
            notifications: [],
            unread: 0
        };

        var pushNotification = function(type, title, message) {
            globalNotifications.notifications.unshift({
                type: type,
                title: title,
                message: message
            });
        };

        return {
            init: function(notifications) {
                $rootScope.$watch('user', function(user){
                    if (typeof(user) === 'undefined') return;

                    if (typeof(notifications) !== 'undefined') {
                        globalNotifications = notifications;
                    }else{
                        $http.get(API.path('notifications/') + user.id).then(function(result){
                            globalNotifications = result.data;
                        });
                    }
                });
            },
            getLatestNotifications: function() {
                var getLatestNotificationsDeferred = $q.defer();

                var notificationsInterval = $interval(function() {
                    if (globalNotifications.notifications.length > 0) {
                        var latestNotifications = angular.copy(globalNotifications);
                        latestNotifications.notifications = latestNotifications.notifications.slice(0, 5);

                        $interval.cancel(notificationsInterval);
                        getLatestNotificationsDeferred.resolve(latestNotifications);
                    }
                }, 1000);

                return getLatestNotificationsDeferred.promise;
            },
            readNotification: function(notification) {
                return $http.post(API.path('notifications/') + notificationId + '/read').then(function(result){
                	notification.read = 1;
                });
            },
            readAllNotifications: function() {
                return $http.post(API.path('notifications/user/') + $rootScope.user.id + '/read').then(function(result){
                    globalNotifications.unread = 0;
                });
            },
            getNotifications: function() {
                return notifications;
            },
            notify: function(type, title, message, push) {
                toaster.pop(type, title, message);

                if (push) {
                    pushNotification(type, title, message);
                }
            },
            notifyError: function() {
                toaster.pop('error', title, message);
                pushNotification(type, title, message);
            }
        };
    });
})();
