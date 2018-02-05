var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var QConfig = require('Scripts/quickbloxConfig.js');
var SendMessage = require('Scripts/SendMessage.js');
var Storage = require("FuseJS/Storage");
var phone = require("FuseJS/Phone");
var securityToken = Storage.readSync("securityToken");

var load = Observable("Loading...");
var User = JSON.parse(Storage.readSync("userInfo"));
var SendNotification = require('Scripts/SendNotification.js');
var user = Observable();
var fullname = Observable();
var patientchatid = Observable();
var patientchatidpom;
var sessionObj;
var userObj;
var pch;
var patientInfo = Observable();
var regid_par = Observable(null);
var parametar_send = Observable();
var myToast = require("myToast");
var vibration = require('FuseJS/Vibration');
var visibility = Observable("Collapsed");
var Seen = Observable();
var backing = Observable("0");

var dateLastMessage = Observable();
var dateFirstMessage = Observable();
var panelVisibility = Observable();

var skipped = Observable();
var PatientPhone = Observable();
var flagFullName = Observable(false);
var RoomId = "";
var ChatId = "";
var visibility1 = Observable("Collapsed");
var fromChat = false;
var getNotification = Observable(true);
var messages = Observable();
var messagespom = Observable();
var messagesLoading = Observable();

var message = Observable("");

var comesFromContactsDoctors = Observable(false);
var comesFromContactsPatients = Observable(false);


var push = require("FuseJS/Push");

push.on("receivedMessage", function(payload, fromNotificationBar) {
    if (fromNotificationBar == false) {
        Storage.read("notification").then(function(content) {
                pch = "";
                pch = patientInfo.value.chatId;
                if (content == "chat") {
                    // Storage.read("patientchatid").then(function(content) {
                    //console.log("fromchatid " + (JSON.parse((JSON.parse(payload)).notification).alert.fromchatid));
                    //console.log("pch " + pch);
                    if ((JSON.parse((JSON.parse(payload)).notification).alert.fromchatid) === patientchatid.value) {
                        //console.log("vleze vo prviot if");
                        getNotification.value = false;
                        var push_message = (JSON.parse(payload)).message;
                        var push_from = JSON.parse((JSON.parse(payload)).notification).alert.from;
                        var push_where = "";
                        //if (push_from == "Curandus") {
                        push_where = "Top"
                            // } else {
                            //     push_where = "Left";
                            //  }
                        readAllMesages();
                        InsertNewMessage(push_from, push_message, push_where);
                        Storage.write("notification", "chat");
                        //console.log("Recieved Push Notification vo chat pageeeee: " + payload);
                    } else {
                        // if (((JSON.parse((JSON.parse(payload)).notification).alert.fromchatid) != patientchatid.value) && getNotification.value == true) {
                        //console.log("vleze vo vtoriot if");
                        //console.log("fromchatid 2" + (JSON.parse((JSON.parse(payload)).notification).alert.fromchatid));
                        //console.log("patientchatid.value 2" + patientchatid.value);
                        myToast.toastIt(JSON.parse((JSON.parse(payload)).notification).alert.title + ":  " + (JSON.parse(payload)).message);
                        vibration.vibrate(0.8);
                    }
                }
            },
            function(error) {
                console.log("error vo citanje od storage");
            });
    }
});


