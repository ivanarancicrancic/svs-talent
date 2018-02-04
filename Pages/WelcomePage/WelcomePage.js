var Storage = require("FuseJS/Storage");
var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var Modal = require('Modal');
var myToast = require("myToast");
var Device = require('Device');

var DevicePom = require('Device');
var p_patientID = "";
var device_proba;
var isAgree = Observable(false);
var p_reg_id = Observable();
var SendMessage = require('Scripts/SendMessage.js');
var SendNotification = require('Scripts/SendNotification.js');
var User = "";
var Lifecycle = require('FuseJS/Lifecycle');
var push = require("FuseJS/Push");
var vibration = require('FuseJS/Vibration');
var providerchatid = Observable();
var p_notification_enabled = Observable();
var p_regId = Observable();

Storage.read("patientInfo").then(function(content) {
    User = JSON.parse(content);
}, function(error) {});

var hasNotification = Observable(false);

Storage.write("notification", "welcome");

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
    console.log(" payloaddddddddddddd wo welcome page " + payload);

    console.log(" fromNotificationBar wo welcome page " + fromNotificationBar);
    Storage.read("patientInfo").then(function(content) {
        User = JSON.parse(content);
    }, function(error) {});


    if (User.notificationEnabled == 1 || User.NotificationEnabled == 1) {
        if (fromNotificationBar == true) {
            // push.clearAllNotifications();
            hasNotification.value = true;
            //myToast.toastIt("Stigna vo welcome page ");
            //vibration.vibrate(0.8);
            //console.log("Recieved Push NotificaNotificationtion vo welcome page: " + payload);
            Storage.write("notification_previous", "welcome");
            Storage.write("notification", "main");
            // console.log("Idi vo SendImagePage " + JSON.parse((JSON.parse(payload)).notification).alert);
            var json_poraka = JSON.parse((JSON.parse(payload)).notification).alert;
            //console.log(" console.log(JSON.parse(JSON.stringify(json_poraka)).row); " + json_poraka);
            if (JSON.parse(JSON.stringify(json_poraka)).row != undefined) {
                var label = (JSON.parse(JSON.stringify(json_poraka)).row).label;
                //console.log("Pred ifovi label" + label);
                if (label == "Blood Pressure") {
                    router.goto("BloodPressure", {
                        "treatmentitemlist": JSON.parse(JSON.stringify(json_poraka)).row
                    });
                } else if (label == "Temperature") {
                    router.goto("Temperature", {
                        "treatmentitemlist": JSON.parse(JSON.stringify(json_poraka)).row
                    });
                } else if (label == "Pain") {
                    router.goto("PainLevel", {
                        "treatmentitemlist": JSON.parse(JSON.stringify(json_poraka)).row
                    });
                } else if (label == "Heart rate") {
                    router.goto("HeartRate", {
                        "treatmentitemlist": JSON.parse(JSON.stringify(json_poraka)).row
                    });
                } else if (label == "Send Image") {
                    router.goto("SendImagePage", {
                        "treatmentitemlist": JSON.parse(JSON.stringify(json_poraka)).row
                    });
                } else if (label == "Comparison With Picture") {
                    var parsData = JSON.parse(JSON.parse(JSON.parse(JSON.stringify(json_poraka)).row.renderingInfo));
                    Storage.write("patientRoomId", RoomId.value);
                    router.goto("ShowImageCompared", {
                        "num": Math.random(),
                        "data": parsData,
                        "treatmentitemlist": JSON.parse(JSON.stringify(json_poraka)).row,
                        "treatmentitemlistId": JSON.parse(JSON.stringify(json_poraka)).row.treatmentItemListId,
                        "RoomId": JSON.parse(JSON.stringify(json_poraka)).row.roomId
                    });
                } else if (label == "X Percription" || label == "Diet" || label == "Activity" || label == "Hygiene" || label == "Other Instructions") {
                    //console.log("vleze vo skip vo if ");
                    // router.push("chat", {
                    //     odwelcome: JSON.parse((JSON.parse(payload)).notification).alert
                    // });
                    skip(JSON.parse(JSON.stringify(json_poraka)).row);
                }
                // router.push("SendImagePage", {
                //     "treatmentitemlist": JSON.parse(JSON.stringify(json_poraka)).row
                // });
            } else {
                Storage.write("notification", "chat");
                router.push("chat", {
                    odwelcome: JSON.parse((JSON.parse(payload)).notification).alert,
                    obj: Math.random()
                });
            }
            push.clearAllNotifications();
        } else {
            console.log(" payloaddddddddddddd " + payload);
        }
    }
});



