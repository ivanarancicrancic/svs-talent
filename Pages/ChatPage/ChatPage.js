var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var QConfig = require('Scripts/quickbloxConfig.js');
var SendMessage = require('Scripts/SendMessage.js');
var Storage = require("FuseJS/Storage");
var securityToken = Storage.readSync("securityToken");
var currentPage = Observable();
var myToast = require("myToast");
var SendNotification = require('Scripts/SendNotification.js');
var p_notification_enabled = Observable();
var visibility = Observable("Collapsed");
var Seen = Observable();
var backing = Observable("0");

var User = JSON.parse(Storage.readSync("patientInfo"));

var user = Observable();
var fullname = Observable();
var sessionObj;
var userObj;
var messagesLoading = Observable();
var providerchatidSeen = Observable();

var dateLastMessage = Observable();
var dateFirstMessage = Observable();
var providerchatid = Observable();
var skipped = Observable();

var RoomId = "";
var ChatId = "";

var fromChat = false;

var push = require("FuseJS/Push");

push.on("error", function(reason) {
    console.log("Reg Failed: " + reason);
});

push.on("receivedMessage", function(payload, fromNotificationBar) {
    console.log(" payloaddddddddddddd wo chatpage  " + payload);
    if (fromNotificationBar === false) {
        JSON.parse((JSON.parse(payload)).notification).alert
        Storage.read("notification").then(function(content) {
            console.log("kade da prakja notification chat pageeeee: " + content);
            if (content == "chat") {
                var push_message = (JSON.parse(payload)).message;
                var push_from = JSON.parse((JSON.parse(payload)).notification).alert.from;
                var push_where = "";
                //  if (push_from == "Curandus") {
                push_where = "Top"
                    // } else {
                    //     push_where = "Left";
                    // }
                readAllMesages();
                InsertNewMessage(push_from, push_message, push_where);
                Storage.write("notification", "chat");
                console.log("Recieved Push Notification vo chat page: " + payload);
            }
        }, function(error) {
            console.log("error vo citanje od storage");
        });
        // console.log("Recieved Push Notification: JSON.stringify" + JSON.stringify(payload));
    }
});

this.onParameterChanged(function(param) {
    backing.value = "1";
    Storage.write("notification", "chat");
    //Storage.write("notification_previous", "welcome");
    currentPage.value = "chat";
    if (param.doctorChatRoomId) {
        fromChat = false;
        messages.replaceAll([]);
        messagespom.replaceAll([]);
        //console.log('VLEZE VO PRVO');
        console.log("CHAT SOBA - " + JSON.stringify(param.doctorChatRoomId));
        user.value = param.doctorChatRoomId;
        fullname.value = user.value.fullName;
        //console.log(user.value.RoomId);
        RoomId = user.value.RoomId;
        ChatId = User.ChatId;
        createSession();
    } else if (param.OdListaChat) {
        console.log("CHAT SOBA od lista - " + JSON.stringify(param.OdListaChat));
        providerchatid.value = (JSON.parse(param.OdListaChat.name)).provider1;
        //console.log("PARAMETAR - " + JSON.stringify(User));
        fromChat = false;
        // console.log("User User User " + JSON.stringify(User));
        messages.replaceAll([]);
        messagespom.replaceAll([]);
        user.value = param.OdListaChat;
        fullname.value = user.value.namenovo;
        RoomId = user.value._id;
        ChatId = User.ChatId;
        //console.log("ChatId ChatId ChatId " + ChatId);
        createSession();
    } else if (param.odwelcome) {
        console.log("CHAT SOBA od lista - " + JSON.stringify(param.odwelcome));

        //console.log("PARAMETAR - " + JSON.stringify(User));
        fromChat = false;
        // console.log("User User User " + JSON.stringify(User));
        messages.replaceAll([]);
        messagespom.replaceAll([]);
        user.value = param.odwelcome;
        providerchatid.value = user.value.fromchatid;
        fullname.value = user.value.namenovo;
        RoomId = user.value._id;
        ChatId = User.ChatId;
        //console.log("ChatId ChatId ChatId " + ChatId);
        createSession();
    } else if (param.doctorChatRoomId2) {
        fromChat = true;
        //console.log(JSON.stringify(param.doctorChatRoomId2));
        messages.replaceAll([]);
        messagespom.replaceAll([]);
        //console.log("CHAT SOBA - " + JSON.stringify(param.doctorChatRoomId2));
        RoomId = param.doctorChatRoomId2._id;
        //FromLogedUser
        ChatId = param.doctorChatRoomId2.user_id;
        createSession();
    }

    user.value = param.user;
    Storage.write("notification", "chat");

    console.log("providerchatid.value " + providerchatid.value);
    var url = activeUrl.URL + "/curandusproject/webapi/api/GetProviderDataByChatId/chatid=" + providerchatid.value + "&securityToken=" + securityToken;
    fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json'
    }).then(function(response) {
        response_ok = response.ok; // Is response.status in the 200-range?
        return response.json(); // This returns a promise
    }).then(function(responseObject) {
        providerchatidSeen.value = providerchatid.value;
        providerchatid.value = responseObject.regId;
        p_notification_enabled.value = responseObject.notificationEnabled;
        console.log("providerchatid.value  " + JSON.stringify(responseObject));

    }).catch(function(err) {
        console.log("Error getPatientsData()", err.message);
    });

})