this.onParameterChanged(function(param) {
    backing.value = "1";
    patientInfo.value = "";
    console.log("----------------------- CHAT PAGE ----------------");
    // za da selektira tab Doctors vo ContactPage
    //console.log("param.comesFromContactsDoctor " + param.comesFromContactsDoctors);

    if (param.comesFromContactsDoctors) {
        //console.log("Go setirase parametarot ");
        comesFromContactsDoctors.value = true;
    }
    // za da selektira tab Patients vo ContactPage
    if (param.comesFromContactsPatient) {
        comesFromContactsPatients.value = true;
    }
    // za da selektira tab Patients vo ContactPage
    if (param.comesFromAlertPagePatient) {
        comesFromContactsPatients.value = true;
    }
    if (param.doctorChatRoomId) {
        console.log("ovde vleze: doctorChatRoomId");
        fromChat = false;
        messages.replaceAll([]);
        messagespom.replaceAll([]);
        //console.log('VLEZE VO PRVO');
        //console.log("CHAT SOBA ----------- " + JSON.stringify(param.doctorChatRoomId));
        //console.log("IS DOCTORSSSSSSSSSS - " + param.isDoctors);
        isDoctors = param.isDoctors;
        parametar_send.value = param.doctorChatRoomId;
        user.value = param.doctorChatRoomId;
        patientchatid.value = user.value.ChatId;
        patientchatidpom = user.value.ChatId
        if ((user.value.activetreatmenId) || (user.value.activetreatmenId == 0)) {
            panelVisibility.value = "Visible";
        } else {
            panelVisibility.value = "Collapsed";
        }
        fullname.value = SubstringName(user.value.fullName);
        //console.log(user.value.RoomId);
        PatientPhone.value = user.value.phone;
        RoomId = user.value.RoomId;
        ChatId = User.chatId;
        createSession();
    } else if (param.OdListaChat) {
        console.log("ovde vleze:");
        if (param.namenovo != null) {
            fullname.value = SubstringName(param.namenovo);
            //console.log("OVA E NOVOOOOO IMEEEE OD KONTAKTOT: " + param.namenovo);
            //console.log("OVA E NOVOOOOO IMEEEE OD KONTAKTOT: " + fullname.value);
        }
        // console.log("CHAT SOBA od lista - " + JSON.stringify(param.OdListaChat));
        fromChat = false;
        parametar_send.value = "";
        // console.log("User User User " + JSON.stringify(User));
        messages.replaceAll([]);
        messagespom.replaceAll([]);
        user.value = param.OdListaChat;
        if ((JSON.parse(user.value.name)).provider1 == User.chatId) {
            patientchatid.value = (JSON.parse(user.value.name)).provider2;
            patientchatidpom = (JSON.parse(user.value.name)).provider2;
        } else {
            patientchatid.value = (JSON.parse(user.value.name)).provider1;
            patientchatidpom = (JSON.parse(user.value.name)).provider1;
        }
        //console.log(" patientchatid.value od param.OdListaChat " + patientchatid.value);

        Storage.write("patientchatidpom", patientchatid.value);

        if (((JSON.parse(user.value.name)).isPatient) == "1") {
            panelVisibility.value = "Visible";
        } else {
            panelVisibility.value = "Collapsed";
        }
        flagFullName.value = true;
        fullname.value = SubstringName(user.value.namenovo);
        PatientPhone.value = user.value.phone;
        RoomId = user.value._id;
        ChatId = User.chatId;
        //console.log("ChatId ChatId ChatId " + ChatId);
        createSession();
    } else if (param.odwelcome) {
        // if (param.odwelcome.namenovo != null) {
        //     fullname.value = SubstringName(param.odwelcome.namenovo);
        //     console.log("OVA E NOVOOOOO IMEEEE OD KONTAKTOT: " + param.odwelcome.namenovo);
        // }
        //console.log("CHAT SOBA od lista - " + JSON.stringify(param.odwelcome));
        fromChat = false;
        parametar_send.value = "";
        // console.log("User User User " + JSON.stringify(User));
        messages.replaceAll([]);
        messagespom.replaceAll([]);
        user.value = param.odwelcome;
        patientchatid.value = user.value.fromchatid;
        patientchatidpom = user.value.fromchatid;
        //console.log(" patientchatid.value " + patientchatid.value);

        //if (((JSON.parse(user.value.name)).isPatient) == "1") {
        panelVisibility.value = "Visible";
        // } else {
        //     panelVisibility.value = "Collapsed";
        // }
        flagFullName.value = true;
        fullname.value = SubstringName(user.value.namenovo);
        PatientPhone.value = user.value.fromchatid;
        RoomId = user.value._id;
        ChatId = User.chatId;
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
        //console.log("ChatId + " + ChatId);
        //console.log('RoomId ' + RoomId);
        //console.log(ChatId);
        createSession();
    }
    Storage.write("notification", "chat");

    user.value = param.user;

    if (panelVisibility.value == "Visible") {
        //console.log("vleze vo getpatientifno");
        var url = activeUrl.URL + "/curandusproject/webapi/api/getPatientsDataByChatId/chatid=" + patientchatid.value + "&securityToken=" + securityToken;
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

            patientInfo.value = responseObject;
            patientchatid.value = patientInfo.value.chatId;
            patientchatidpom = patientInfo.value.chatId;
            regid_par.value = patientInfo.value.regId;
            //console.log("Podatoci za pacient od patientInfo.value  " + JSON.stringify(patientInfo.value));

        }).catch(function(err) {
            regid_par.value = null;
            //console.log("Error getPatientsData()", err.message);
        });
    } else {
        //console.log("vleze vo getproviderinfo");
        var url = activeUrl.URL + "/curandusproject/webapi/api/GetProviderDataByChatId/chatid=" + patientchatid.value + "&securityToken=" + securityToken;
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
            //console.log("providerchatid.value  " + JSON.stringify(responseObject));
            patientInfo.value = responseObject;
            patientchatid.value = patientInfo.value.chatId;
            patientchatidpom = patientInfo.value.chatId;
            regid_par.value = patientInfo.value.regId;
            //console.log("Podatoci za provider od provider.value  " + JSON.stringify(patientInfo.value));

        }).catch(function(err) {
            console.log("Error getPatientsData()", err.message);
        });
    }


    Storage.read("patientchatidpom").then(function(content) {
        console.log("Od storage " + content);
    }, function(error) {
        console.log("error vo citanje od storage");
    });

})


