angular.module("christmas")

    .controller("adminController", function ($rootScope, $scope, $state, personFactory) {

        $scope.login = $rootScope.login;
        $scope.newPerson = "";
        if (!$rootScope.isLoggedIn) {
            $state.go('login');
        }

        $scope.people = personFactory.findAll();
        $scope.send = function (e) {
            if (e.keyCode != 13) return;
            personFactory.add({
                name: $scope.newPerson,
                buyer: false
            });
            $scope.newPerson = "";
        }
//        if ( $rootScope.login != "gaduss" && $rootScope.login != 'p4welo') {
//            $state.go('lottery');
//        }
    })