function loadMore1() {

    var currDate = "";
    skipped.value = skipped.value - 6;
    if (skipped.value < 0) {
        skipped.value = 0;
    }
    //console.log("vleze vo skrol nadole " + skipped.value);
    //fetch('https://api.quickblox.com/chat/Message.json?chat_dialog_id=' + RoomId + '&skip=10&limit=10&sort_desc=date_sent', {
    fetch('https://api.quickblox.com/chat/Message.json?chat_dialog_id=' + RoomId + '&limit=10&skip=' + skipped.value + '&sort_desc=date_sent', {

            method: 'GET',
            headers: {
                'QB-Token': sessionObj.token
            }
        })
        .then(function(resp) {
            //console.log("All Messages");
            return resp.json();
        })
        .then(function(json) {


            //console.log("TUKA" + JSON.stringify(json));
            skipped.value = skipped.value + 10 - json.items.length;
            messages.replaceAll([]);
            for (var i = json.items.length - 1; i >= 0; i--) {

                var tmpDate = new Date(json.items[i].date_sent * 1000);
                var days = tmpDate.getDate();
                var months = tmpDate.getMonth() + 1;
                var year = tmpDate.getFullYear();
                var hours = tmpDate.getHours();
                var min = tmpDate.getMinutes();

                var fullDate = ('0' + tmpDate.getDate()).slice(-2) + '.' + ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '.' + tmpDate.getFullYear();
                var fulltime = " at " + ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);

                if (currDate != fullDate) {
                    messages.add(new Message(fullDate, "", fullDate, " ", " ", "Bottom"));
                    currDate = fullDate;
                }

                if (json.items[i].sender_id == ChatId) {
                    messages.add(new Message("You", "You", fullDate, fulltime, json.items[i].message, "Left"));
                } else if (json.items[i].sender_id == 28505875) {
                    messages.add(new Message("Curandus", "Curandus", fullDate, fulltime, json.items[i].message, "Top"));
                } else {
                    messages.add(new Message(fullname.value, "Other", fullDate, fulltime, json.items[i].message, "Top"));

                }
            }
        })
        .catch(function(err) {
            console.log('Error loadMore1');
            console.log(err.message);
            console.log(JSON.stringify(err));
        });
}


