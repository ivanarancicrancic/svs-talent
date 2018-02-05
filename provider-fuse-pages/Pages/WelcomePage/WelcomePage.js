var Storage = require("FuseJS/Storage");
var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var myToast = require("myToast");
var p_patientID = "";
var isAgree = Observable(false);
var p_reg_id = Observable();

var User = "";
var Lifecycle = require('FuseJS/Lifecycle');
var push = require("FuseJS/Push");
var vibration = require('FuseJS/Vibration');

var hasNotification = Observable(false);

Storage.write("notification", "welcome");
var url1 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken";

console.log("BEFORE CALL generateSecurityToken!");
fetch(url1, {
    method: 'GET',
    headers: {
        "Content-type": "application/json"
    },
    dataType: 'json'
}).then(function(response) {
    console.log("Vleze vo console log");
    status = response.status; // Get the HTTP status code
    response_ok = response.ok; // Is response.status in the 200-range?
    return response.json(); // This returns a promise
}).then(function(data) {
    console.log("SECURITY TOKEN GENERATED ADN SAVED!");
    console.log("responseObject data: " + data);
    var tokenInfo = Observable();
    tokenInfo.value = data;
    Storage.write("securityToken", JSON.stringify(tokenInfo.value));



    // Storage.write("securityToken", securityToken));
}).catch(function(err) {
    console.log("Fetch data error");
    console.log(err.message);
});





Lifecycle.on("enteringForeground", function() {
    console.log("on enteringForeground");
    //stateApp.value = "background";
});

Lifecycle.on("enteringInteractive", function() {
    console.log("on enteringInteractive");
    setTimeout(function() {
        Storage.read("notification_previous").then(function(content) {
            if (hasNotification.value == false) {
                console.log("notification vo enteringInteractive : " + content);
                Storage.write("notification", content);
            } else {
                hasNotification.value = false;
            }
            // Storage.write("notification_previous", "welcome");
            // console.log("notification_previous", "welcome");
        }, function(error) {
            console.log("error vo citanje od storage");
        });

    }, 1000);
});

Lifecycle.on("exitedInteractive", function() {
    Storage.read("notification").then(function(content) {
        console.log("notification_previous exitedInteractive: " + content);
        Storage.write("notification_previous", content);
        Storage.write("notification", "welcome");
        console.log("on exitedInteractive");
    }, function(error) {
        console.log("error vo citanje od storage");
    });
});

Lifecycle.on("enteringBackground", function() {
    console.log("on enteringBackground");
});
Lifecycle.on("stateChanged", function(newState) {
    console.log("on stateChanged " + newState);
});
// var continueFlag = Observable();
push.on("registrationSucceeded", function(regID) {
    console.log("regID " + regID);
    p_reg_id.value = regID;
});

push.on("error", function(reason) {
    console.log("Reg Failed: " + reason);
});

push.on("receivedMessage", function(payload, fromNotificationBar) {
    if (fromNotificationBar == true) {
        push.clearAllNotifications();
        hasNotification.value = true;
        //myToast.toastIt("Stigna vo welcome page ");
        //vibration.vibrate(0.8);
        console.log("Recieved Push NotificaNotificationtion vo welcome page: " + payload);
        Storage.write("notification_previous", "welcome");
        Storage.write("notification", "chat");
        router.push("chat", {
            odwelcome: JSON.parse((JSON.parse(payload)).notification).alert
        });
    }
});

// continueFlag.value="gray";
isLogged();


function toogleIsAgree() {
    isAgree.value = !isAgree.value;

    // if(isAgree.value=="false"){
    //     continueFlag.value="gray";
    // }
    // else{
    //     continueFlag.value="primary";
    // }
}

function isLogged() {
    console.log("is logged povikana: " + Storage.readSync("userInfo"));
    Storage.read("userInfo").then(function(content) {
        User = JSON.parse(content);
        console.log("User " + JSON.stringify(User));
        console.log("content vo welcome " + content);
        // p_patientID = Storage.readSync("patientInfo");
        //p_patientID = User.PatientId;
        // //debug_log("Registered");

        //console.log("procitaj od storage " + JSON.stringify(p_patientID));

        goToMain();
    }, function(error) {
        // //debug_log("Not Registered");
        // goToLogin();
    });

}

function Continue() {
    console.log(isAgree.value);
    if (isAgree.value == true) {
        // isLogged();





        router.goto("login", {
            "regid": p_reg_id.value
        });
    } else
    if (isAgree.value == false) {
        myToast.toastIt("You must agree with the Terms and Conditions")
    }
}

function goToLogin() {
    router.goto("login", {
        "regid": p_reg_id.value
    });
}

function goToTerms() {
    router.push("Terms");
}

function goToMain() {
    var tmp = {
        "num": Math.random()
    };
    router.goto("main", {
        odwelcome: tmp
    });
}

module.exports = {
    toogleIsAgree: toogleIsAgree,
    isAgree: isAgree,
    goToTerms: goToTerms,
    Continue: Continue
        // continueFlag:continueFlag

};
