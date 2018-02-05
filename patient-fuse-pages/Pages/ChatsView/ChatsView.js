var Observable = require("FuseJS/Observable");

var activeUrl = require("Constants/SERVICE_URL.js");
var QConfig = require('Scripts/quickbloxConfig.js');
var Storage = require("FuseJS/Storage");
var Device = require('Device');
var myToast = require("myToast");

var User = JSON.parse(Storage.readSync("patientInfo"));
var contacts = Observable();
var dialogs = Observable();
var errorMessage = Observable();
var hasNotification = Observable("false");
var vibration = require('FuseJS/Vibration');
var currentPage = Observable();
var providerinfo = Observable();
var LocalNotify = require("FuseJS/LocalNotifications");

//console.log("DAAAAAAAAAAAAAAAAAAA***********************");



var sessionObj;
var userObj;

var push = require("FuseJS/Push");

push.on("error", function(reason) {
    console.log("Reg Failed: " + reason);
});

LocalNotify.on("receivedMessage", function(payload) {
    console.log("Received Local Notification: " + payload);
    //LocalNotify.clearAllNotifications();
});


push.on("receivedMessage", function(payload, fromNotificationBar) {
    console.log(" payloaddddddddddddd wo chatView  " + payload);
    if (fromNotificationBar == false) {
        console.log("fromNotificationBar " + fromNotificationBar + " " + payload);
        Storage.read("patientInfo").then(function(content) {
            User = JSON.parse(content);
        }, function(error) {});

        if (User.notificationEnabled == 1 || User.NotificationEnabled == 1) {
            Storage.read("notification").then(function(content) {
                    if (content == "main") {
                        console.log("currentPage.value vo chatview" + currentPage.value);
                        // if (currentPage.value == "chatview") {
                        getDialogs();
                        vibration.vibrate(0.8);
                        //myToast.toastIt("Stigna vo chat view");
                        //  LocalNotify.now("Boom!", "Just like that", "payload", true);
                        console.log("Recieved Push Notification vo chat view1111111: " + payload);

                        myToast.toastIt(JSON.parse((JSON.parse(payload)).notification).alert.title + ":  " + (JSON.parse(payload)).message);
                        //var json_poraka = JSON.parse((JSON.parse(payload)).notification).alert;
                        // console.log(" json poraka " + (JSON.parse(JSON.stringify(json_poraka)).row).label);

                        //}
                    }
                },
                function(error) {
                    console.log("error vo citanje od storage");
                });
        }
    }
});

function NVL(x) {
    if ((x == null) || (x == undefined)) {
        return "";
    } else {
        return x;
    }
}
//createSession();
this.onParameterChanged(function(param) {
    currentPage.value = "chatview";
    createSession();

    // if (param.newContact) {
    //     reloadHandler();
    // } else if (param.newDoctor) {
    //     reloadHandlerDoctors();
    // }
});

function createSession() {

    var data = {
        'application_id': QConfig.appId,
        'auth_key': QConfig.authKey,
        'nonce': Math.floor(Math.random() * 1000),
        'timestamp': new Date().getTime() / 1000
    }

    var signData = QConfig.getSignedData(data);

    //console.log(JSON.stringify(signData));

    fetch('https://api.quickblox.com/session.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'QuickBlox-REST-API-Version': "0.1.0"
            },
            body: JSON.stringify(signData)
        })
        .then(function(resp) {
            console.log("Session Created");
            return resp.json();
        })
        .then(function(json) {
            sessionObj = json.session;
            console.log("sesijaaaaaaaaaaaaaaaaaaa " + JSON.stringify(sessionObj));
            Storage.write("sesijaQuickblox", sessionObj.token);
            // var push = require("FuseJS/Push");

            // push.on("registrationSucceeded", function(regID) {
            //     console.log("Reg Succeeded: " + regID);
            //     var push_token = {
            //         "environment": "development",
            //         "client_identification_sequence": regID
            //     };
            //     var device = {
            //         "platform": "android",
            //         "udid": Device.UUID
            //     };

            //     var param_send = {
            //         "notification_channel": "gcm",
            //         "push_token": push_token, // JSON.stringify(push_token),
            //         "device": device //JSON.stringify(device)
            //     };

            //     fetch('https://api.quickblox.com/subscriptions.json', {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 'QuickBlox-REST-API-Version': "0.1.0",
            //                 'QB-Token': sessionObj.token
            //             },
            //             body: JSON.stringify(param_send)
            //         })
            //         .then(function(resp) {
            //             return resp.json();
            //         })
            //         .then(function(json) {
            //             console.log("subscriptions " + JSON.stringify(json));
            //         })
            //         .catch(function(err) {
            //             console.log('Error Sign In');
            //             console.log(JSON.stringify(err));
            //         });
            // });

            // push.on("error", function(reason) {
            //     console.log("Reg Failed: " + reason);
            // });
            // push.on("receivedMessage", function(payload) {
            //     //     var alert_msg = {
            //     //         "title": "poraka",
            //     //         "body": "Notifikacija"
            //     //     };
            //     //     payload.alert = alert_msg;

            //     var poraka_text = (JSON.parse(payload)).message;

            //     console.log(poraka_text);
            //     myToast.toastIt(poraka_text);

            //     vibration.vibrate(0.8);
            //     hasNotification.value = "true";
            //     hasNotification.value = "false";
            //     //LocalNotify.now("Boom!", "Just like that", "payload", true);

            //     console.log("Recieved Push Notification: " + payload);
            //     // console.log("Recieved Push Notification: JSON.stringify" + JSON.stringify(payload));
            // });

            signIn();

        })
        .catch(function(err) {
            console.log('Error');
            console.log(JSON.stringify(err));
        });
}
//createSession();

