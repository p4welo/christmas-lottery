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
                console.log(login);
                var amOnline = new Firebase('https://shining-fire-1146.firebaseio.com/.info/connected');
                var userRef = new Firebase('https://shining-fire-1146.firebaseio.com/presence/' + login);

                amOnline.on('value', function (snapshot) {
                    if (snapshot.val()) {
                        userRef.onDisconnect().set('offline');
                        userRef.set('online');
                    }
                });
                document.onIdle = function () {
                    userRef.set('idle');
                }
                document.onAway = function () {
                    userRef.set('away');
                }
                document.onBack = function (isIdle, isAway) {
                    userRef.set('online');
                }
            },

            onlinePeople: function () {
                var ref = new Firebase("https://shining-fire-1146.firebaseio.com");
                return $firebase(ref.child('presence')).$asArray();
            }
        }
    })