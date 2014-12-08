angular.module("christmas")

    .controller("adminController", function ($rootScope, $scope, $state) {

        $scope.login = $rootScope.login;
        if (!$rootScope.isLoggedIn) {
            $state.go('login');
        }
        if ( $rootScope.login != "gaduss" && $rootScope.login != 'p4welo') {
            $state.go('lottery');
        }
    })