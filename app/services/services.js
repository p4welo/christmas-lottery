var FIREBASE_URL = "https://shining-fire-1146.firebaseio.com";

angular.module("christmas")

    .factory("messageFactory", function ($firebase) {
        var ref = new Firebase(FIREBASE_URL);
        var messages = $firebase(ref.child('messages').orderByChild("dateTime").limitToLast(20)).$asArray();

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

    .factory("lotteryFactory", function ($firebase) {
        var ref = new Firebase(FIREBASE_URL);

        var youngees = [
            {
                name: "Piotr",
                login: "gaduss",
                chosen: false
            },
            {
                name: "Kacper",
                login: "kacperradomski",
                chosen: false
            },
            {
                name: "Barbara",
                login: "barbara",
                chosen: false
            },
            {
                name: "Karolina",
                login: "kkasperek",
                chosen: false
            },
            {
                name: "Paweł",
                login: "p4welo",
                chosen: false
            }
        ];

        var oldies = [
            {
                name: "Janusz",
                key: "janusz",
                chosen: false
            },
            {
                name: "Jola",
                key: "jola",
                chosen: false
            },
            {
                name: "Basia",
                key: "basia",
                chosen: false
            },
            {
                name: "Mariola",
                key: "mariola",
                chosen: false
            },
            {
                name: "Bogdan",
                key: "bogdan",
                chosen: false
            }
        ];

        return {
            findOldies: function () {
                return $firebase(ref.child('oldies')).$asArray();
            },
            findChosenByLogin: function (login) {
                return $firebase(ref.child('lottery/' + login)).$asObject()
            },
            findYoungees: function () {
                return $firebase(ref.child('youngees')).$asArray();
            },
            wasPerformed: function () {
                return $firebase(ref.child('lottery/performed')).$asObject();
            },
            chooseOldie: function (login, key, name) {
                var oldieRef = new Firebase(FIREBASE_URL + '/oldies/' + key + "/chosen");
                oldieRef.set(true);
                var userRef = new Firebase(FIREBASE_URL + '/lottery/' + login + "/older");
                userRef.set(name);
            },
            chooseYoungee: function (login, key, name) {
                var youngeeRef = new Firebase(FIREBASE_URL + '/youngees/' + key + "/chosen");
                youngeeRef.set(true);
                var userRef = new Firebase(FIREBASE_URL + '/lottery/' + login + "/younger");
                userRef.set(name);
                userRef = new Firebase(FIREBASE_URL + '/lottery/' + login + "/performed");
                userRef.set(true);
            },
            resetOldie : function (key) {
                var oldieRef = new Firebase(FIREBASE_URL + '/oldies/' + key + "/chosen");
                oldieRef.set(false);
            },
            resetYoungee: function (key) {
                console.log(key);
                var youngeeRef = new Firebase(FIREBASE_URL + '/youngees/' + key + "/chosen");
                console.log(FIREBASE_URL + '/youngees/' + key + "/chosen");
                youngeeRef.set(false);
                var userRef = new Firebase(FIREBASE_URL + '/lottery/' + key + "/performed");
                console.log(FIREBASE_URL + '/lottery/' + key + "/performed");
                userRef.set(false);
            },
            lotteryData: function () {
                return $firebase(ref.child('lottery')).$asArray();
            }
        };
    })

    .factory("presenceFactory", function ($firebase) {
        return {
            initPresence: function (login) {
                var amOnline = new Firebase(FIREBASE_URL + '/.info/connected');
                var userRef = new Firebase(FIREBASE_URL + '/presence/' + login);

                amOnline.on('value', function (snapshot) {
                    if (snapshot.val()) {
                        userRef.onDisconnect().set('offline');
                        userRef.set('online');
                    }
                });
            },

            logout: function (login) {
                var userRef = new Firebase(FIREBASE_URL + '/presence/' + login);
                userRef.set('offline');
            },

            onlinePeople: function () {
                var ref = new Firebase(FIREBASE_URL);
                return $firebase(ref.child('presence')).$asArray();
            }
        }
    })

    .factory("avatarFactory", function () {
        var avatars = {
            'p4welo': "https://scontent-a-fra.xx.fbcdn.net/hprofile-xpa1/v/t1.0-1/p160x160/10363855_10201148437991960_3586705723305547099_n.jpg?oh=a60a7a60ffe7f07e9ae8ebfeb3219731&oe=54FC1EAF",
            'gaduss': "https://scontent-b-fra.xx.fbcdn.net/hprofile-xfa1/v/t1.0-1/c71.21.259.259/s160x160/430347_447825938591199_1430987149_n.jpg?oh=52c0b27e268508e8553dda1d36c74a81&oe=54FEB4FE",
            'kkasperek': "https://scontent-b-fra.xx.fbcdn.net/hprofile-xpf1/v/t1.0-1/p160x160/10614311_10203443061534922_2717499162534510699_n.jpg?oh=d119ac8a7bd366bf808115f989534748&oe=54FC000F",
            'kacperradomski': "https://scontent-a-fra.xx.fbcdn.net/hprofile-xpa1/v/t1.0-1/c27.0.160.160/p160x160/10307386_874348512591490_4010475776237310706_n.jpg?oh=76b948022866186610018bde60aa9d0a&oe=550BDFAF",
            'barbara': "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/c39.8.103.103/1979537_302592716555425_469194671_n.jpg?oh=ec03528cbed972b23efea3bb060136f2&oe=54FEA5C4&__gda__=1425663590_fb67e680160d37203ac1c7cdd4bb2555"
        }
        return {
            getByLogin: function (login) {
                return avatars[login];
            }
        }
    })
