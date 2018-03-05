var Observable = require("FuseJS/Observable");

var activeUrl = require("Constants/SERVICE_URL.js");
var QConfig = require('Scripts/quickbloxConfig.js');
var Storage = require("FuseJS/Storage");
var securityToken2 = Storage.readSync("securityToken2");
var Device = require('Device');
var push = require("FuseJS/Push");
var vibration = require('FuseJS/Vibration');
var myToast = require("myToast");

var User = JSON.parse(Storage.readSync("userInfo"));
var contacts = Observable();
var dialogs = Observable();
var errorMessage = Observable();
var contacts_patients = Observable();
var aa = 0;
var final = [];
var requestsfinal = [];

console.log("DAAAAAAAAAAAAAAAAAAA***********************");

var sessionObj;
var sessionAdmin;
var userObj;

function NVL(x) {
    if ((x == null) || (x == undefined)) {
        return "";
    } else {
        return x;
    }
}
//createSession();
this.onParameterChanged(function(param) {
    console.log("vleze vo reload........ chatsview " + JSON.stringify(param));

    requestsfinal = [];
    Storage.write("notification", "main");
    //GetPatientsWtihTretmans();

    //console.log("Odposle " + JSON.stringify(final));
    if (param.obj) {
        Storage.read("sesijaAdmin").then(function(content) {
            console.log("Sesija od storage " + content);
            sessionAdmin = content;
            Storage.read("sesija").then(function(content) {
                console.log("Sesija od storage " + content);
                sessionObj = content;
            }, function(error) {
                console.log("error vo citanje od storage session");
            });
            console.log("Samo getDialogs()");
        }, function(error) {
            console.log("error vo citanje od storage session");
        });
        signInAdminPar();
        signIn();
    } else {
        final = [];
        console.log("Celosno  createSession()");
        createSession();
    }

    //createSessionObicna();

    //getDialogs();

    // if (param.newContact) {
    //     reloadHandler();
    // } else if (param.newDoctor) {
    //     reloadHandlerDoctors();
    // }
});

push.on("receivedMessage", function(payload) {
    console.log("primanje notifikacija vo main page " + payload);
    Storage.read("notification").then(function(content) {
        console.log("content " + content);
        if (content == "main") {
            //hasNotification.value = true;
            getDialogsUnread();
            vibration.vibrate(0.8);
            myToast.toastIt(JSON.parse((JSON.parse(payload)).notification).alert.title + ":  " + (JSON.parse(payload)).message);
            console.log("Recieved Push NotificaNotificationtion vo welcome page: " + payload);
            //Storage.write("notification_previous", "welcome");
            //Storage.write("notification", "chat");
            // router.push("chat", {
            //     OdListaChat: JSON.parse((JSON.parse(payload)).notification).alert
            // });
        }
    }, function(error) {
        console.log("error vo citanje od storage");
    });
});

function createSession() {
    final = [];
    requestsfinal = [];
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
            sessionAdmin = json.session.token;
            Storage.write("sesijaAdmin", json.session.token);
            //console.log("sesija Admin " + JSON.stringify(sessionAdmin));
            signInAdmin();
        })
        .catch(function(err) {
            console.log('Error Create Session');
            console.log(JSON.stringify(err));
        });
}

function signInAdmin() {
    var data = {
        "login": "001111111",
        "password": QConfig.password
    }

    fetch('https://api.quickblox.com/login.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'QuickBlox-REST-API-Version': "0.1.0",
                'QB-Token': sessionAdmin
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
            createSessionObicna();
        })
        .catch(function(err) {
            console.log('Error Sign In');
            console.log(JSON.stringify(err));
        });
}

function createSessionObicna() {
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
            sessionObj = json.session.token;
            console.log("sesija " + JSON.stringify(sessionObj));

            Storage.write("sesija", json.session.token);
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

            signIn();

        })
        .catch(function(err) {
            console.log('Error Create Session');
            console.log(JSON.stringify(err));
        });
}
//createSession();
function signIn() {

    var data = {
        "login": User.phone + "1",
        "password": QConfig.password
    }

    //console.log(JSON.stringify(data));

    fetch('https://api.quickblox.com/login.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'QuickBlox-REST-API-Version': "0.1.0",
                'QB-Token': sessionObj
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
            // setTimeout(function() {
            console.log("GetPatientsWtihTretmans timeout");
            GetPatientsWtihTretmans();
            // }, 200);
        })
        .catch(function(err) {
            console.log('Error Sign In');
            console.log(JSON.stringify(err));
        });
}

