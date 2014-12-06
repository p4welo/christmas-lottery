angular.module("christmas", ["firebase", 'ui.router'])

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
            .state('admin', {
                url: '/admin',
                templateUrl: "app/admin/admin.html",
                controller: "adminController"
            })
    })

    .run(function ($rootScope, $state) {
        $rootScope.logout = function () {
            $rootScope.isLoggedIn = false;
            $rootScope.login = "";
            $state.go('login');
        }
    })