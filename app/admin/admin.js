angular.module("christmas")

    .controller("adminController", function ($rootScope, $scope, $state, personFactory) {

        $scope.login = $rootScope.login;
        $scope.newPerson = "";
        if (!$rootScope.isLoggedIn) {
            $state.go('login');
        }

        $scope.people = personFactory.findAll();
        $scope.deletePerson = function (person) {
            personFactory.remove(person);
        }
        $scope.sendPerson = function (e) {
            if (e.keyCode != 13) return;
            personFactory.add({
                name: $scope.newPerson
            });
            $scope.newPerson = "";
        }
    })