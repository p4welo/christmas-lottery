angular.module("christmas", ["firebase", 'ui.router', 'timer'])

    .config(function ($stateProvider, $urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('lottery', {
                url: "/lottery",
                templateUrl: "app/lottery/lottery.html",
                controller: "lotteryController"
            })
            .state('login', {
                url: '/login',
                templateUrl: "app/login/login.html",
                controller: "loginController"
            })
//            .state('admin', {
//                url: '/admin',
//                templateUrl: "app/admin/admin.html",
//                controller: "adminController"
//            })
    })

    .run(function ($rootScope, $state, presenceFactory) {
        $rootScope.logout = function () {
            $rootScope.isLoggedIn = false;
            presenceFactory.logout($rootScope.login);
            $rootScope.login = "";
            $state.go('login');
        }
    })

    .controller("chatController", function ($scope, $rootScope, messageFactory, avatarFactory) {
        $scope.chatVisible = true;
        $scope.messages = messageFactory.findAll();
        $scope.newMsg = "";
        $scope.resolveAvatar = function (login) {
            return avatarFactory.getByLogin(login)
        }
        $scope.send = function (e) {
            if (e.keyCode != 13) return;
            messageFactory.add({
                author: $rootScope.login,
                text: $scope.newMsg,
                dateTime: Date.now()
            });
            $scope.newMsg = "";
        }
        $scope.toggleChat = function () {
            $scope.chatVisible = !$scope.chatVisible;
        }
    })

    .controller("menuController", function ($scope, presenceFactory, avatarFactory) {
        $scope.onlinePeople = presenceFactory.onlinePeople();
        $scope.resolveAvatar = function (login) {
            return avatarFactory.getByLogin(login)
        }
    })