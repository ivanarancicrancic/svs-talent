var Observable = require('FuseJS/Observable');
var activeUrl = require("Constants/SERVICE_URL.js");
var Storage = require("FuseJS/Storage");
var securityToken2 = Storage.readSync("securityToken2");
var securityToken1 = Storage.readSync("securityToken1");
var myToast = require("myToast");
var QConfig = require('Scripts/quickbloxConfig.js');
var SendMessage = require('Scripts/SendMessage.js');
var load = Observable("Adding contact...");
var phoneNumber = Observable("");
var phoneNumber1 = Observable("");
var phoneNumber2 = Observable("");
var phoneNumber3 = Observable("");

var temp = Observable("dva");
var focused = Observable(true);
var focus = Observable("prv");
var counter = Observable(0);
var tempCounter1 = Observable(0);
var tempCounter2 = Observable(0);
var tempCounter3 = Observable(0);
var PhoneNumberColor = Observable("#BDBDBD");

var editMode1 = Observable("false");
var editMode2 = Observable("false");
var editMode3 = Observable("false");

var sessionObj;
var userObj;
var User;

var userChatId = "";
var phoneNumber = Observable("");
var name = Observable("");
var surname = Observable("");
var visibility1 = Observable("Collapsed");
var visibility = Observable("Visible");

/*phoneNumber.value = "001";
console.log("phone format " + phoneNumber);*/

Storage.read("userInfo").then(function(content) {
    User = JSON.parse(content);
}, function(error) {

});

this.onParameterChanged(function(param) {
    if (param.localContact) {

        phoneNumber.value = param.localContact.phoneNumber;
        name.value = param.localContact.name;
        surname.value = param.localContact.surname;

    }
});

function ValidatePassKey() {

    /// Counting phone length of an input
    if (phoneNumber1.value != null) {
        //console.log("vrednost na counter phoneNumber1:"+counter.value );
        tempCounter1.value = phoneNumber1.value.length;
    }
    if (phoneNumber2.value != null) {
        //console.log("vrednost na counter phoneNumber2:"+counter.value );
        tempCounter2.value = phoneNumber2.value.length;
    }
    if (phoneNumber3.value != null) {
        //console.log("vrednost na counter phoneNumber3:"+counter.value );
        tempCounter3.value = phoneNumber3.value.length;
    }

    counter.value = tempCounter1.value + tempCounter2.value + tempCounter3.value;
    //console.log("This is the counter value : "+counter.value);

    // Phone label color
    if (counter.value > 0) {
        //#00BCD4
        PhoneNumberColor.value = "#00BCD4";
    }
    if (counter.value == 0) {
        PhoneNumberColor.value = "#BDBDBD";
    }

    /// Setting phone-input focus 
    if (phoneNumber1.value != null) {
        if (counter.value == 3) {
            editMode1.value = "true";
            focus.value = "vtor";
            editMode1.value = "false";
        }

        if (counter.value == 6) {
            //console.log("(6)value od the counter is = "+counter.value);
            editMode2.value = "true";
            focus.value = "tret";
            editMode2.value = "false";
        }
        if (counter.value == 10) {
            //console.log(" (10)value od the counter is = "+counter.value);
        }
    }

}


function createSession() {

    var data = {
        'application_id': QConfig.appId,
        'auth_key': QConfig.authKey,
        'nonce': Math.floor(Math.random() * 1000),
        'timestamp': new Date().getTime() / 1000
    }

    var signData = QConfig.getSignedData(data);

    console.log(JSON.stringify(signData));

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
        })
        .catch(function(err) {
            console.log('Error');
            console.log(JSON.stringify(err));
        });
}

createSession();

