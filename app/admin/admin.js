angular.module("christmas")

    .controller("adminController", function ($rootScope, $scope, $state) {

        $scope.login = $rootScope.login;
        if (!$rootScope.isLoggedIn) {
            $state.go('login');
        }
        if ( $rootScope.login != "gaduss@gmail.com" && $rootScope.login != 'p4welo@gmail.com') {
            $state.go('lottery');
        }
    })