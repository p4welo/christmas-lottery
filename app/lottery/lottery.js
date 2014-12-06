angular.module("christmas")

    .controller("lotteryController", function ($rootScope, $scope, messageFactory, personFactory, presenceFactory, avatarFactory, $state) {

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

        $scope.resolveAvatar = function (login) {
            if (login == 'p4welo') {
                return "https://scontent-a-fra.xx.fbcdn.net/hprofile-xpa1/v/t1.0-1/p160x160/10363855_10201148437991960_3586705723305547099_n.jpg?oh=a60a7a60ffe7f07e9ae8ebfeb3219731&oe=54FC1EAF";
            }
            else if (login == 'gaduss') {
                return "https://scontent-b-fra.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c71.21.259.259/s160x160/430347_447825938591199_1430987149_n.jpg?oh=52c0b27e268508e8553dda1d36c74a81&oe=54FEB4FE";
            }
            else if (login == "kkasperek") {
                return "https://scontent-b-fra.xx.fbcdn.net/hprofile-xpf1/v/t1.0-1/p160x160/10614311_10203443061534922_2717499162534510699_n.jpg?oh=d119ac8a7bd366bf808115f989534748&oe=54FC000F";
            }
            else if (login == "kacpy") {
                return "https://scontent-a-fra.xx.fbcdn.net/hprofile-xpa1/v/t1.0-1/c27.0.160.160/p160x160/10307386_874348512591490_4010475776237310706_n.jpg?oh=76b948022866186610018bde60aa9d0a&oe=550BDFAF";
            }
        }
    })