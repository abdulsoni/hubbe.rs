(function() {
    "use strict";


    angular.module('fundator.directives')

    .directive('fdMessenger', function($rootScope, $resource, $timeout, API) {
        return {
            template: '<div class="chatbox" ng-if="threadId">' +
                '<div class="chatRow" ng-repeat="message in messages">' +
                    '<div class="chat-userSendbox" ng-class="{\'chat-send\': user.id == message.user.id, \'chat-comein\': user.id != message.user.id}">' +
                        '<div class="chat-content">{{message.body}}</div>' +
                    '</div>' +
                    '<div class="caht-label" ng-class=\'{"text-right": user.id == message.user.id}\'>' +
                        '{{message.user.name}} <span>{{message.created_at | amDateFormat:"MMM Do YYYY"}}:</span>' +
                    '</div>' +
                '</div>' +
                '<p class="no-have no-margin" ng-if="messages.length === 0">There are currently no messages.</p>' +
            '</div>' +
            '<form class="chatsendform" ng-if="threadId">' +
                '<div class="input-group">' +
                    '<input type="text" class="form-control" placeholder="Enter your message here ..." ng-model="data.messageToSend" fd-enter="sendMessage()">' +
                    '<span class="input-group-addon sendbtn" ng-click="sendMessage()"><span class="glyphicon">Send</span></span>' +
                '</div>' +
            '</form>',
            restrict: 'E',
            scope: {
                threadId: '='
            },
            link: function($scope, $element, $attrs) {
                $scope.data = {};
                $scope.messages = [];

                $scope.user = $rootScope.user;

                var Message = $resource(API.path('messages/:threadId'), {
                    threadId: '@id'
                }, {
                    get: {
                        method: 'GET',
                        isArray: true
                    }
                });

                $scope.$watch('threadId', function(threadId){
                    if (typeof(threadId) === 'undefined' || threadId === null) return;

                    Message.get({threadId: $scope.threadId}).$promise.then(function(result){
                        console.log('retriving the thread : ' + $scope.threadId);
                        $scope.messages = result;
                        $('.chatbox').animate({scrollTop: 10000});
                    });
                });

                $scope.sendMessage = function(){
                    var message = new Message();
                    message.thread_id = $scope.threadId;
                    message.message = $scope.data.messageToSend;

                    message.$save().then(function(result){
                        $scope.messages.push(result);
                        $scope.data.messageToSend = '';

                        $timeout(function(){
                            $('.chatbox').animate({scrollTop: 10000});
                        }, 100);
                    });
                };
            }
        };
    });

})();
