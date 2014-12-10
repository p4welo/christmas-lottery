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

        $scope.lotteryData = lotteryFactory.lotteryData();
        $scope.resolveAvatar = function (login) {
            return avatarFactory.getByLogin(login)
        }

        $scope.christmasDay = new Date(2014, 11, 24, 17, 0, 0)
        $scope.chosen = lotteryFactory.findChosenByLogin($rootScope.login);
        $scope.performed = lotteryFactory.wasPerformed();
        $scope.choosing = false;
        $scope.choose = function () {
            $scope.choosing = true;

            var availableOldies = [];
            $scope.oldies.forEach(function (person) {
                if (!person.chosen) {
                    availableOldies.push(person);
                }
            })
            if (availableOldies.length > 0) {
                var idx = Math.round(Math.random() * (availableOldies.length - 1));
                lotteryFactory.chooseOldie($rootScope.login, availableOldies[idx].key, availableOldies[idx].name);
            }

            var availableYoungees = [];
            $scope.youngees.forEach(function (person) {
                if (!person.chosen && person.login != $scope.login) {
                    availableYoungees.push(person);
                }
            })
            if (availableYoungees.length > 0) {
                var idx = Math.round(Math.random() * (availableYoungees.length - 1));
                lotteryFactory.chooseYoungee($rootScope.login, availableYoungees[idx].login, availableYoungees[idx].name);
            }
            $scope.choosing = false;
        }
    })