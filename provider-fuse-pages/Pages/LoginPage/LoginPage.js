var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var Device = require('Device');
var QConfig = require('Scripts/quickbloxConfig.js');
var myToast = require("myToast");
var Storage = require("FuseJS/Storage");

var securityToken = Storage.readSync("securityToken");
var register = Observable();
var firstName = Observable("");
var lastName = Observable("");
var phoneNumber = Observable("");
var phoneNumber1 = Observable("");
var phoneNumber2 = Observable("");
var phoneNumber3 = Observable("");
var load = Observable("Please wait...");
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

var chatUserId = "";

var sessionObj = {};

var visibility1 = Observable("Collapsed");
var visibility = Observable("Visible");
var p_reg_id = Observable();
//phone.value = "001";
console.log("phone format " + phoneNumber);

this.onParameterChanged(function(param) {
    p_reg_id.value = (JSON.parse(JSON.stringify(param))).regid;
    console.log("onParameterChanged vo  login PAGE: " + p_reg_id.value);
});

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

function signUp() {
    phoneNumber.value = phoneNumber1.value + "" + phoneNumber2.value + "" + phoneNumber3.value;

    if (phoneNumber1.value != "" && phoneNumber2.value != "" && phoneNumber3.value != "" &&
        phoneNumber.value.length == '10' && firstName.value != "" && lastName.value != "" && sessionObj) {
        console.log(" this is phoneNumber1: " + phoneNumber1.value + "phoneNumber2: " + phoneNumber2.value + " phoneNumber3: " + phoneNumber3.value + " phoneNumber.value.length:" + phoneNumber.value.length);
        var rnd = Math.floor(Math.random() * 1000);

        var data = {
            "user": {
                "login": phoneNumber.value + "1",
                "password": QConfig.password,
                "email": phoneNumber.value + "1" + "@curandus.com",
                "full_name": firstName.value + " " + lastName.value,
                "phone": phoneNumber.value,
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
                console.log("User Created");
                return resp.json();
            })
            .then(function(json) {
                visibility1.value = "Visible";
                console.log(JSON.stringify(json));


                if (json.user) {
                    chatUserId = json.user.id;
                    registerFunc();

                } else if (json.errors.email[0] == "has already been taken." || json.errors.login[0] == "has already been taken.") {
                    console.log("has already been taken");


                    fetch('https://api.quickblox.com/users/by_login.json?login=' + phoneNumber.value + "1", {
                            method: 'GET',
                            headers: {
                                'QuickBlox-REST-API-Version': "0.1.0",
                                'QB-Token': sessionObj.token
                            }
                        })
                        .then(function(resp) {
                            console.log("User Found!");
                            console.log(JSON.stringify(resp));
                            return resp.json();
                        })
                        .then(function(json) {
                            visibility1.value = "Visible";
                            console.log('JSON POSTOI:' + JSON.stringify(json));

                            chatUserId = json.user.id;
                            registerFunc();


                        })
                        .catch(function(err) {
                            visibility1.value = "Collapsed";
                            console.log('Errorwwww');
                            console.log(JSON.stringify(err));
                        });
                }
            })
            .catch(function(err) {
                visibility1.value = "Collapsed";
                console.log('Errorrrrr');
                console.log(JSON.stringify(err));
            });
    } //end if 
    else {

        if (phoneNumber.value.length != '10') {
            //console.log ("Invalid phoneNumber");
            myToast.toastIt("Invalid phoneNumber");
        }
        if (firstName.value == "" || lastName.value == "") {
            //console.log ("All fields are required");
            myToast.toastIt("All fields are required");
        }
    }

}

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

function registerFunc() {



    //Replace this when sms-service is defined
    //var aCode = Math.floor(Math.random() * 900000) + 100000;
    //var aCode = 111111;
    var aCode = 565656;

    register = {
        "firstName": firstName.value,
        "lastName": lastName.value,
        "phone": phoneNumber.value,
        "deviceId": Device.UUID,
        "chatId": chatUserId,
        "activationCode": aCode,
        "status": 0,
        "regId": p_reg_id.value,
        "notificationEnabled": 1

    }
    visibility1.value = "Visible";
    fetch(activeUrl.URL + "/curandusproject/webapi/api/insertprovider/securityToken=" + securityToken, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json',
        body: JSON.stringify(register)
    }).then(function(response) {
        status = response.status; // Get the HTTP status code
        console.log('status', status);
        response_ok = response.ok; // Is response.status in the 200-range?
        return response.json(); // This returns a promise

    }).then(function(responseObject) {
        visibility1.value = "Visible";
        console.log("Success");
        var text = "The Activation code is: " + aCode;
        sendSms(phoneNumber.value, aCode);

        router.push("ActivationPage", {
            register: register
        });
        visibility1.value = "Collapsed";
    }).catch(function(err) {
        visibility1.value = "Collapsed";
        console.log("Error", err.message);
    });

}

function sendSms(phone, text) {
    fetch(activeUrl.URL + "/curandusproject/webapi/api/sendsms/to=+1" + phone + "&body=" + text + "&securityToken=" + securityToken, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json'
    }).then(function(response) {
        return response.json(); // This returns a promise
    }).then(function(responseObject) {
        console.log("Success");
    }).catch(function(err) {
        console.log("Error", err.message);
    });
}

module.exports = {
    register: register,
    firstName: firstName,
    lastName: lastName,
    signUp: signUp,
    registerFunc: registerFunc,
    phoneNumber1: phoneNumber1,
    phoneNumber2: phoneNumber2,
    phoneNumber3: phoneNumber3,
    ValidatePassKey: ValidatePassKey,
    editMode1: editMode1,
    editMode2: editMode2,
    editMode3: editMode3,
    PhoneNumberColor: PhoneNumberColor,
    visibility1: visibility1,
    visibility: visibility,
    load: load
};