function addChatContact() {

    phoneNumber.value = phoneNumber1.value + "" + phoneNumber2.value + "" + phoneNumber3.value;
    if (phoneNumber1.value != "" && phoneNumber2.value != "" && phoneNumber3.value != "" &&
        phoneNumber.value.length == '10' && name.value != "" && surname.value != "" && sessionObj) {

        name.value = encodeURIComponent(name.value);
        surname.value = encodeURIComponent(surname.value);

        var data = {
            "user": {
                "login": phoneNumber.value + "1",
                "password": QConfig.password,
                "email": phoneNumber.value + "1" + "@curandus.com",
                "full_name": name.value + " " + surname.value + ""
            }
        }
        visibility1.value = "Visible";
        fetch('https://api.quickblox.com/users.json', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json,",
                    'QuickBlox-REST-API-Version': "0.1.0",
                    'QB-Token': sessionObj.token
                },
                body: JSON.stringify(data)
            })
            .then(function(resp) {
                return resp.json();
            })
            .then(function(json) {
                console.log(JSON.stringify(json));
                var chatUserId;
                if (json.user) {
                    console.log("USER CREATED " + JSON.stringify(json.user.id));
                    chatUserId = json.user.id;

                    var data = {
                        "login": User.phone + "1",
                        "password": QConfig.password
                    }

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
                            console.log("User LoggedIn");
                            return resp.json();
                        })
                        .then(function(json) {
                            userObj = json.user;

                            // createDialog(userObj.id, chatUserId)

                            var info = {
                                "provider1": userObj.id,
                                "provider2": chatUserId,
                                "provider1info": User.firstName + " " + User.lastName,
                                "provider2info": name.value + " " + surname.value,
                                "provider1phone": User.phone,
                                "provider2phone": phoneNumber.value,
                                "isPatient": "0"
                            }

                            var data = {
                                "type": 2,
                                "name": JSON.stringify(info), //"Chat with name surname" + userObj.id + " & " + chatUserId,
                                "occupants_ids": "28505875," + userObj.id + "," + chatUserId + ""
                            }

                            fetch('https://api.quickblox.com/chat/Dialog.json', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'QB-Token': sessionObj.token
                                    },
                                    body: JSON.stringify(data)
                                })
                                .then(function(resp) {
                                    console.log("Dialog Created");
                                    return resp.json();
                                })
                                .then(function(json) {

                                    json.namenovo = name.value + " " + surname.value;
                                    json.phone = phoneNumber.value;
                                    dialogObj = json;
                                    console.log("DIALOG!" + dialogObj._id);
                                    SendMessage.createSession(dialogObj._id, " Hi Doctor " + name.value + " " + surname.value);

                                    fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactdoctor/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + chatUserId + "&roomid=" + dialogObj._id, {
                                        method: 'POST',
                                        headers: {
                                            "Content-type": "application/json",
                                            'securityToken2': securityToken2
                                        },
                                        dataType: 'json'
                                    }).then(function(response) {
                                        status = response.status; // Get the HTTP status code
                                        response_ok = response.ok; // Is response.status in the 200-range?
                                        return response.json(); // This returns a promise
                                    }).then(function(responseObject) {
                                        console.log("Success");
                                        var tmp = phoneNumber.value;
                                        var text = "You were added to Curandus Health Care System by Dr. " + User.firstName + " " + User.lastName +
                                            ". Please install the Curandus by clicking the following link Link to App!";
                                        sendSms(tmp, text);

                                        phoneNumber.value = "";
                                        name.value = "";
                                        surname.value = "";


                                        router.goto("main", {
                                            newDoctor: tmp
                                        });

                                    }).catch(function(err) {
                                        console.log("Error add?", err.message);
                                    });

                                    console.log(JSON.stringify(dialogObj));
                                })
                                .catch(function(err) {
                                    console.log('Error ovde?');
                                    console.log(JSON.stringify(err));
                                });

                            console.log(JSON.stringify(userObj));

                        })
                        .catch(function(err) {
                            console.log('Error');
                            console.log(JSON.stringify(err));
                        });

                } else
                if (json.errors.email == "has already been taken." || json.errors.login == "has already been taken.") {
                    //console.log(JSON.stringify(json.errors.login[0]));
                    var data = {
                        "login": User.phone + "1",
                        "password": QConfig.password
                    }

                    fetch('https://api.quickblox.com/login.json', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'QuickBlox-REST-API-Version': "0.1.0",
                                'QB-Token': sessionObj.token
                            },
                            body: JSON.stringify(data)
                        })
                        .then(function(response) {
                            //console.log("User LoggedIn");
                            return response.json();
                        })
                        .then(function(json) {
                            fetch('https://api.quickblox.com/users/by_login.json?login=' + phoneNumber.value + "1", {
                                    method: 'GET',
                                    headers: {
                                        'QuickBlox-REST-API-Version': "0.1.0",
                                        'QB-Token': sessionObj.token
                                    }
                                })
                                .then(function(resp) {
                                    console.log("User Found!");
                                    return resp.json();
                                })
                                .then(function(json) {
                                    console.log('JSON POSTOI:' + JSON.stringify(json));

                                    console.log("json.user.id " + json.user.id);
                                    console.log("json.user.id " + User.chatId);

                                    var info = {
                                        "provider1": User.chatId,
                                        "provider2": json.user.id,
                                        "provider1info": User.firstName + " " + User.lastName,
                                        "provider2info": name.value + " " + surname.value,
                                        "provider1phone": User.phone,
                                        "provider2phone": phoneNumber.value,
                                        "isPatient": "0"
                                    }

                                    var data = {
                                        "type": 2,
                                        "name": JSON.stringify(info),
                                        "occupants_ids": "28505875," + User.chatId + "," + json.user.id + ""
                                            //"occupants_ids": "25381537," + User.chatId + "," + json.user.id + ""
                                    }

                                    fetch('https://api.quickblox.com/chat/Dialog.json', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'QB-Token': sessionObj.token
                                            },
                                            body: JSON.stringify(data)
                                        })
                                        .then(function(resp) {
                                            console.log("Dialog Created");
                                            return resp.json();
                                        })
                                        .then(function(json) {
                                            json.namenovo = name.value + " " + surname.value;
                                            json.phone = phoneNumber.value;
                                            dialogObj = json;
                                            SendMessage.createSession(dialogObj._id, " Hi Doctor " + name.value + " " + surname.value);
                                            console.log("dialogObj + namenovo " + JSON.stringify(dialogObj));
                                            // addContact(chatUserId, dialogObj._id);
                                            fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactdoctor/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + chatUserId + "&roomid=" + dialogObj._id, {
                                                method: 'POST',
                                                headers: {
                                                    "Content-type": "application/json",
                                                    'securityToken2': securityToken2
                                                },
                                                dataType: 'json'
                                            }).then(function(response) {
                                                status = response.status; // Get the HTTP status code
                                                response_ok = response.ok; // Is response.status in the 200-range?
                                                return response.json(); // This returns a promise
                                            }).then(function(responseObject) {
                                                console.log("Success");
                                                var tmp = phoneNumber.value;
                                                var text = "You were added to Curandus Health Care System by Dr. " + User.firstName + " " + User.lastName +
                                                    ". Please install the Curandus by clicking the following link Link to App!";
                                                // sendSms(tmp, text);
                                                sendSms(tmp, text);
                                                phoneNumber.value = "";
                                                name.value = "";
                                                surname.value = "";

                                                router.goto("chat", {
                                                    OdListaChat: dialogObj
                                                });
                                                // router.goto("main", {
                                                //     newContact: tmp
                                                // });

                                            }).catch(function(err) {
                                                console.log("Error add?", err.message);
                                            });


                                        })
                                        .catch(function(err) {
                                            console.log('Error ovde?');
                                            console.log(JSON.stringify(err));
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Error');
                                    console.log(JSON.stringify(err));
                                });
                        })
                        .catch(function(err) {
                            console.log('Error');
                            console.log(JSON.stringify(err));
                        });

                }
            })
            .catch(function(err) {
                console.log('Error');
                console.log(JSON.stringify(err));
            });
    } else {

        if (phoneNumber.value.length != '10') {
            //console.log ("Invalid phoneNumber");
            myToast.toastIt("Invalid phoneNumber");
        }
        if (name.value == "" || surname.value == "") {
            //console.log ("All fields are required");
            myToast.toastIt("All fields are required");
        }
    }


}

