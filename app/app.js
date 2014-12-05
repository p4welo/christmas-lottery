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
    })