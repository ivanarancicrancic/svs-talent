var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var myToast = require("myToast");
var Storage = require("FuseJS/Storage");
var securityToken1 = Storage.readSync("securityToken1");
var QConfig = require('Scripts/quickbloxConfig.js');
var aCode = "";
var load = Observable("Please wait...");
var register = Observable();
var push = require("FuseJS/Push");

var inputCode = Observable();

var inputCodeParam = "";
var visibility1 = Observable("Collapsed");
var visibility = Observable("Visible");

this.onParameterChanged(function(param) {
    console.log("We should now display user with id: " + JSON.stringify(param.register));
    register.value = param.register;
    inputCodeParam = register.value.activationCode;
    createSession();
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

function signUp() {

    if (inputCode.value == inputCodeParam) {
        var rnd = Math.floor(Math.random() * 1000);

        var data = {
            "user": {
                "login": register.value.phone + "0",
                "password": QConfig.password,
                "email": register.value.phone + "0" + "@curandus.com",
                "full_name": register.value.firstName + " " + register.value.lastName,
                "phone": register.value.phone
            }
        }

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
                    checkData();

                } else if (json.errors.email[0] == "has already been taken." || json.errors.login[0] == "has already been taken.") {
                    console.log("has already been taken " + register.value.Phone);


                    fetch('https://api.quickblox.com/users/by_login.json?login=' + register.value.phone + "0", {
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
                            console.log('JSON POSTOI:' + JSON.stringify(json));
                            visibility1.value = "Visible";
                            chatUserId = json.user.id;
                            checkData();


                        })
                        .catch(function(err) {
                            console.log('Errorwwww');
                            console.log(JSON.stringify(err));
                            visibility1.value = "Collapsed";
                        });
                }
            })
            .catch(function(err) {
                console.log('Errorrrrr');
                console.log(JSON.stringify(err));
                visibility1.value = "Collapsed";
            });
    } else {
        myToast.toastIt("Invalid code");
    }
}



function goToMain() {
    var obj = {
        //  "responseInfo": responseInfo.response,
        "num": Math.random()
    }
    router.push("main", obj);
}

function resendCode() {
    console.log("funkcija za registracija!");
    //Replace this when sms-service is defined
    inputCodeParam = Math.floor(Math.random() * 900000) + 100000;
    //aCode = '111111';
    sendSms(register.value.phone, inputCodeParam);
    console.log("resend");
    // sendSms();
    //  sendSms(phone.value, text);
}

function sendSms(phone, text) {
    fetch(activeUrl.URL + "/curandusproject/webapi/api/sendsms/to=+1" + phone + "&body=" + text, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'securityToken1': securityToken1
        },
        dataType: 'json'
    }).then(function(response) {
        return response.json(); // This returns a promise
    }).then(function(responseObject) {
        console.log("Success");
        myToast.toastIt("Code has been sent");
    }).catch(function(err) {
        console.log("Error", err.message);
    });
}

function checkData() {
    console.log("povikaj ja checkData");
    console.log("input poleto= " + inputCode.value);
    console.log("aktivaciskiot kod= " + register.value.activationCode);


    if (inputCode.value == register.value.activationCode) {
        console.log("body " + JSON.stringify(register));
        //console.log("body " + JSON.stringify(register.value));

        // push.on("registrationSucceeded", function(regID) {
        //     console.log("Reg Succeeded: vo activation page" + regID);
        //     p_reg_id.value = regID;
        // });

        register.value.chatId = chatUserId;

        fetch(activeUrl.URL + "/curandusproject/webapi/api/insertpatient", {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                'securityToken1': securityToken1
            },
            dataType: 'json',
            body: JSON.stringify(register.value)

        }).then(function(response) {
            status = response.status; // Get the HTTP status code
            console.log('status', status);
            return response.json(); // This returns a promise

        }).then(function(responseObject) {
            console.log("Success");
            visibility1.value = "Visible";
            //   var text = "The Activation code is: " + aCode;
            // sendSms(phone.value, text);
            console.log("responseObject vo activation page" + JSON.stringify(responseObject));
            //  console.log("PatientId vo activation page" + JSON.stringify(responseObject.PatientId));

            // Storage.write("patientInfo", JSON.stringify(responseObject.PatientId));
            Storage.write("patientInfo", JSON.stringify(responseObject));



            /*  Storage.read("patientInfo").then(function(content) {
                console.log("povlekuvanje na informaciite od storage patientInfo: " + content);
            }, function(error) {
                console.log("nema nishto vo storage!");
            });
*/

            //goToMain(); //zakomentirano 25.05

            console.log("ACTIVATION PAGE - CHECKDATA() !!!! WITH PHONE VALUE: " + register.value.phone);
            var tmp = Math.random();
            var url1 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken2";
            phone_obj = {
                "phone": register.value.phone,
                "userType": "patient"
            }

            console.log("BEFORE CALL generateSecurityToken2!");
            fetch(url1, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    'securityToken1': securityToken1
                },
                dataType: 'json',
                body: JSON.stringify(phone_obj)

            }).then(function(response) {
                console.log("Vleze vo console log");
                status = response.status; // Get the HTTP status code
                response_ok = response.ok; // Is response.status in the 200-range?
                return response.json(); // This returns a promise
            }).then(function(data) {
                console.log("SECOND SECURITY TOKEN GENERATED AND SAVED!");
                console.log("responseObject data: " + data);
                var tokenInfo = Observable();
                tokenInfo.value = data;
                Storage.write("securityToken2", JSON.stringify(tokenInfo.value));
                router.goto("main", {
                    new: tmp
                });

                // Storage.write("securityToken", securityToken));
            }).catch(function(err) {
                console.log("Fetch data error");
                console.log(err.message);
            });





        }).catch(function(err) {
            console.log("Error", err.message);
            visibility1.value = "Collapsed";
        });
    } else {
        console.log("Invalid activation code!");
    }

}
module.exports = {
    checkData: checkData,
    goToMain: goToMain,
    sendSms: sendSms,
    signUp: signUp,
    resendCode: resendCode,
    createSession: createSession,
    inputCode: inputCode,
    visibility1: visibility1,
    visibility: visibility,
    load: load
};