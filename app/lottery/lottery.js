angular.module("christmas")

    .controller("lotteryController", function ($rootScope, $scope, personFactory, presenceFactory, avatarFactory, $state) {

        $scope.login = $rootScope.login;
        if (!$rootScope.isLoggedIn) {
            $state.go('login');
        }
        $scope.people = personFactory.findAll();
        if ($rootScope.login != null) {
            presenceFactory.initPresence($rootScope.login);
        }

        $scope.christmasDay = new Date(2014, 11, 24, 17,0,0)
    })