function getDialogsUnread() {
    // https://api.quickblox.com/chat/Dialog.json
    //?_id[in]= + final
    console.log("Odposle requestsfinal " + JSON.stringify(requestsfinal));
    console.log("Odposle final " + final);
    console.log("sessionObj  " + sessionObj);
    var api = 'https://api.quickblox.com/chat/Message/unread.json?chat_dialog_ids=' + final;

    console.log('api ' + api);
    fetch(api, {
            method: 'GET',
            headers: {
                'QB-Token': sessionObj
            }
        })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {
            console.log("JSON getDialogsUnread", JSON.stringify(json));
            for (var i = 1; i < final.length + 1; i++) {
                console.log("final[i] " + final[i]);
                console.log("json[i] " + Object.keys(json)[i]);
                if (json[Object.keys(json)[i]] > 0) {
                    getRequestForCall(Object.keys(json)[i], User.chatId, sessionAdmin);
                }
            }

            setTimeout(function() {
                console.log("getDialogsFinish getDialogsFinish timeout");
                getDialogsFinish();
            }, 100);
        })
        .catch(function(err) {
            console.log('Error getDialogsUnread ');
            console.log(err.message);
        });
}


function getDialogs() {
    // https://api.quickblox.com/chat/Dialog.json
    //?_id[in]= + final
    console.log("Odposle requestsfinal " + JSON.stringify(requestsfinal));
    console.log("Odposle final " + final);
    fetch('https://api.quickblox.com/chat/Dialog.json?_id[in]=' + final, {
            method: 'GET',
            headers: {
                'QB-Token': sessionObj
            }
        })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {
            console.log("DIALOGSSSSSSSSSSSS", JSON.stringify(json.items));
            for (var i = 0; i < json.items.length; i++) {
                json.items[i].requestforcall = 0;
                // console.log("json.items[i]._id " + json.items[i]._id);
                // if (json.items[i].unread_messages_count > 0) {
                //   myTimeOut(json.items[i]._id, User.chatId, sessionAdmin);
                getRequestForCall(json.items[i]._id, User.chatId, sessionAdmin);
                //  }
            }
            //console.log("requestsfinal", JSON.stringify(requestsfinal));

            // setTimeout(function() {

            //     for (var i = 0; i < json.items.length; i++) {
            //         for (var j = 0; j < requestsfinal.length; j++) {
            //             if (json.items[i]._id == requestsfinal[j].roomid) {
            //                 json.items[i].requestforcall = requestsfinal[j].unreadrequest;
            //             }
            //         }
            //         var d = new Date(json.items[i].last_message_date_sent * 1000);
            //         json.items[i].minutes = timeSince(d);

            //         if (json.items[i].minutes == "47 years") {
            //             json.items[i].minutes = "";
            //         }
            //         if (User.chatId == JSON.parse(json.items[i].name).provider1) {
            //             json.items[i].namenovo = JSON.parse(json.items[i].name).provider2info;
            //             json.items[i].phone = JSON.parse(json.items[i].name).provider2phone;
            //         } else {
            //             json.items[i].namenovo = JSON.parse(json.items[i].name).provider1info;
            //             json.items[i].phone = JSON.parse(json.items[i].name).provider1phone;
            //         }
            //     }
            // }, 1000);

            // dialogs.replaceAll(json.items);
            // console.log('Dialogs na kraj ' + JSON.stringify(dialogs));

            setTimeout(function() {
                console.log("getDialogsFinish getDialogsFinish timeout");
                getDialogsFinish();
            }, 100);

        })
        .catch(function(err) {
            console.log('Error getDialogs');
            console.log(err.message);
        });
}

function getDialogsFinish() {
    // https://api.quickblox.com/chat/Dialog.json
    //?_id[in]= + final
    console.log("Odposle requestsfinal " + JSON.stringify(requestsfinal));
    console.log("Odposle final " + final);
    fetch('https://api.quickblox.com/chat/Dialog.json?_id[in]=' + final, {
            method: 'GET',
            headers: {
                'QB-Token': sessionObj
            }
        })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {
            console.log("DIALOGSSSSSSSSSSSS", JSON.stringify(json.items));
            for (var i = 0; i < json.items.length; i++) {
                json.items[i].requestforcall = 0;
            }
            console.log("requestsfinal", JSON.stringify(requestsfinal));


            for (var i = 0; i < json.items.length; i++) {
                // for (var j = 0; j < requestsfinal.length; j++) {
                //     if (json.items[i]._id == requestsfinal[j].roomid) {
                //         json.items[i].requestforcall = requestsfinal[j].unreadrequest;
                //     }
                // }
                var d = new Date(json.items[i].last_message_date_sent * 1000);
                json.items[i].minutes = timeSince(d);

                if (json.items[i].minutes == "47 years") {
                    json.items[i].minutes = "";
                }
                if (User.chatId == JSON.parse(json.items[i].name).provider1) {
                    json.items[i].namenovo = JSON.parse(json.items[i].name).provider2info;
                    json.items[i].phone = JSON.parse(json.items[i].name).provider2phone;
                } else {
                    json.items[i].namenovo = JSON.parse(json.items[i].name).provider1info;
                    json.items[i].phone = JSON.parse(json.items[i].name).provider1phone;
                }
            }

            setTimeout(function() {
                for (var i = 0; i < json.items.length; i++) {
                    for (var j = 0; j < requestsfinal.length; j++) {
                        if (json.items[i]._id == requestsfinal[j].roomid) {
                            json.items[i].requestforcall = requestsfinal[j].unreadrequest;
                        }
                    }
                }
            }, 50);

            setTimeout(function() {
                dialogs.replaceAll(json.items);
            }, 50);
            console.log('Dialogs na kraj ' + JSON.stringify(dialogs));
        })
        .catch(function(err) {
            console.log('Error getDialogsFinish');
            console.log(err.message);
        });
}