function loadMore() {
    skipped.value = skipped.value + 20;
    //console.log("vleze vo skrol nagore " + skipped.value);
    fetch('https://api.quickblox.com/chat/Message.json?chat_dialog_id=' + RoomId + '&limit=20&skip=' + skipped.value + '&sort_desc=date_sent', {
            method: 'GET',
            headers: {
                'QB-Token': sessionObj.token
            }
        })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {

            {
                // messages.replaceAll([]);
                messagespom.replaceAll([]);

                if (json.items.length > 0) {
                    skipped.value = skipped.value - 20 + json.items.length;
                    dateLastMessage.value = json.items[0].date_sent;
                    dateFirstMessage.value = json.items[json.items.length - 1].date_sent;
                    //messages.removeAt(0);
                    var currDate = messages.getAt(0).created;
                    var currDateAmerican = new Date(messages.getAt(0).created * 1000);
                    // for (var i = json.items.length - 1; i >= 0; i--) {
                    for (var i = 0; i < json.items.length; i++) {
                        var tmpDate = new Date(json.items[i].date_sent * 1000);
                        var days = tmpDate.getDate();
                        var months = tmpDate.getMonth() + 1;
                        var year = tmpDate.getFullYear();
                        var hours = tmpDate.getHours();
                        var min = tmpDate.getMinutes();

                        var fullDate = ('0' + tmpDate.getDate()).slice(-2) + '.' + ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '.' + tmpDate.getFullYear();
                        var fulltime = " at " + ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);

                        var fullDateAmerican = ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tmpDate.getDate()).slice(-2) + '-' + tmpDate.getFullYear();

                        //console.log("messages.getAt(1).created " + messages.getAt(1).created);
                        //console.log("fullDate " + fullDate);
                        if ((currDate != fullDate) && (i != 0)) {
                            //messages.add(new Message(fullDate, fullDate, " ", " ", "Bottom"));
                            //messagespom.insertAt(0, new Message(fullDate, fullDate, " ", " ", "Bottom"));
                            messagespom.insertAt(0, new Message(fullDateAmerican, "", fullDateAmerican, " ", " ", "Bottom"));
                            currDate = fullDate;
                            currDateAmerican = fullDateAmerican;
                        } else {
                            if (i == 0) {
                                messages.removeAt(0);
                            }
                        }

                        if (json.items[i].sender_id == ChatId) {
                            //messages.add(new Message("You", fullDate, fulltime, json.items[i].message, "Right"));
                            messagespom.insertAt(0, new Message("You", "You", fullDateAmerican, fulltime, json.items[i].message, "Left"));
                        } else if (json.items[i].sender_id == 28505875) {
                            //messages.add(new Message("Curandus", fullDate, fulltime, json.items[i].message, "Top"));
                            messagespom.insertAt(0, new Message("Curandus", "Curandus", fullDateAmerican, fulltime, json.items[i].message, "Top"));
                        } else {
                            //messages.add(new Message(fullname.value, fullDate, fulltime, json.items[i].message, "Left"));
                            messagespom.insertAt(0, new Message(fullname.value, "Other", fullDateAmerican, fulltime, json.items[i].message, "Top"));
                        }
                    }
                    messagespom.insertAt(0, new Message(currDateAmerican, "", currDateAmerican, " ", " ", "Bottom"));

                    myTimeOutReload(messagespom);
                }
            }

        })
        .catch(function(err) {
            console.log('Error loadMore');
            console.log(err.message);
            console.log(JSON.stringify(err));
        });
}



function getAllMesages() {
    var currDate = "";
    fetch('https://api.quickblox.com/chat/Message.json?chat_dialog_id=' + RoomId + '&limit=20&sort_desc=date_sent', {
            method: 'GET',
            headers: {
                'QB-Token': sessionObj.token
            }
        })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {
            //console.log("Succes getAllMesages 1");
            //messages.replaceAll([]);
            messagespom.replaceAll([]);

            if (json.items[0].sender_id == ChatId || json.items[0].sender_id == 28505875) {
                IsSeen(RoomId, providerchatidSeen.value);
            }


            skipped.value = 0;
            for (var i = json.items.length - 1; i >= 0; i--) {
                //for (var i = 0; i < json.items.length; i++) {
                var tmpDate = new Date(json.items[i].date_sent * 1000);
                var days = tmpDate.getDate();
                var months = tmpDate.getMonth() + 1;
                var year = tmpDate.getFullYear();
                var hours = tmpDate.getHours();
                var min = tmpDate.getMinutes();

                var fullDate = ('0' + tmpDate.getDate()).slice(-2) + '.' + ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '.' + tmpDate.getFullYear();
                var fulltime = " at " + ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);

                var fullDateAmerican = ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tmpDate.getDate()).slice(-2) + '-' + tmpDate.getFullYear();

                if (currDate != fullDateAmerican) {
                    messagespom.add(new Message(fullDateAmerican, "", fullDateAmerican, " ", " ", "Bottom"));
                    currDate = fullDateAmerican;
                }

                if (json.items[i].sender_id == ChatId) {
                    //messages.add(new Message("You", fullDate, fulltime, json.items[i].message, "Right"));
                    //messages.insertAt(messages.length, (new Message("You", fullDate, fulltime, json.items[i].message, "Right")));
                    messagespom.insertAt(messagespom.length, (new Message("You", "You", fullDateAmerican, fulltime, json.items[i].message, "Left")));
                } else if (json.items[i].sender_id == 28505875) {
                    //messages.add(new Message("Curandus", fullDate, fulltime, json.items[i].message, "Top"));
                    //messages.insertAt(messages.length, (new Message("Curandus", fullDate, fulltime, json.items[i].message, "Top")));
                    messagespom.insertAt(messagespom.length, (new Message("Curandus", "Curandus", fullDateAmerican, fulltime, json.items[i].message, "Top")));
                } else {
                    //messages.add(new Message(fullname.value, fullDate, fulltime, json.items[i].message, "Left"));
                    //messages.insertAt(messages.length, (new Message(fullname.value, fullDate, fulltime, json.items[i].message, "Left")));
                    messagespom.insertAt(messagespom.length, (new Message(fullname.value, "Other", fullDateAmerican, fulltime, json.items[i].message, "Top")));
                }
                //console.log("messagespom.getAt(messagespom.length).text " + messagespom.getAt(messagespom.length - 1).text + " " + messagespom.getAt(messagespom.length - 1).dock);
            }

            messages.replaceAll(messagespom);
            messagesLoading.replaceAll(messagespom);
            //console.log("Succes getAllMesages 2");
        })
        .catch(function(err) {
            console.log('Error getAllMesages');
            console.log(err.message);
            console.log(JSON.stringify(err));
        });
    //messages.replaceAll(messagespom);
}

