angular.module("christmas")

    .controller("loginController", function ($rootScope, $scope, $state) {
        var ref = new Firebase("https://shining-fire-1146.firebaseio.com");
        $scope.loggingIn = false;
        $scope.loginError = false;

        $scope.submitLogin = function () {
            $scope.loggingIn = true;
            ref.authWithPassword({
                email : $scope.email,
                password : $scope.password
            }, function(error) {
                if (error === null) {
                    $rootScope.isLoggedIn = true;
                    $rootScope.login = $scope.email.split("@")[0];
                    $state.go('lottery');
                } else {
                    $scope.loginError = true;
                    $rootScope.isLoggedIn = false;
                    $scope.loggingIn = false;
                }
                $scope.$apply();
            });
        }
    });