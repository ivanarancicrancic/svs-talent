var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var Storage = require("FuseJS/Storage");
var securityToken1 = Storage.readSync("securityToken1");
var myToast = require("myToast");
var inputCodeParam = "";
var load = Observable("Please wait...");
var register = Observable();
var phone_obj = Observable();
var inputCode = Observable();

var visibility1 = Observable("Collapsed");
var visibility = Observable("Visible");

this.onParameterChanged(function(param) {
    console.log("We should now display user with id: " + JSON.stringify(param.register));
    register.value = param.register;
    inputCodeParam = register.value.activationCode;

});

function goToMain() {
    var tmp = {
        "num": Math.random()
    };
    router.goto("main", {
        odwelcome: tmp
    });
}

function goBack() {
    router.goBack();
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
    console.log("Security token to be sent to /api/sendsms is: " + securityToken1);
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

    if (inputCodeParam == inputCode.value) {
        // console.log("Token: " + securityToken.value);
        var url = activeUrl.URL + "/curandusproject/webapi/api/CheckProviderActivationKey/" + register.value.deviceId + "&&" + register.value.phone + "&&" + register.value.activationCode;

        console.log("url " + url);
        visibility1.value = "Visible";
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                'securityToken1': securityToken1
            },
            dataType: 'json'
        }).then(function(response) {
            status = response.status; // Get the HTTP status code
            response_ok = response.ok; // Is response.status in the 200-range?
            return response.json(); // This returns a promise
        }).then(function(responseObject) {
            visibility1.value = "Visible";
            if (responseObject.providerId) {
                var userInfo = Observable();
                userInfo.value = responseObject;
                visibility1.value = "Visible";
                Storage.write("userInfo", JSON.stringify(userInfo.value));
                // Storage.write("securityToken", securityToken));


                var url1 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken2";
                phone_obj = {
                    "phone": register.value.phone,
                    "userType": "provider",

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
                    goToMain();
                    // Storage.write("securityToken", securityToken));
                }).catch(function(err) {
                    console.log("Fetch data error");
                    console.log(err.message);
                });

            }
            console.log("Success");

        }).catch(function(err) {
            console.log("lol Error");
            console.log(err.message);
            visibility1.value = "Collapsed";
        });
    } else {
        myToast.toastIt("Invalid code");
    }
}

module.exports = {
    checkData: checkData,
    goToMain: goToMain,
    resendCode: resendCode,
    sendSms: sendSms,
    goBack: goBack,
    inputCode: inputCode,
    visibility1: visibility1,
    visibility: visibility,
    load: load
};