function createDialog(myUserId, contactId) {

    var info = {
        "provider1": userObj.id,
        "provider2": chatUserId,
        "provider1info": User.firstName + " " + User.lastName,
        "provider2info": name.value + " " + surname.value,
        "isPatient": "0"
    }


    var data = {
        "type": 2,
        "name": JSON.stringify(info),
        "occupants_ids": "25381537," + myUserId + "," + contactId + "",
        "UsersForChat": {
            "user1": "" + name.value + " " + surname.value + "",
            "user2": "" + User.firstName + ' ' + User.lastName + ""
        },

    }

    console.log("    aAaaaaaaaaaaaaaaaaaaaaaa " + data);

    fetch('https://api.quickblox.com/chat/Dialog.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'QB-Token': sessionObj.token
            },
            body: JSON.stringify(data)
        })
        .then(function(resp) {
            console.log("Dialog Created 2");
            return resp.json();
        })
        .then(function(json) {
            dialogObj = json;
            console.log("DIALOG!" + dialogObj._id + contactId);
            // addContact(contactId, dialogObj._id);
            fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactdoctor/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + contactId + "&roomid=" + dialogObj._id, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    'securityToken2': securityToken2
                },
                dataType: 'json'
            }).then(function(response) {
                status = response.status; // Get the HTTP status code
                response_ok = response.ok; // Is response.status in the 200-range?
                return response.json(); // This returns a promise
            }).then(function(responseObject) {
                console.log("Success");
                var tmp = phoneNumber.value;
                var text = "You were added to Curandus Health Care System by Dr. " + User.firstName + " " + User.lastName +
                    ". Please install the Curandus by clicking the following link Link to App!";
                sendSms(tmp, text);

                phoneNumber.value = "";
                name.value = "";
                surname.value = "";


                router.goto("main", {
                    newDoctor: tmp
                });

            }).catch(function(err) {
                console.log("Error add?", err.message);
            });

            console.log(JSON.stringify(dialogObj));
        })
        .catch(function(err) {
            console.log('Error ovde?');
            console.log(JSON.stringify(err));
        });
}