function loadMore1() {

    var currDate = "";
    skipped.value = skipped.value - 20;
    if (skipped.value < 0) {
        skipped.value = 0;
    }
    //console.log("vleze vo skrol nadole " + skipped.value);
    //fetch('https://api.quickblox.com/chat/Message.json?chat_dialog_id=' + RoomId + '&skip=10&limit=10&sort_desc=date_sent', {
    fetch('https://api.quickblox.com/chat/Message.json?chat_dialog_id=' + RoomId + '&limit=20&skip=' + skipped.value + '&sort_desc=date_sent', {

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
            skipped.value = skipped.value + 20 - json.items.length;
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
                    messages.add(new Message(fullname.value, "Other", fullDate, fulltime, json.items[i].message, "Left"));
                }
            }
        })
        .catch(function(err) {
            console.log('Error loadmore1');
            console.log(err.message);
            console.log(JSON.stringify(err));
        });
}

function loadMore() {
    // visibility.value = "Visible";
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
                    //for (var i = json.items.length - 1; i >= 0; i--) {
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

                    //messages.insertAll(0, messagespom);


                    myTimeOutReload(messagespom);

                    // for (var i = 0; i < messagespom.length; i++) {
                    //     messages.insertAt(0, messagespom.getAt(messagespom.length - 1 - i));
                    // }

                }
            }

        })
        .catch(function(err) {
            console.log('Error loadMore');
            console.log(err.message);
            console.log(JSON.stringify(err));
        });
}

function getAllMesagesNagore() {
    skipped.value = skipped.value + 20;
    var currDate = "";
    fetch('https://api.quickblox.com/chat/Message.json?chat_dialog_id=' + RoomId + '&limit=' + skipped.value + '&sort_desc=date_sent', {
            method: 'GET',
            headers: {
                'QB-Token': sessionObj.token
            }
        })
        .then(function(resp) {
            return resp.json();
        })
        .then(function(json) {
            console.log("Succes getAllMesages 1");
            //messages.replaceAll([]);
            // messagespom.replaceAll([]);

            skipped.value = 0;
            for (var i = json.items.length - 1; i >= 0; i--) {

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
                    messagespom.add(new Message(fullDateAmerican, fullDateAmerican, " ", " ", "Bottom"));
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
                    messagespom.insertAt(messagespom.length, (new Message(fullname.value, "Other", fullDateAmerican, fulltime, json.items[i].message, "Left")));
                }
                //console.log("messagespom.getAt(messagespom.length).text " + messagespom.getAt(messagespom.length - 1).text + " " + messagespom.getAt(messagespom.length - 1).dock);
            }

            messages.replaceAll(messagespom);
            //console.log("Succes getAllMesages 2");
        })
        .catch(function(err) {
            console.log('Error getAllMesages');
            console.log(err.message);
            console.log(JSON.stringify(err));
        });
    //messages.replaceAll(messagespom);
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
            console.log("JSON seeeen listaSeen length " + listaSeen.length);
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

            skipped.value = 0;
            console.log("json.items[json.items.length - 1].sender_id " + json.items[json.items.length - 1].sender_id);
            console.log("ChatId " + ChatId);

            if (json.items[0].sender_id == ChatId || json.items[0].sender_id == 28505875) {
                IsSeen(RoomId, patientchatid.value);
            } else {
                Seen.value = "";
            }

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
                    messagespom.insertAt(messagespom.length, (new Message(fullname.value, "Other",
                        fullDateAmerican, fulltime, json.items[i].message, "Top")));
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
                'QB-Token': sessionObj.token
            },
            body: JSON.stringify(data)
        })
        .then(function(resp) {
            return resp.json();
            add
            //console.log(JSON.stringify(resp));
        })
        .then(function(json) {
            userObj = json.user;
            //console.log("Succes Sign IN");
            //console.log(JSON.stringify("USER", userObj));
            getAllMesages();

        })
        .catch(function(err) {
            console.log('Error signIn');
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
            //console.log(JSON.stringify(json));
            sessionObj = json.session;
            Storage.write("sesija", json.session.token);
            //console.log(JSON.stringify(sessionObj));
            //console.log("Succes Create Session");
            signIn();

        })
        .catch(function(err) {
            console.log('Error createSession');
            console.log(err);
        });
}

