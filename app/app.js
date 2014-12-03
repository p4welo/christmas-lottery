angular.module("christmas", ["firebase"])

.controller("indexController", function ($scope, $firebase) {

        function initChat() {
            var ref = new Firebase("https://shining-fire-1146.firebaseio.com/messages");
            var sync = $firebase(ref);
            return sync.$asArray();
        }
        $scope.messages = initChat();
        $scope.addMessage = function(text) {
            $scope.messages.$add({text: text});
        }
    })