function Message(from, from_1, created, time, text, dock) {
    this.from = from;
    this.from_1 = from_1;
    this.created = created;
    this.time = time;
    this.text = text;
    this.dock = dock;
}

var messages = Observable();
var messagespom = Observable();

var message = Observable("");

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

            //console.log(JSON.stringify("USER", userObj));
            getAllMesages();

        })
        .catch(function(err) {
            console.log('Error LOG IN');
            console.log(err.message);
            console.log(JSON.stringify(err));
        });
}

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
            console.log(JSON.stringify(json));
            sessionObj = json.session;
            console.log(JSON.stringify(sessionObj));

            signIn();

        })
        .catch(function(err) {
            console.log('Error');
            console.log(err);
        });
}

function addMesageToChat() {

    if (message.value != "") {
        // createSession();
        var data = {
            "chat_dialog_id": RoomId,
            "message": message.value
                //"recipient_id": 28446242,
                // "send_to_chat": 1,
                // "markable": 1
        };

        fetch('https://api.quickblox.com/chat/Message.json', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'QB-Token': sessionObj.token
                },
                body: JSON.stringify(data)
            })
            .then(function(resp) {
                console.log('Statussssss' + JSON.stringify(resp));
                return resp.json();
            })
            .then(function(json) {
                console.log('JSON porakaaaa:' + JSON.stringify(json));
                var tmpDate = new Date(json.date_sent * 1000);
                var days = tmpDate.getDate();
                var months = tmpDate.getMonth() + 1;
                var year = tmpDate.getFullYear();
                var hours = tmpDate.getHours();
                var min = tmpDate.getMinutes();

                var fullDate = ('0' + tmpDate.getDate()).slice(-2) + '.' + ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '.' + tmpDate.getFullYear();
                var fulltime = " at " + ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);

                var fullDateAmerican = ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tmpDate.getDate()).slice(-2) + '-' + tmpDate.getFullYear();

                // console.log("fulltimeeeee " + messages.getAt(messages.length - 1).created + " " + fullDate);
                console.log("message.value " + message.value);

                if (messages.length != 0) {
                    // console.log("vleze ");
                    if (fullDateAmerican != messages.getAt(messages.length - 1).created) {
                        messages.add(new Message(fullDateAmerican, "", fullDateAmerican, " ", " ", "Bottom"));
                    }
                } else {
                    messages.add(new Message(fullDateAmerican, "", fullDateAmerican, " ", " ", "Bottom"));
                }

                if (p_notification_enabled.value == 1) {
                    SendNotification.sendPushNotification(
                        User.FirstName + " " + User.LastName,
                        json.message,
                        json.message,
                        User.FirstName + " " + User.LastName,
                        providerchatid.value,
                        RoomId,
                        User.FirstName + " " + User.LastName,
                        User.ChatId);
                }

                myTimeOut("You", "You", fullDateAmerican, fulltime, json.message, "Left");
                Seen.value = "";
                message.value = "";
            })
            .catch(function(err) {
                console.log('Error add message to chat');
                console.log(JSON.stringify(err));
            });
    }
}

function readAllMesages() {
    var currDate = "";
    fetch('https://api.quickblox.com/chat/Message.json?chat_dialog_id=' + RoomId + '&limit=5&sort_desc=date_sent', {
            method: 'GET',
            headers: {
                'QB-Token': sessionObj.token
            }
        })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {
            console.log("Gi procita site poraki");
        })
        .catch(function(err) {
            console.log('Error readAllMesages');
            console.log(err.message);
            console.log(JSON.stringify(err));
        });
    //messages.replaceAll(messagespom);
}

