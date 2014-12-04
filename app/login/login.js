angular.module("christmas")

    .controller("loginController", function ($rootScope, $scope, $state) {
        var ref = new Firebase("https://shining-fire-1146.firebaseio.com");
        $scope.loggingIn = false;

        $scope.submitLogin = function () {
            $scope.loggingIn = true;
            ref.authWithPassword({
                email : $scope.email,
                password : $scope.password
            }, function(error, authData) {
                if (error === null) {
                    // user authenticated with Firebase
                    $rootScope.isLoggedIn = true;
                    $rootScope.login = $scope.email;
                    $state.go('lottery');
                } else {
                    console.log("Error authenticating user:", error);
                    $rootScope.isLoggedIn = false;
                }
            });
        }
    });