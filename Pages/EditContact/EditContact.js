var Observable = require('FuseJS/Observable');
var activeUrl = require("Constants/SERVICE_URL.js");
var Storage = require("FuseJS/Storage");
var QConfig = require('Scripts/quickbloxConfig.js');
var myToast = require("myToast");
var SendMessage = require('Scripts/SendMessage.js');
var securityToken = Storage.readSync("securityToken");
var load = Observable("Updating Contact...");
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
var chatUserId = Observable();
var RoomId = Observable();

var phonenumber_par = Observable();
var newContact = {};

var editwhat = Observable();

var editMode1 = Observable("false");
var editMode2 = Observable("false");
var editMode3 = Observable("false");

var visibility = Observable("Visible");
var visibility1 = Observable("Collapsed");

Storage.read("userInfo").then(function(content) {
    User = JSON.parse(content);
}, function(error) {

});

this.onParameterChanged(function(param) {
    createSession();
    if (param.comesfrom == "patient") {
        editwhat.value = "patient";
        console.log("param.user " + JSON.stringify(param.user));
        phonenumber_par.value = "+1" + param.user.phone;
        chatUserId.value = param.user.ChatId;
        phoneNumber.value = param.user.phone;
        name.value = param.user.firstName;
        surname.value = param.user.lastName;
        RoomId.value = param.user.RoomId;
        console.log("phonenumber_par.value " + phonenumber_par.value);
    } else {
        editwhat.value = "provider";
        var dphone = param.user.ModifiedBy;
        while (dphone.length != 10) {
            dphone = "0" + dphone;
        }
        console.log("param.user " + JSON.stringify(param.user));
        phonenumber_par.value = "+1" + dphone;
        chatUserId.value = param.user.ChatId;
        phoneNumber.value = dphone;
        name.value = param.user.FirstName;
        surname.value = param.user.LastName;
        RoomId.value = param.user.RoomId;
        console.log("phonenumber_par.value " + phonenumber_par.value);
    }

})

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



function EditContact() {
    if (editwhat.value == "patient") {
        addChatContact();
    } else {
        EditContactDoctor();
    }
}

function addChatContact() {

    if (name.value != "" && surname.value != "") {
        name.value = encodeURIComponent(name.value);
        surname.value = encodeURIComponent(surname.value);
        console.log("phoneNumber: " + phoneNumber.value);
        var data = {
            "user": {
                "login": phoneNumber.value,
                "password": QConfig.password,
                "email": phoneNumber.value + "@curandus.com",
                "full_name": name.value + " " + surname.value + ""
            }
        }
        var data = {
            "login": User.phone + "1",
            "password": QConfig.password
        }
        visibility1.value = "Visible";
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
                //visibility1.value = "Visible";
                console.log("Se logirase ");
                var info = {
                    "provider1": User.chatId,
                    "provider2": chatUserId.value,
                    "provider1info": User.firstName + " " + User.lastName,
                    "provider2info": name.value + " " + surname.value,
                    "provider1phone": User.phone,
                    "provider2phone": phoneNumber.value,
                    "isPatient": "1"
                }

                var data = {
                    "type": 2,
                    "name": JSON.stringify(info),
                    "occupants_ids": "28505875," + User.chatId + "," + chatUserId.value + ""
                        //"occupants_ids": "25381537," + User.chatId + "," + json.user.id + ""
                }

                fetch('https://api.quickblox.com/chat/Dialog/' + RoomId.value + '.json', {
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
                        console.log("Uspesen update vo quickblox ");
                        addContact();
                    })
                    .catch(function(err) {
                        console.log('Error ovde? 7');
                        console.log(JSON.stringify(err));
                    });
            })
    } else {
        if (name.value == "" || surname.value == "") {
            myToast.toastIt("Enter values for first name and last name");
        }
    }
}