function addMesageToChat() {

    //console.log("Podatoci za pacient " + JSON.stringify(patientInfo.value));
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
                //console.log('Statussssss' + JSON.stringify(resp));
                return resp.json();
            })
            .then(function(json) {
                //console.log('JSON porakaaaa:' + JSON.stringify(json));
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
                //console.log("json.message " + json.message);

                if (messages.length != 0) {
                    //console.log("vleze ");
                    if (fullDateAmerican != messages.getAt(messages.length - 1).created) {
                        messages.add(new Message(fullDateAmerican, "", fullDateAmerican, " ", " ", "Bottom"));
                    }
                } else {
                    messages.add(new Message(fullDateAmerican, "", fullDateAmerican, " ", " ", "Bottom"));
                }


                // console.log("User.firstName + User.lastName " + User.firstName + " " + User.lastName);
                // console.log(" message.value " + message.value);
                // console.log(" RoomId " + RoomId);
                // console.log(" patientInfo.value.regId " + patientInfo.value.regId);

                if (patientInfo.value.notificationEnabled == 1) {
                    SendNotification.sendPushNotification(
                        User.firstName + " " + User.lastName,
                        json.message,
                        json.message,
                        User.firstName + " " + User.lastName,
                        regid_par.value,
                        RoomId,
                        User.firstName + " " + User.lastName,
                        User.chatId);
                }

                myTimeOut("You", "You", fullDateAmerican, fulltime, json.message, "Left");

                setTimeout(function() {
                    message.value = "";
                    Seen.value = "";
                }, 200);

                IsSeen(RoomId, patientchatid.value);
            })
            .catch(function(err) {
                console.log('Error add message to chat');
                console.log(JSON.stringify(err.message));
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
            //console.log("Gi procita site poraki");
        })
        .catch(function(err) {
            console.log('Error readAllMesages');
            console.log(err.message);
            console.log(JSON.stringify(err));
        });
    //messages.replaceAll(messagespom);
}

function myTimeOutReload(p_messagespom) {
    visibility.value = "Visible";
    for (var i = 0; i < p_messagespom.length; i++) {
        messages.insertAt(0, p_messagespom.getAt(p_messagespom.length - 1 - i));
    }
    // setTimeout(function() {
    //     //messages.insertAll(0, p_messagespom);
    //     for (var i = 0; i < p_messagespom.length; i++) {
    //         messages.insertAt(0, p_messagespom.getAt(p_messagespom.length - 1 - i));
    //     }
    // }, 10);
    visibility.value = "Collapsed";
}

function myTimeOut(p_who, p_from_1, p_fulldate, p_fulltime, p_value, p_where) {
    setTimeout(function() {
        messages.add(new Message(p_who, p_from_1, p_fulldate, p_fulltime, p_value, p_where));
    }, 100);
}

function goToUser(userId) {
    //console.log("UserID" + JSON.stringify(user));

    router.push("alert", {
        user: JSON.stringify(user)
    });
}

function goToMain() {
    var obj = {
        "num": Math.random()
    }
    router.goto("main", {
        obj: JSON.stringify(obj),
        comesFromChatPage: true
    });
}