function GetPatientsWtihTretmans() {
    final = [];
    requestsfinal = [];
    var urlPatient = activeUrl.URL + "/curandusproject/webapi/api/activecontacts/providerId=" + User.providerId;
    //console.log("urlPatient " + urlPatient);
    fetch(urlPatient, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'securityToken2': securityToken2
        }
    }).then(function(response) {

        return response.json(); // This returns a promise
    }).then(function(contacts) {
        // contacts_patients.replaceAll(contacts);
        for (var i = 0; i < contacts.length; i++) {
            //console.log("koj pat " + i);
            final.push(contacts[i].RoomId);
            //getRequestForCall(contacts[i].RoomId, User.chatId, sessionAdmin.token);
        }
        // setTimeout(function() {
        //     console.log("getDialogs timeout");
        getDialogsUnread();
        //getDialogs();
        // }, 250);


    }).catch(function(err) {
        console.log("GetPatientsWtihTretmans error");
        console.log(err.message);
    });
} // end function checkData

function goToChat(e) {
    router.push("chat", {
        user: e.data
    });
}


function getRequestForCall(roomid, chatuserid, token1) {
    console.log("vleze vo getRequestForCall");
    var api_url = 'https://api.quickblox.com/chat/Message.json?chat_dialog_id=' + roomid + '&sender_id=28505875&message[ctn]=Request&read_ids[nin]=' + chatuserid + '&sort_desc=date_sent';
    //    console.log('api_url ' + api_url);
    fetch(api_url, {
            method: 'GET',
            headers: {
                'QuickBlox-REST-API-Version': "0.1.0",
                'QB-Token': token1
            }
        })
        .then(function(resp) {
            //console.log("userFound");
            return resp.json();
        })
        .then(function(unread) {
            //            console.log("Request for call " + JSON.stringify(unread));
            if (unread.items) {
                //                console.log("Request for call JSON.stringify(unread.items)" + JSON.stringify(unread.items));
                if (unread.items.length == 0) {
                    var data = {
                        "roomid": roomid,
                        "unreadrequest": 0
                    };
                    requestsfinal.push(data);
                } else {
                    console.log("Request for call poraka");
                    var data = {
                        "roomid": roomid,
                        "unreadrequest": 1
                    };
                    requestsfinal.push(data);
                }
            } else if (unread.errors) {
                console.log("ERORRRRiiii vo getRequestForCall " + JSON.stringify(unread));
                //console.log("err.message " + err.message);
            }
            //            console.log("requestsfinal vo funkcija" + JSON.stringify(requestsfinal));
        })
        .catch(function(err) {
            console.log('Error getRequestForCall');
            console.log("console.log(JSON.stringify(err)); " + JSON.stringify(err));
            console.log(err.message);
        });
}


function signInAdminPar() {
    var data = {
        "login": "001111111",
        "password": QConfig.password
    }

    fetch('https://api.quickblox.com/login.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'QuickBlox-REST-API-Version': "0.1.0",
                'QB-Token': sessionAdmin
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
        })
        .catch(function(err) {
            console.log('Error Sign In');
            console.log(JSON.stringify(err));
        });
}

function goToDoctorChat(e) {
    console.log('PARAMETAR STO SE PRAKJA ' + JSON.stringify(e));
    router.push("chat", {
        OdListaChat: e.data
    });
}

function goToDoctorChat2(e) {
    console.log(JSON.stringify(e));
    router.goto("chat", {
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
    GetPatientsWtihTretmans: GetPatientsWtihTretmans,
    getDialogs: getDialogs,
    signIn: signIn,
    createSession: createSession,
    errorMessage: errorMessage,
    goToChat: goToChat,
    getRequestForCall: getRequestForCall,
    goToDoctorChat: goToDoctorChat,
    goToDoctorChat2: goToDoctorChat2,
    NVL: NVL
};