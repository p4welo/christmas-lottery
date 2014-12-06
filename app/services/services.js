angular.module("christmas")

    .factory("messageFactory", function ($firebase) {
        var ref = new Firebase("https://shining-fire-1146.firebaseio.com");
        var messages = $firebase(ref.child('messages')).$asArray();

        return {
            findAll: function () {
                return messages;
            },
            add: function (message) {
                return messages.$add(message);
            },
            remove: function (message) {
                return messages.$remove(message);
            }
        };
    })

    .factory("personFactory", function ($firebase) {
        var ref = new Firebase("https://shining-fire-1146.firebaseio.com");
        var people = $firebase(ref.child('people')).$asArray();

        return {
            findAll: function () {
                return people;
            },
            add: function (person) {
                return people.$add(person);
            },
            remove: function (person) {
                return people.$remove(person);
            }
        };
    })

    .factory("presenceFactory", function ($firebase) {
        return {
            initPresence: function (login) {
                var amOnline = new Firebase('https://shining-fire-1146.firebaseio.com/.info/connected');
                var userRef = new Firebase('https://shining-fire-1146.firebaseio.com/presence/' + login);

                amOnline.on('value', function (snapshot) {
                    if (snapshot.val()) {
                        userRef.onDisconnect().set('offline');
                        userRef.set('online');
                    }
                });
            },

            onlinePeople: function () {
                var ref = new Firebase("https://shining-fire-1146.firebaseio.com");
                return $firebase(ref.child('presence')).$asArray();
            }
        }
    })

    .factory("avatarFactory", function ($firebase) {
        return {
            initAvatars: function () {
                var avatarRef = new Firebase('https://shining-fire-1146.firebaseio.com/avatars/p4welo');
                var list = $firebase(avatarRef).$asArray();
                avatarRef.set({
                    url: "https://scontent-a-fra.xx.fbcdn.net/hprofile-xpa1/v/t1.0-1/p160x160/10363855_10201148437991960_3586705723305547099_n.jpg?oh=a60a7a60ffe7f07e9ae8ebfeb3219731&oe=54FC1EAF"
                });
                avatarRef = new Firebase('https://shining-fire-1146.firebaseio.com/avatars/gaduss');
                avatarRef.set({
                    url: "https://scontent-b-fra.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c71.21.259.259/s160x160/430347_447825938591199_1430987149_n.jpg?oh=52c0b27e268508e8553dda1d36c74a81&oe=54FEB4FE"
                });
                avatarRef = new Firebase('https://shining-fire-1146.firebaseio.com/avatars/kkasperek');
                avatarRef.set({
                    url: "https://scontent-b-fra.xx.fbcdn.net/hprofile-xpf1/v/t1.0-1/p160x160/10614311_10203443061534922_2717499162534510699_n.jpg?oh=d119ac8a7bd366bf808115f989534748&oe=54FC000F"
                });
            },
            findAll : function () {
                var ref = new Firebase("https://shining-fire-1146.firebaseio.com");
                return $firebase(ref.child('avatars')).$asArray();
            },
            findByLogin : function(login) {
                return $firebase(new Firebase('https://shining-fire-1146.firebaseio.com/avatars/' + login)).$asObject();
            }
        }
    })