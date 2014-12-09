angular.module("christmas")

    .controller("lotteryController", function ($rootScope, $scope, lotteryFactory, presenceFactory, avatarFactory, $state) {

        $scope.login = $rootScope.login;
        if (!$rootScope.isLoggedIn) {
            $state.go('login');
        }
        if ($rootScope.login != null) {
            presenceFactory.initPresence($rootScope.login);
        }

        $scope.oldies = lotteryFactory.findOldies();
        $scope.youngees = lotteryFactory.findYoungees();

        $scope.christmasDay = new Date(2014, 11, 24, 17, 0, 0)
        $scope.chosen = lotteryFactory.findChosenByLogin($rootScope.login);
        $scope.performed = lotteryFactory.wasPerformed();
        $scope.choose = lotteryFactory.choose($rootScope.login);
    })