function skip(arg) {
    //console.log("vleze vo skip");
    var label = arg.label;
    var text = "";
    var textYes = "";
    var textNo = "";
    //console.log("arg " + arg);

    if (label == "Diet") {
        //console.log("labelata " + arg.data.label);
        var diet = JSON.parse(JSON.parse(arg.renderingInfo));
        text = "Did you follow advices for diet: " + diet.diet + "?";
        textYes = "Followed advice for diet.";
        textNo = " Not Followed advice for diet.";
    } else if (label == "Activity") {
        //console.log("labelata " + arg.data.label);
        var activity = JSON.parse(JSON.parse(arg.renderingInfo));
        text = "Did you follow advices for activity: " + activity.activity + "?"
        textYes = "Followed advice for activity.";
        textNo = " Not Followed advice for activity.";
    } else if (label == "Hygiene") {
        //console.log("labelata " + arg.data.label);
        var hygiene = JSON.parse(JSON.parse(arg.renderingInfo));
        text = "Did you follow advices for hygiene: " + hygiene.hygiene + "?"
        textYes = "Followed advice for hygiene.";
        textNo = " Not Followed advice for hygiene.";
    } else if (label == "X Percription") {

        var medicine = JSON.parse(JSON.parse(arg.renderingInfo));
        //console.log("labelata " + medicine);
        text = "Did you take " + medicine.medicinename + "?";
        textYes = "Medicine " + medicine.medicinename + " taken.";
        textNo = " Medicine " + medicine.medicinename + " not taken.";
    } else {
        var instructions = JSON.parse(JSON.parse(arg.renderingInfo));
        text = "Did you follow advices for other instructions: " + instructions.otherinstruction + "?"

        textYes = "Followed advices for other instructions.";
        textNo = "Not followed advices for other instructions.";
    }
    // var url = activeUrl.URL + "/curandusproject/webapi/api/GetProviderDataByChatId/chatid=" + arg.providerChatId;
    // fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     dataType: 'json'
    // }).then(function(response) {
    //     response_ok = response.ok; // Is response.status in the 200-range?
    //     return response.json(); // This returns a promise
    // }).then(function(responseObject) {
    //     p_notification_enabled.value = responseObject.notificationEnabled;
    //     p_regId.value = responseObject.regId;
    //     console.log("providerchatid.value  " + JSON.stringify(responseObject));

    //     console.log("p_regId.value " + p_regId.value);

    //     console.log("arg.providerChatId " + arg.providerChatId);

    // }).catch(function(err) {
    //     console.log("Error getPatientsData()", err.message);
    // });




    Modal.showModal(
        " ",
        text, ["Yes", "No"],
        function(s) {
            // console.log("s" + s)
            if (s == "Yes") {
                var responseInfo = {
                    "response": s
                }
                var data = {
                    "createdBy": arg.createdBy,
                    "status": "DONE",
                    "treatmentItemListId": arg.treatmentItemListId,
                    "created": arg.created,
                    "modifiedBy": arg.modifiedBy,
                    "responseInfo": JSON.stringify(responseInfo)
                };
                //////////////////
                //fetch
                //Panel1Visibility.value = "Visible";

                fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + arg.treatmentItemListId, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    dataType: 'json',
                    body: JSON.stringify(data)
                }).then(function(response) {
                    status = response.status; // Get the HTTP status code
                    console.log('status', status);
                    return response.json(); // This returns a promise
                }).then(function(responseObject) {
                    // Panel1Visibility.value = "Visible";
                    console.log("Success");
                    SendMessage.createSession(arg.roomId, textYes);

                    if (p_notification_enabled.value == 1) {
                        SendNotification.sendPushNotification(
                            User.FirstName + " " + User.LastName,
                            textYes,
                            textYes,
                            "Curandus",
                            arg.regId,
                            arg.roomId,
                            User.FirstName + " " + User.LastName,
                            User.ChatId);
                    }

                    goToMain();

                    // initload();
                    //console.log("responseObject= " + JSON.stringify(responseObject));
                }).catch(function(err) {
                    console.log("Error", err.message);
                    //Panel1Visibility.value = "Collapsed";
                });
                /////////////////

                //console.log("tuka vo if");
                // statusFunc(item.data.treatmentItemListId);
            } //if s=YES
            else {

                var responseInfo = {
                    "response": s
                }
                var data = {
                    "createdBy": arg.createdBy,
                    "status": "DONE",
                    "treatmentItemListId": arg.treatmentItemListId,
                    "created": arg.created,
                    "modifiedBy": arg.modifiedBy,
                    "responseInfo": JSON.stringify(responseInfo)
                }

                //////////////////
                //fetch
                //Panel1Visibility.value = "Visible";

                fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + arg.treatmentItemListId, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    dataType: 'json',
                    body: JSON.stringify(data)
                }).then(function(response) {
                    status = response.status; // Get the HTTP status code
                    //console.log('status', status);
                    return response.json(); // This returns a promise
                }).then(function(responseObject) {
                    //Panel1Visibility.value = "Visible";
                    console.log("Success");
                    SendMessage.createSession(arg.roomId, textNo);

                    if (p_notification_enabled.value == 1) {
                        SendNotification.sendPushNotification(
                            User.FirstName + " " + User.LastName,
                            textNo,
                            textNo,
                            "Curandus",
                            arg.regId,
                            arg.roomId,
                            User.FirstName + " " + User.LastName,
                            User.ChatId);
                    }

                    goToMain();
                }).catch(function(err) {
                    console.log("Error", err.message);
                    //Panel1Visibility.value = "Collapsed";
                });
            }
        });
}