function addContact(chatID, roomID) {
    console.log(chatID + " - " + roomID);
    if (phoneNumber.value != "" && name.value != "" && surname.value != "") {
        fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactdoctor/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + chatID + "&roomid=" + roomID, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                'securityToken2': securityToken2
            },
            dataType: 'json'
        }).then(function(response) {
            status = response.status; // Get the HTTP status code
            response_ok = response.ok; // Is response.status in the 200-range?
            return response.json(); // This returns a promise
        }).then(function(responseObject) {
            console.log("Success");
            var tmp = phoneNumber.value;
            var text = "You were added to Curandus Health Care System by Dr. " + User.firstName + " " + User.lastName +
                ". Please install the Curandus by clicking the following link Link to App!";
            sendSms(tmp, text);


            phoneNumber.value = "";
            name.value = "";
            surname.value = "";


            router.goto("main", {
                newDoctor: tmp
            });

        }).catch(function(err) {
            console.log("Error add?", err.message);
        });

    } else {
        myToast.toastIt("All fields are required!");
    }
}

//     function sendSms(phone, text) {
//         fetch(activeUrl.URL + "/curandusproject/webapi/api/sendsms/sendsms/to=" + phone + "&body=" + text, {
//             method: 'POST',
//             headers: {
//                 "Content-type": "application/json"
//             },
//             dataType: 'json'
//         }).then(function(response) {
//             return response.json(); // This returns a promise
//         }).then(function(responseObject) {
//             console.log("Success");
//         }).catch(function(err) {
//             console.log("Error", err.message);
//         });
//     }

// }

function sendSms(phone, text) {


    var api_call = activeUrl.URL + "/curandusproject/webapi/api/sendsms/to=+1" + phone + "&body=" + encodeURIComponent(text);

    console.log("Vleze vo send sms " + api_call);
    fetch(api_call, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'securityToken1': securityToken1
        },
        dataType: 'json'
    }).then(function(response) {
        return response.json(); // This returns a promise
    }).then(function(responseObject) {
        console.log("Success vo send sms");
    }).catch(function(err) {
        console.log("Error vo send sms", err.message);
    });
}

function goToLocal() {
    router.push("LocalContacts");
}

// function sendSms(phone, text) {
//     fetch(activeUrl.URL + "/curandusproject/webapi/api/sendsms/to=+1" + phone + "&body=" + text, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         },
//         dataType: 'json'
//     }).then(function(response) {
//         return response.json(); // This returns a promise
//     }).then(function(responseObject) {
//         console.log("Success");
//     }).catch(function(err) {
//         console.log("Error", err.message);
//     });
// }


module.exports = {
    addChatContact: addChatContact,
    goToLocal: goToLocal,
    phoneNumber: phoneNumber,
    name: name,
    surname: surname,
    phoneNumber1: phoneNumber1,
    phoneNumber2: phoneNumber2,
    phoneNumber3: phoneNumber3,
    ValidatePassKey: ValidatePassKey,
    editMode1: editMode1,
    editMode2: editMode2,
    editMode3: editMode3,
    PhoneNumberColor: PhoneNumberColor,
    visibility: visibility,
    visibility1: visibility1,
    load: load
};