function EditContactDoctor() {
    if (name.value != "" && surname.value != "") {
        name.value = encodeURIComponent(name.value);
        surname.value = encodeURIComponent(surname.value);
        console.log("phoneNumber: " + phoneNumber.value);
        var data = {
            "user": {
                "login": phoneNumber.value,
                "password": QConfig.password,
                "email": phoneNumber.value + "@curandus.com",
                "full_name": name.value + " " + surname.value + ""
            }
        }
        var data = {
            "login": User.phone + "1",
            "password": QConfig.password
        }
        visibility1.value = "Visible";
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
                //visibility1.value = "Visible";
                console.log("Se logirase ");
                var info = {
                    "provider1": User.chatId,
                    "provider2": chatUserId.value,
                    "provider1info": User.firstName + " " + User.lastName,
                    "provider2info": name.value + " " + surname.value,
                    "provider1phone": User.phone,
                    "provider2phone": phoneNumber.value,
                    "isPatient": "0"
                }

                var data = {
                    "type": 2,
                    "name": JSON.stringify(info),
                    "occupants_ids": "28505875," + User.chatId + "," + chatUserId.value + ""
                        //"occupants_ids": "25381537," + User.chatId + "," + json.user.id + ""
                }

                fetch('https://api.quickblox.com/chat/Dialog/' + RoomId.value + '.json', {
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
                        console.log("Uspesen update vo quickblox ");
                        EditContactDoctorPom();
                    })
                    .catch(function(err) {
                        console.log('Error ovde? 7');
                        console.log(JSON.stringify(err));
                    });
            })
    } else {
        if (name.value == "" || surname.value == "") {
            myToast.toastIt("Enter values for first name and last name");
        }
    }
}

function EditContactDoctorPom() {
    if (name.value != "" && surname.value != "") {
        name.value = encodeURIComponent(name.value);
        surname.value = encodeURIComponent(surname.value);
        //visibility1.value = "Visible";
        // load.value="Adding Contact";

        var api_url = activeUrl.URL + "/curandusproject/webapi/api/addcontactdoctor/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + chatUserId.value + "&roomid=" + RoomId.value + "&securityToken=" + securityToken;
        console.log("api_url " + api_url);
        fetch(api_url, {
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
                comesFromContactsDoctors: Math.random()
            });
        }).catch(function(err) {
            console.log("Error", err.message);
        });
    }
}


function addContact() {
    if (name.value != "" && surname.value != "") {
        name.value = encodeURIComponent(name.value);
        surname.value = encodeURIComponent(surname.value);
        //visibility1.value = "Visible";
        // load.value="Adding Contact";
        var api_url = activeUrl.URL + "/curandusproject/webapi/api/addcontactpatient/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + chatUserId.value + "&roomid=" + RoomId.value + "&securityToken=" + securityToken;
        console.log("api_url " + api_url);
        fetch(api_url, {
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
                comesFromEditPatient: Math.random()
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
        console.log("Success");
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
    EditContact: EditContact,
    EditContactDoctorPom: EditContactDoctorPom,
    EditContactDoctor: EditContactDoctor,
    addChatContact: addChatContact,
    phonenumber_par: phonenumber_par,
    goToLocal: goToLocal,
    phoneNumber: phoneNumber,
    name: name,
    sendSms: sendSms,
    surname: surname,
    phoneNumber1: phoneNumber1,
    phoneNumber2: phoneNumber2,
    phoneNumber3: phoneNumber3,
    editMode1: editMode1,
    editMode2: editMode2,
    editMode3: editMode3,
    PhoneNumberColor: PhoneNumberColor,
    visibility: visibility,
    visibility1: visibility1,
    load: load
        //changeColor:changeColor
}


//     fetch(activeUrl.URL + "/curandusproject/webapi/api/addcontactpatient/providerId=" + User.providerId + "&phone=" + phoneNumber.value + "&firstName=" + name.value + "&lastName=" + surname.value + "&chatid=" + chatUserId.value + "&roomid=" + RoomId.value + "&securityToken=" + securityToken, {
//         method: 'POST',
//         headers: {
//             "Content-type": "application/json"
//         },
//         dataType: 'json'
//     }).then(function(response) {
//         status = response.status; // Get the HTTP status code
//         response_ok = response.ok; // Is response.status in the 200-range?
//         return response.json(); // This returns a promise
//     }).then(function(responseObject) {
//         visibility1.value = "Visible";
//         console.log("Success");
//         var tmp = phoneNumber.value;
//         var text = "Link to App!";
//         sendSms(tmp, text);
//         phoneNumber.value = "";
//         name.value = "";
//         surname.value = "";

//         router.goto("chat", {
//             OdListaChat: dialogObj,
//         });
//     }).catch(function(err) {
//         console.log("Error add? 6 vo if");
//         console.log(err.message);
//     });
// }).catch(function(err) {
//     console.log('Error 10');
//     console.log(err.message);
// });
