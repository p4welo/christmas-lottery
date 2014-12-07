angular.module("christmas")

    .controller("lotteryController", function ($rootScope, $scope, personFactory, presenceFactory, avatarFactory, $state) {

        $scope.login = $rootScope.login;
        if (!$rootScope.isLoggedIn) {
            $state.go('login');
        }

        presenceFactory.initPresence($rootScope.login.split("@")[0]);

        $scope.people = personFactory.findAll();
        $scope.newPerson = "";
        $scope.selected;
        $scope.select = function (person) {
            if ($scope.selected == person) {
                $scope.selected = null;
                return;
            }
            $scope.selected = person;
        }
        $scope.addPerson = function (e) {
            if (e.keyCode != 13) return;
            personFactory.add({
                name: $scope.newPerson
            });
            $scope.newPerson = "";
        }
        $scope.delPerson = function (person) {
            personFactory.remove(person);
        }
        $scope.onlinePeople = presenceFactory.onlinePeople();

        $scope.resolveAvatar = function (login) {
            avatarFactory.getByLogin(login);
        }
    })