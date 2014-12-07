angular.module("christmas")

    .controller("lotteryController", function ($rootScope, $scope, personFactory, presenceFactory, avatarFactory, $state) {

        $scope.login = $rootScope.login;
        if (!$rootScope.isLoggedIn) {
            $state.go('login');
        }

        presenceFactory.initPresence($rootScope.login.split("@")[0]);

        $scope.christmasDay = new Date(2014, 11, 24, 0,0,0)
    })