function goBack() {

    console.log("racno back " + " comesFromContactsDoctors.value " + comesFromContactsDoctors.value + " comesFromContactsPatients.value " + comesFromContactsPatients.value);

    if (backing.value == "1") {
        backing.value = "0";
        var obj = {
                "num": Math.random()
            }
            // console.log("ComesFromContacts ***************************: "+comesFromContactsDoctors.value);
            // ako do tuka doshol preku Contacts i sega se vrakja nazad kon Contacts
        if (comesFromContactsDoctors.value) {
            //console.log("comesFromContactsDoctors");
            comesFromContactsDoctors.value = false;
            router.push("main", {
                obj: JSON.stringify(obj),
                comesFromContactsDoctors: true
            });
            //comesFromContactsDoctors.value = false;
        } else
        if (comesFromContactsPatients.value) {
            //console.log("comesFromContactsPatients");
            comesFromContactsPatients.value = false;
            //router.goBack();

            //router.goBack();

            router.goto("main", {
                obj: JSON.stringify(obj),
                comesFromContactsPatients: true
            });
        }
        // vo site drugi sluchai
        else {
            console.log("nigde ne vleze ");
            router.push("main", {
                obj: JSON.stringify(obj),
                OdListaChatLista: true
            });
        }
    } else {
        console.log("vleze vo else");
    }

};

function goToTreatmentFromChat(sender) {
    var prvText = sender.data.text;
    if (prvText.indexOf("please asign treatment to your patient") != -1) {
        goToTreatment();
    } else if (prvText.indexOf("Request for call") != -1) {
        makeCall();
    }
}

function goToTreatment() {

    if (!(parametar_send.value)) {
        var url = activeUrl.URL + "/curandusproject/webapi/api/treatment/roomid=" + RoomId + "&securityToken=" + securityToken;
        visibility1.value = "Visible";
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },
            dataType: 'json'
        }).then(function(response) {
            status = response.status; // Get the HTTP status code 
            response_ok = response.ok; // Is response.status in the 200-range? 
            return response.json(); // This returns a promise 
        }).then(function(data) {
            visibility1.value = "Visible";
            parametar_send.value = data;

            var obj = {
                "num": Math.random()
            }
            if (parametar_send.value.activetreatmenId == 0) {
                router.push("SelectType", {
                    // <<<<<<< HEAD
                    //                     user: parametar_send.value,
                    //                     namenovo: fullname.value
                    // =======
                    user: parametar_send.value,
                    fullname: fullname.value
                });
            } else {
                //console.log("PARAMETAROT::::::::::::" + JSON.stringify(parametar_send.value));
                if (flagFullName) {
                    // console.log("FLAAAAAAG " + flagFullName.value);
                    // console.log("IME ZA VO ALER!!!!!!" + fullname.value);
                    obj = {
                        "num": Math.random()
                    }
                    router.push("alert", {
                        user: parametar_send.value,
                        obj: JSON.stringify(obj),
                        userfullname: fullname.value,
                        comesfrom: "chat"

                    });
                } else {

                    router.push("alert", {
                        user: parametar_send.value,
                        obj: JSON.stringify(obj),
                        userfullname: fullname.value
                    });
                }

            }
            visibility1.value = "Collapsed";
        }).catch(function(err) {
            visibility1.value = "Collapsed";
            console.log("Fetch data error");
            console.log(err.message);
        });
    } else {
        var obj = {
            "num": Math.random()
        }
        if (parametar_send.value.activetreatmenId == 0) {

            router.push("SelectType", {
                user: parametar_send.value,
                fullname: fullname.value
            });
        } else {
            router.push("alert", {
                user: parametar_send.value,
                obj: JSON.stringify(obj),
                userfullname: fullname.value
            });
        }
    }
};

function makeCall() {
    console.log("makeCall");
    phone.call("+1" + PatientPhone.value);
}

function SubstringName(str) {
    var ret;
    if (str != null) {
        if (str.length > 16) {
            ret = str.substring(1, 12) + "...";
        } else {
            ret = str;
        }
        return ret;
    } else {
        return str;
    }
}

function InsertNewMessage(push_from, push_message, push_where) {
    //var today = new Date();
    var today = Date.now();
    var tmpDate = new Date(today) // * 1000);
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


module.exports = {
    user: user,
    IsSeen: IsSeen,
    Seen: Seen,
    getAllMesagesNagore: getAllMesagesNagore,
    InsertNewMessage: InsertNewMessage,
    goToTreatmentFromChat: goToTreatmentFromChat,
    goToTreatment: goToTreatment,
    panelVisibility: panelVisibility,
    parametar_send: parametar_send,
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
    visibility1: visibility1,
    makeCall: makeCall,
    SubstringName: SubstringName,
    visibility: visibility,
    load: load,
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
    message: message,
    comesFromContactsDoctors: comesFromContactsDoctors
};