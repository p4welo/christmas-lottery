angular.module("christmas")

    .controller("lotteryController", function ($rootScope, $scope, personFactory, presenceFactory, avatarFactory, $state) {

        $scope.login = $rootScope.login;
        if (!$rootScope.isLoggedIn) {
            $state.go('login');
        }

        presenceFactory.initPresence($rootScope.login);

        $scope.christmasDay = new Date(2014, 11, 24, 17,0,0)
    })