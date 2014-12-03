angular.module("christmas", ["firebase"])

    .controller("indexController", function ($scope, firebaseFactory) {

        $scope.messages = firebaseFactory.allMessages();
        $scope.people = firebaseFactory.allPeople();
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
            firebaseFactory.addPerson({
                name: $scope.newPerson
            });
            $scope.newPerson = "";

        }
        $scope.delPerson = function (person) {
            firebaseFactory.delPerson(person);
        }
    })

    .factory("firebaseFactory", function ($firebase) {
        var ref = new Firebase("https://shining-fire-1146.firebaseio.com");
        var messages = $firebase(ref.child('messages')).$asArray();
        var people = $firebase(ref.child('people')).$asArray();

        var Fire = {
            allMessages: function () {
                return messages;
            },
            addMessage: function (message) {
                return messages.$add(message);
            },
            delMessage: function (message) {
                return messages.$remove(message);
            },
            allPeople: function () {
                return people;
            },
            addPerson: function (person) {
                return people.$add(person);
            },
            delPerson: function (person) {
                return people.$remove(person);
            }
        };
        return Fire;
    })