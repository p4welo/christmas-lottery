angular.module("christmas")

    .controller("lotteryController", function ($rootScope, $scope, messageFactory, personFactory, presenceFactory, $state) {

        $scope.login = $rootScope.login;
        if (!$rootScope.isLoggedIn) {
            $state.go('login');
        }

        presenceFactory.initPresence($rootScope.login.split("@")[0]);

        $scope.messages = messageFactory.findAll();

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
    })