// continueFlag.value="gray";
isLogged();


function toogleIsAgree() {
    // device_proba = Device.UUID;
    // myToast.toastIt(" device_proba " + device_proba);
    isAgree.value = !isAgree.value;

    // if(isAgree.value=="false"){
    //     continueFlag.value="gray";
    // }
    // else{
    //     continueFlag.value="primary";
    // }
}

function isLogged() {
    console.log("is logged povikana: " + Storage.readSync("patientInfo"));
    Storage.read("patientInfo").then(function(content) {
        User = JSON.parse(content);
        console.log("User " + JSON.stringify(User));
        console.log("content vo welcome " + content);
        // p_patientID = Storage.readSync("patientInfo");
        p_patientID = User.PatientId;
        // //debug_log("Registered");

        console.log("procitaj od storage " + JSON.stringify(p_patientID));

        goToMain();
    }, function(error) {
        // //debug_log("Not Registered");
        // goToLogin();
    });


    //console.log("procitaj od storage " + p_patientID);

}

function Continue() {
    // console.log(isAgree.value);
    if (isAgree.value == true) {
        //     // isLogged();
        //     device_proba = Device.UUID;
        //     device_proba = Device.UUID;
        //     device_proba = Device.UUID;
        //     device_proba = Device.UUID;
        //     if (device_proba == null || device_proba == "0000") {
        //         myToast.toastIt(" Please add permision for telephone " + device_proba);
        //         router.goto("login", {
        //             "regid": p_reg_id.value
        //         });
        //     } else {
        //         router.goto("login", {
        //             "regid": p_reg_id.value
        //         });
        //     }
        
         fetch(activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken", {
                                        method: 'POST',
                                        headers: {
                                            "Content-type": "application/json"
                                        },
                                        dataType: 'json'
                                    }).then(function(response) {
                                        status = response.status; // Get the HTTP status code
                                        response_ok = response.ok; // Is response.status in the 200-range?
                                        //return response.json(); // This returns a promise
                                        // Storage.write("securityToken", response.json());
                                          Storage.write("securityToken", JSON.stringify(resp));                                  
                                           router.goto("login", {
                                           "regid": p_reg_id.value
                                          });
                                        }).catch(function(err) {
                                        console.log("Error genSecToken?", err.message);
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
    router.goto("main", tmp);
}

module.exports = {
    toogleIsAgree: toogleIsAgree,
    isAgree: isAgree,
    goToTerms: goToTerms,
    Continue: Continue
        // continueFlag:continueFlag

};
/*setTimeout(function() {
    isLogged();
}, 1500);*/
