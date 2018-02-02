var Observable = require('FuseJS/Observable');
var activeUrl = require("Constants/SERVICE_URL.js");
var Storage = require("FuseJS/Storage");
var QConfig = require('Scripts/quickbloxConfig.js');
var myToast = require("myToast");
var SendMessage = require('Scripts/SendMessage.js');
var securityToken = Storage.readSync("securityToken");
var load = Observable("Adding Contact...");
var sessionObj;
var userObj;
var User;
var userChatId = "";
var phoneNumber = Observable("");
var phoneNumber1 = Observable("");
var phoneNumber2 = Observable("");
var phoneNumber3 = Observable("");
var name = Observable("");
var surname = Observable("");
var re = Observable("");
var temp = Observable("dva");
var focused = Observable(true);
var focus = Observable("prv");
var counter = Observable(0);
var tempCounter1 = Observable(0);
var tempCounter2 = Observable(0);
var tempCounter3 = Observable(0);
var PhoneNumberColor = Observable("#BDBDBD");

var newContact = {};

var editMode1 = Observable("false");
var editMode2 = Observable("false");
var editMode3 = Observable("false");

var visibility = Observable("Visible");
var visibility1 = Observable("Collapsed");

Storage.read("userInfo").then(function(content) {
    User = JSON.parse(content);
}, function(error) {

});

///on click - phonenumber change color
// function changeColor(){
//     if(counter.value == 0)
//         PhoneNumberColor.value = "#00BCD4";
// }

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

/*function function1(phoneNumber1){

  if(phoneNumber1.value.length == 3){
     console.log("pecati nesto");
     (phoneNumber1.value.length + 1).focus;
  }
}*/

/* function function1(){
   if(phoneNumber1.value.length=='3'){
       focus(phoneNumber2);
       temp.value="dva";
   }
   return temp;
 }*/