function InsertNewMessage(push_from, push_message, push_where) {
    var today = Date.now();
    var tmpDate = new Date(today);
    var days = tmpDate.getDate();
    var months = tmpDate.getMonth() + 1;
    var year = tmpDate.getFullYear();
    var hours = tmpDate.getHours();
    var min = tmpDate.getMinutes();
    var p_from_1;
    if (push_from == "Curandus") {
        p_from_1 = "Curandus";
    } else {
        p_from_1 = "Other";
    }

    var fullDate = ('0' + tmpDate.getDate()).slice(-2) + '.' + ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '.' + tmpDate.getFullYear();
    var fulltime = " at " + ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);
    myTimeOut(push_from, p_from_1, fullDate, fulltime, push_message, push_where);
}

function myTimeOutReload(p_messagespom) {
    visibility.value = "Visible";
    for (var i = 0; i < p_messagespom.length; i++) {
        messages.insertAt(0, p_messagespom.getAt(p_messagespom.length - 1 - i));
    }
    // setTimeout(function() {
    //     for (var i = 0; i < p_messagespom.length; i++) {
    //         messages.insertAt(0, p_messagespom.getAt(p_messagespom.length - 1 - i));
    //     }
    // }, 400);
    visibility.value = "Collapsed";
}


function myTimeOut(p_who, p_from_1, p_fulldate, p_fulltime, p_value, p_where) {
    setTimeout(function() {
        messages.add(new Message(p_who, p_from_1, p_fulldate, p_fulltime, p_value, p_where));
    }, 400);
}

function goToUser(userId) {
    console.log("UserID" + JSON.stringify(user));

    router.push("alert", {
        user: JSON.stringify(user)
    });
}

function goBack() {
    var obj = {
        "num": Math.random()
    }
    router.push("main", {
        obj: JSON.stringify(obj)
    });
}

function goToMain() {
    console.log("backing " + backing.value);
    var obj = {
        "num": Math.random()
    }

    if (backing.value == "1") {
        backing.value = "0";
        //router.goBack();
        router.push("main", {
            obj: JSON.stringify(obj),
            comesfromchat: true
        });
    } else {
        console.log("Vleze vo obicen backing");
    }

}

function goToTreatmentFromChat(sender) {
    console.log("vleze");
    var prvText = sender.data.text;
    if ((prvText.indexOf("Treatment assigned to patient") != -1) || (prvText.indexOf("Treatmetnt updated") != -1)) {
        console.log("ispolnet uslov");
        var tmp = {
            "num": Math.random()
        };
        router.push("main", tmp);
    }
}

function IsSeen(p_roomid, p_chatd) {
    console.log("Vleze vo IsSeen");
    var api = 'https://api.quickblox.com/chat/Message.json?&chat_dialog_id=' + p_roomid + '&limit=1&sort_desc=date_sent';

    console.log('api ' + api);
    fetch(api, {
            method: 'GET',
            headers: {
                'QB-Token': sessionObj.token
            }
        })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {
            console.log("JSON seeeen", JSON.stringify(json));
            // console.log("JSON seeeen length", JSON.stringify(json.items[0].read_ids));

            var listaSeen = JSON.stringify(json.items[0].read_ids);

            var result = listaSeen.includes(p_chatd);

            console.log("JSON seeeen listaSeen " + listaSeen);
            console.log("p_chatd " + p_chatd);
            console.log("result " + result);

            if (result == false) {
                Seen.value = "";
            } else {
                Seen.value = "Seen";
            }
            // if (json.items.length == 0) {
            //     Seen.value = "";
            // } else {
            //     Seen.value = "Seen";
            // }
            console.log("seeeeeeeeen vo funkcija " + Seen.value);

        })
        .catch(function(err) {
            console.log('Error getDialogsUnread ');
            console.log(err.message);

        });
}


module.exports = {
    user: user,
    visibility: visibility,
    Seen: Seen,
    IsSeen: IsSeen,
    goBack: goBack,
    fullname: fullname,
    skipped: skipped,
    loadMore1: loadMore1,
    loadMore: loadMore,
    goToUser: goToUser,
    signIn: signIn,
    goToMain: goToMain,
    getAllMesages: getAllMesages,
    addMesageToChat: addMesageToChat,
    goToTreatmentFromChat: goToTreatmentFromChat,
    messages: messages.map(function(message) {
        return {
            info: message.from + message.time,
            from: message.from_1,
            text: message.text,
            dock: message.dock,
            created: message.created
        };
    }),
    messagesLoading: messagesLoading.map(function(message) {
        return {
            info: message.from + message.time,
            from: message.from_1,
            text: message.text,
            dock: message.dock,
            created: message.created
        };
    }),
    messagespom: messagespom.map(function(message) {
        return {
            info: message.from + message.time,
            from: message.from_1,
            text: message.text,
            dock: message.dock,
            created: message.created
        };
    }),
    message: message
};
