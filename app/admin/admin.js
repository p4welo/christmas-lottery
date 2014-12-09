angular.module("christmas")

    .controller("adminController", function ($rootScope, $scope, $state, lotteryFactory) {

        $scope.login = $rootScope.login;
        $scope.newPerson = "";
        if (!$rootScope.isLoggedIn || $scope.login != 'p4welo') {
            $state.go('login');
        }

        $scope.oldies = lotteryFactory.findOldies();
        $scope.youngees = lotteryFactory.findYoungees();
        $scope.lotteryReset = function () {
            $scope.youngees.forEach(function (youngee) {
                lotteryFactory.resetYoungee(youngee.login)
            })
            $scope.oldies.forEach(function (oldie) {
                lotteryFactory.resetOldie(oldie.key)
            })
        }
    })