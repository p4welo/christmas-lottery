angular.module("christmas", ["firebase"])

    .controller("indexController", function ($scope, $firebase) {

        $scope.loading = true;
        $scope.newMessageText = "";

        function initChat() {
            var ref = new Firebase("https://shining-fire-1146.firebaseio.com/messages");

            ref.on("value", function (snapshot) {
                console.log(snapshot.val());
                $scope.loading = false;
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });

            var sync = $firebase(ref);
            return sync.$asArray();
        }

        $scope.messages = initChat();
        $scope.addMessage = function (text) {
            $scope.newMessageText = "";
            $scope.messages.$add({text: text, date: new Date()});
        }
    })