function addChatContact() {

    phoneNumber.value = phoneNumber1.value + "" + phoneNumber2.value + "" + phoneNumber3.value;
    if (phoneNumber1.value != "" && phoneNumber2.value != "" && phoneNumber3.value != "" &&
        phoneNumber.value.length == '10' && name.value != "" && surname.value != "" && sessionObj) {

        name.value = encodeURIComponent(name.value);
        surname.value = encodeURIComponent(surname.value);

        console.log("phoneNumber: " + phoneNumber.value);

        var data = {
            "user": {
                "login": phoneNumber.value + "0",
                "password": QConfig.password,
                "email": phoneNumber.value + "0" + "@curandus.com",
                "full_name": name.value + " " + surname.value + ""
            }
        }
        visibility1.value = "Visible";
        //load.value="Adding Contact";
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
                visibility1.value = "Visible";
                //load.value="Adding Contact";
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
                        .then(function(response) {
                            //console.log("User LoggedIn");
                            return response.json();
                        })
                        .then(function(json) {
                            visibility1.value = "Visible";
                            //load.value="Adding Contact";
                            console.log("Pred Error");
                            userObj = json.user;

                            // createDialog(userObj.id, chatUserId)

                            var info = {
                                "provider1": userObj.id,
                                "provider2": chatUserId,
                                "provider1info": User.firstName + " " + User.lastName,
                                "provider2info": name.value + " " + surname.value,
                                "provider1phone": User.phone,
                                "provider2phone": phoneNumber.value,
                                "isPatient": "1"
                            }
                            var data = {
                                "type": 2,
                                "name": JSON.stringify(info),
                                "occupants_ids": "28505875," + userObj.id + "," + chatUserId + ""
                                    //"occupants_ids": "25381537," + userObj.id + "," + chatUserId + ""
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
                                    visibility1.value = "Visible";
                                    //load.value="Adding Contact";
                                    json.namenovo = name.value + " " + surname.value;
                                    json.phone = phoneNumber.value;
                                    dialogObj = json;
                                    SendMessage.createSession(dialogObj._id, User.firstName + " " + User.lastName + " please asign treatment to your patient " + name.value + " " + surname.value);

                                    console.log("dialogObj + namenovo " + JSON.stringify(dialogObj));
                                    // addContact(chatUserId, dialogObj._id);

                                    fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactpatient/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + chatUserId + "&roomid=" + dialogObj._id + "&securityToken=" + securityToken, {
                                        method: 'POST',
                                        headers: {
                                            "Content-type": "application/json"

                                        },
                                        dataType: 'json'
                                    }).then(function(response) {
                                        status = response.status; // Get the HTTP status code
                                        response_ok = response.ok; // Is response.status in the 200-range?
                                        return response.json(); // This returns a promise
                                    }).then(function(responseObject) {
                                        visibility1.value = "Visible";
                                        // load.value="Adding Contact";
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
                                            OdListaChat: dialogObj,

                                            //namenovo: namenovo

                                            namenovo: json.namenovo

                                        });

                                        // router.goto("main", {
                                        //     newContact: tmp
                                        // });

                                    }).catch(function(err) {
                                        visibility1.value = "Collapsed";
                                        console.log("Error add?", err.message);
                                    });

                                    console.log(JSON.stringify(dialogObj));
                                })
                                .catch(function(err) {
                                    visibility1.value = "Collapsed";
                                    console.log('Error ovde?');
                                    console.log(err.message);
                                });

                            console.log(JSON.stringify(userObj));

                        })
                        .catch(function(err) {
                            visibility1.value = "Collapsed";
                            console.log('Error 2');
                            console.log(err.message);
                        });
                } else
                    console.log("json.errors " + JSON.stringify(json.errors.email));
                if (json.errors.email == "has already been taken." || json.errors.login == "has already been taken.") {
                    console.log("Greska ");
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
                            visibility1.value = "Visible";
                            //load.value="Adding Contact";
                            fetch('https://api.quickblox.com/users/by_login.json?login=' + phoneNumber.value + "0", {
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
                                    visibility1.value = "Visible";
                                    //load.value="Adding Contact";
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
                                        "isPatient": "1"
                                    }

                                    var data = {
                                        "type": 2,
                                        "name": JSON.stringify(info),
                                        "occupants_ids": "28505875," + User.chatId + "," + json.user.id + ""
                                            //"occupants_ids": "25381537," + User.chatId + "," + json.user.id + ""
                                    }
                                    fetch('https://api.quickblox.com/chat/Dialog.json?occupants_ids[in]=' + json.user.id, {
                                            method: 'GET',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'QB-Token': sessionObj.token
                                            },
                                        })
                                        .then(function(resp) {
                                            console.log("Dialog Created");
                                            return resp.json();
                                        })
                                        .then(function(json) {
                                            console.log("json.total_entries " + json.total_entries);
                                            if (json.total_entries == 0) {
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
                                                        visibility1.value = "Visible";
                                                        // load.value="Adding Contact";
                                                        json.namenovo = name.value + " " + surname.value;
                                                        json.phone = phoneNumber.value;
                                                        dialogObj = json;
                                                        console.log("dialogObj + namenovo " + JSON.stringify(dialogObj));
                                                        // addContact(chatUserId, dialogObj._id);
                                                        SendMessage.createSession(dialogObj._id, User.firstName + " " + User.lastName + " please asign treatment to your patient " + name.value + " " + surname.value);
                                                        fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactpatient/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + chatUserId + "&roomid=" + dialogObj._id, {
                                                            method: 'POST',
                                                            headers: {
                                                                "Content-type": "application/json"
                                                            },
                                                            dataType: 'json'
                                                        }).then(function(response) {
                                                            status = response.status; // Get the HTTP status code
                                                            response_ok = response.ok; // Is response.status in the 200-range?
                                                            return response.json(); // This returns a promise
                                                        }).then(function(responseObject) {
                                                            visibility1.value = "Visible";
                                                            // load.value="Adding Contact";
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
                                                                OdListaChat: dialogObj,
                                                            });
                                                        }).catch(function(err) {
                                                            console.log("Error add? 6 vo if");
                                                            console.log(err.message);
                                                        });
                                                    })
                                                    .catch(function(err) {
                                                        console.log('Error ovde? 7');
                                                        console.log(JSON.stringify(err));
                                                    });
                                                // fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactpatient/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + chatUserId + "&roomid=" + json.items[0]._id, {
                                            } else {
                                                console.log(" Vleze vo else " + 'https://api.quickblox.com/chat/Dialog/' + json.items[0]._id + '.json');
                                                console.log(" data " + data);

                                                fetch('https://api.quickblox.com/chat/Dialog/' + json.items[0]._id + '.json', {
                                                        method: 'PUT',
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
                                                        visibility1.value = "Visible";
                                                        // load.value="Adding Contact";
                                                        json.namenovo = name.value + " " + surname.value;
                                                        json.phone = phoneNumber.value;
                                                        dialogObj = json;
                                                        console.log("dialogObj + namenovo " + JSON.stringify(dialogObj));
                                                        // addContact(chatUserId, dialogObj._id);
                                                        SendMessage.createSession(dialogObj._id, User.firstName + " " + User.lastName + " please asign treatment to your patient " + name.value + " " + surname.value);
                                                        fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactpatient/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + chatUserId + "&roomid=" + dialogObj._id, {
                                                            method: 'POST',
                                                            headers: {
                                                                "Content-type": "application/json"
                                                            },
                                                            dataType: 'json'
                                                        }).then(function(response) {
                                                            status = response.status; // Get the HTTP status code
                                                            response_ok = response.ok; // Is response.status in the 200-range?
                                                            return response.json(); // This returns a promise
                                                        }).then(function(responseObject) {
                                                            visibility1.value = "Visible";
                                                            // load.value="Adding Contact";
                                                            console.log("Success");
                                                            var tmp = phoneNumber.value;
                                                            var text = "Link to App!";
                                                            // sendSms(tmp, text);
                                                            sendSms(tmp, text);
                                                            phoneNumber.value = "";
                                                            name.value = "";
                                                            surname.value = "";

                                                            console.log("Pred da odi vo chat " + dialogObj);
                                                            router.goto("chat", {
                                                                OdListaChat: dialogObj,
                                                            });
                                                        }).catch(function(err) {
                                                            console.log("Error add? 6 vo if");
                                                            console.log(err.message);
                                                        });
                                                    })
                                                    .catch(function(err) {
                                                        console.log('Error ovde? 7');
                                                        console.log(JSON.stringify(err));
                                                    });
                                            }

                                        }).catch(function(err) {
                                            console.log("Error add? json.total_entries");
                                            console.log(err.message);
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Error ovde? 7');
                                    console.log(JSON.stringify(err));
                                });
                            // })
                            // .catch(function(err) {
                            //     console.log('Error 8');
                            //     console.log(err.message);
                            // });
                        })
                        .catch(function(err) {
                            console.log('Error 9');
                            console.log(err.message);
                        });

                }
            })
            .catch(function(err) {
                console.log('Error 10');
                console.log(err.message);
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

    console.log("vleze vo createDialog");
    var info = {
        "provider1": myUserId,
        "provider2": contactId,
        "provider1info": User.firstName + " " + User.lastName,
        "provider2info": name.value + " " + surname.value,
        "isPatient": "1"
    }

    var data = {
        "type": 2,
        "name": JSON.stringify(info),
        "occupants_ids": "25381537," + myUserId + "," + contactId + ""
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
            fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactpatient/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + contactId + "&roomid=" + dialogObj._id, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                dataType: 'json'
            }).then(function(response) {
                status = response.status; // Get the HTTP status code
                response_ok = response.ok; // Is response.status in the 200-range?
                return response.json(); // This returns a promise
            }).then(function(responseObject) {
                console.log("Success");
                var tmp = phoneNumber.value;
                var text = "Link to App!";
                //sendSms(tmp, text);

                phoneNumber.value = "";
                name.value = "";
                surname.value = "";


                router.goto("main", {
                    newContact: tmp
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


function addContact() {

    if (phoneNumber.value != "" && name.value != "" && surname.value != "") {
        name.value = encodeURIComponent(name.value);
        surname.value = encodeURIComponent(surname.value);
        visibility1.value = "Visible";
        // load.value="Adding Contact";
        fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactpatient/providerId=" + UserInfo.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=321321&roomid=321312312", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            dataType: 'json'
        }).then(function(response) {
            status = response.status; // Get the HTTP status code
            response_ok = response.ok; // Is response.status in the 200-range?
            return response.json(); // This returns a promise
        }).then(function(responseObject) {
            console.log("Success");

            newContact.phoneNumber = phoneNumber.value;
            newContact.name = name.value;
            newContact.surname = surname.value;
            var tmp = phoneNumber.value;
            phoneNumber.value = "";
            name.value = "";
            surname.value = "";

            router.goto("main", {
                newContact: tmp
            });

        }).catch(function(err) {
            console.log("Error", err.message);
        });
    }

}

function sendSms(phone, text) {
    var api_url = activeUrl.URL + "/curandusproject/webapi/api/sendsms/to=+1" + phone + "&body=" + encodeURIComponent(text);

    //    console.log("api_url " + api_url);
    fetch(api_url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json'
    }).then(function(response) {
        return response.json(); // This returns a promise
    }).then(function(responseObject) {
        console.log("Success vo send sms");
        //myToast.toastIt("Code has been sent");
    }).catch(function(err) {
        console.log("Error SMS", err.message);
    });
}

function goToLocal() {

    console.log("Vleze vo funkcija");
}


module.exports = {
    addContact: addContact,
    addChatContact: addChatContact,
    goToLocal: goToLocal,
    phoneNumber: phoneNumber,
    name: name,
    sendSms: sendSms,
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
        //changeColor:changeColor
}