function signIn() {

    var data = {
        "login": User.Phone + "0",
        "password": QConfig.password
    }

    //console.log(JSON.stringify(data));

    fetch('https://api.quickblox.com/login.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'QuickBlox-REST-API-Version': "0.1.0",
                'QB-Token': sessionObj.token
            },
            body: JSON.stringify(data)
        })
        .then(function(resp) {
            return resp.json();
            //console.log(JSON.stringify(resp));
        })
        .then(function(json) {
            userObj = json.user;

            //console.log(JSON.stringify("USER 2", userObj));
            // getAllMesages();
            getDialogs();

        })
        .catch(function(err) {
            console.log('Error');
            console.log(JSON.stringify(err));
        });
}

function getDialogs() {
    // https://api.quickblox.com/chat/Dialog.json
    console.log("vleze vo getDialogs " + sessionObj.token);
    fetch('https://api.quickblox.com/chat/Dialog.json', {
            method: 'GET',
            headers: {
                'QB-Token': sessionObj.token
            }
        })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {
            //console.log("DIALOGSSSSSSSSSSSS", JSON.stringify(json.items));

            for (var i = 0; i < json.items.length; i++) {
                //if (json.items[i].last_message_date_sent == null) {
                //    json.items[i].minutes = 0;
                //} else {
                var d = new Date(json.items[i].last_message_date_sent * 1000);
                json.items[i].minutes = timeSince(d);

                if (json.items[i].minutes == "47 years") {
                    json.items[i].minutes = "";
                } else if (json.items[i].minutes == "0 seconds") {
                    json.items[i].minutes = "1 second";
                }
                // }


                //  console.log(json.items[i].occupants_ids[2]);
                //console.log("IIII " + User.ChatId);

                if (User.ChatId == JSON.parse(json.items[i].name).provider1) {
                    json.items[i].namenovo = JSON.parse(json.items[i].name).provider2info;
                } else {
                    json.items[i].namenovo = JSON.parse(json.items[i].name).provider1info;
                }

                //console.log("User.chatuserid " + JSON.stringify(User));

                //console.log("NOVOVOVO " + json.items[i].namenovo);
                //    if (NVL(JSON.parse(json.items[i].name).provider1) != "") {
                //        console.log("provider1 PARSIRANO" + JSON.parse(json.items[i].name).provider1);
                // console.log(getName(json.items[i].occupants_ids[2]));
                // json.items[i].occupants_ids[3]
                //    }
            }
            dialogs.replaceAll(json.items);
        })
        .catch(function(err) {
            console.log('Error');
            console.log(JSON.stringify(err));
        });
}

function goToChat(e) {
    router.push("chat", {
        user: e.data
    });
}


function getName(id) {
    fetch('https://api.quickblox.com/users/25180821.json', {
            method: 'GET',
            headers: {
                'QuickBlox-REST-API-Version': "0.1.0",
                'QB-Token': sessionObj.token
            },
            body: JSON.stringify(signData)
        })
        .then(function(resp) {
            //console.log("userFound");
            return resp.json();
        })
        .then(function(json) {
            console.log(JSON.stringify(json));
            // return json.user.full_name;

        })
        .catch(function(err) {
            console.log('Error');
            console.log(JSON.stringify(err));
        });
}

function goToDoctorChat(e) {
    // console.log(JSON.stringify(e.data.name).provider1);
    // console.log(JSON.parse(e.data.name).provider1);

    // var url = activeUrl.URL + "/curandusproject/webapi/api/GetProviderDataByChatId/chatid=" + JSON.parse(e.data.name).provider1;
    // fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     dataType: 'json'
    // }).then(function(response) {
    //     response_ok = response.ok; // Is response.status in the 200-range?
    //     return response.json(); // This returns a promise
    // }).then(function(responseObject) {
    //     providerinfo.value = responseObject;
    //     console.log("Podatoci za pacient od providerinfo.value  " + JSON.stringify(providerinfo.value));
    //     Storage.write("notification", "chat");
    //     currentPage.value = "chatPage";
    //     e.data.regid = responseObject.regId;
    //     console.log('PARAMETAR STO SE PRAKJA ' + JSON.stringify(e.data));
    //     router.push("chat", {
    //         OdListaChat: e.data
    //     });
    // }).catch(function(err) {
    //     console.log("Error getPatientsData()", err.message);
    // });

    Storage.write("notification", "chat");
    currentPage.value = "chatPage";
    console.log('PARAMETAR STO SE PRAKJA ' + JSON.stringify(e.data));
    router.push("chat", {
        OdListaChat: e.data
    });

}



function goToDoctorChat2(e) {
    //console.log(JSON.stringify(e));

    currentPage.value = "chatPage";
    router.push("chat", {
        doctorChatRoomId2: e.data
    });

}

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

module.exports = {
    contacts: contacts,
    dialogs: dialogs,
    getDialogs: getDialogs,
    signIn: signIn,
    errorMessage: errorMessage,
    goToChat: goToChat,
    goToDoctorChat: goToDoctorChat,
    goToDoctorChat2: goToDoctorChat2,
    NVL: NVL
};