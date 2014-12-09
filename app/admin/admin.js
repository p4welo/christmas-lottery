angular.module("christmas")

    .controller("adminController", function ($rootScope, $scope, $state, lotteryFactory) {

        $scope.login = $rootScope.login;
        $scope.newPerson = "";
        if (!$rootScope.isLoggedIn || $scope.login != 'p4welo') {
            $state.go('login');
        }
        $scope.resetState = function () {
            lotteryFactory.reset();
//            var oldies = lotteryFactory.findOldies();
//            oldies.forEach(function (oldie) {
//                lotteryFactory.resetOldie(oldie);
//            });
//
//            var youngees = lotteryFactory.findYoungees();
//            youngees.forEach(function (youngee) {
//                lotteryFactory.resetYoungee(youngee);
//            })
        }
    })