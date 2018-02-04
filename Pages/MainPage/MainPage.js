var Observable = require("FuseJS/Observable");
var Modal = require('Modal');
var myToast = require("myToast");

var activeUrl = require("Constants/SERVICE_URL.js");
var Storage = require("FuseJS/Storage");
var securityToken = Storage.readSync("securityToken");

var errorMessage = Observable();
var providername = Observable("your doctor ");
var isLoading = Observable(false);
var templejt = Observable();
var sesija = Observable();
//var patientId = Observable();
var firstID = 0;
var lastID = 0;
var load = Observable("Loading treatments...");
var patientid = ""; //JSON.parse(Storage.readSync("patientInfo")); //'239'; 
var User = "";
var responseInfo1 = Observable();
var SendMessage = require('Scripts/SendMessage.js');
var RoomId = Observable();
var response1 = Observable();
var treatmentitemlistId = Observable();
var stateApp = Observable("active");
var Panel1Visibility = Observable("Collapsed");
//var push = require("FuseJS/Push");
var registration_id = Observable();
var vibration = require('FuseJS/Vibration');
var hasNotification = Observable("false");
var push = require("FuseJS/Push");
var providerChatId = Observable();

var currentPage = Observable("page1");
var hasChange = Observable(0);

var SendNotification = require('Scripts/SendNotification.js');
var RegId = Observable();
var User = {};
var scrollPos = Observable([0, 80]);
Storage.read("sesijaQuickblox").then(function(content) {
    console.log("content " + content);
    sesija.value = content;
}, function(error) {
    console.log("eror vo storage " + error.message);
});


// push.on("registrationSucceeded", function(regID) {
//     console.log("regID " + regID);
// });

// push.on("error", function(reason) {
//     console.log("Reg Failed: " + reason);
// });


push.on("receivedMessage", function(payload, fromNotificationBar) {
    console.log(" payloaddddddddddddd wo main page " + payload);
    if (fromNotificationBar == false) {
        Storage.read("patientInfo").then(function(content) {
            User = JSON.parse(content);
        }, function(error) {});

        if (User.notificationEnabled == 1 || User.NotificationEnabled == 1) {
            Storage.read("notification").then(function(content) {
                console.log("kade da prakja notification: " + content);
                if (content == "main") {
                    console.log("primanje notifikacija vo timeline");
                    console.log("currentPage.value " + currentPage.value);
                    console.log(" json poraka " + JSON.parse(JSON.parse((JSON.parse(payload)).notification).alert).row);
                    var push_from = JSON.parse((JSON.parse(payload)).notification).alert.from;
                    if (currentPage.value == "page1") { // || (currentPage.value == "page2")) {
                        if (push_from == "Curandus") {
                            initload();
                        }
                        myToast.toastIt(JSON.parse((JSON.parse(payload)).notification).alert.title + ":  " + (JSON.parse(payload)).message);
                        vibration.vibrate(0.8);
                        console.log("Recieved Push NotificaNotificationtion vo main page: " + payload);
                    } else if (currentPage.value == "page2") {
                        myToast.toastIt(JSON.parse((JSON.parse(payload)).notification).alert.title + ":  " + (JSON.parse(payload)).message);
                        hasChange.value = 1;
                    }
                }
            }, function(error) {
                console.log("error vo citanje od storage");
            });
        }
    }
});

//var LocalNotify = require("FuseJS/LocalNotifications");

// LocalNotify.on("receivedMessage", function(payload) {
//     console.log("Received Local Notification: " + payload);
//     LocalNotify.clearAllNotifications();

//     //LocalNotify.now("Boom!", "Just like that", "payload", true);
// });

function sendNow() {
    console.log("sendNow 4 sendNow 4 sendNow 4");
    Storage.write("notification", "main");
    //LocalNotify.later(2, "Finally!", "Push notififikacija!!!!", "hmm?", true);
}

function sendLater() {
    console.log("sendNow sendNow sendNow");
    //LocalNotify.now("Boom!" + Math.random(), "Just like that" + Math.random(), "payload" + Math.random(), true);
}


// toolbar function
function goBack() {
    router.goBack();
};



// toolbar function
function sendRequestForCall() {
    //console.log("This is the room id:"+RoomId.value);
    //console.log( "Request for call from patient: "+User.firstName+" "+User.lastName);
    if (providername.value == "your doctor ") {
        console.log("You dont have active treatment. " +
            "In case of emergency, call 911. If it is not emergency, call " + providername.value + "'s office");
        myToast.toastIt(" You dont have active treatment. " +
            "In case of emergency, call 911. If it is not emergency, call " + providername.value + "'s office");
    } else {
        Storage.read("sesijaQuickblox").then(function(content) {
            console.log("content " + content);
            sesija.value = content;
            var urlPatient =
                "https://api.quickblox.com/chat/Message.json?chat_dialog_id=" + RoomId.value + "&sender_id=28505875&message[ctn]=Request&read_ids[nin]=" + providerChatId.value;
            console.log("urlPatient " + urlPatient);
            fetch(urlPatient, {
                method: 'GET',
                headers: {
                    'QB-Token': content
                }
            }).then(function(response) {
                return response.json(); // This returns a promise
            }).then(function(contacts) {
                console.log(" Neprocitani " + (JSON.parse(JSON.stringify(contacts.items))).length);
                if ((JSON.parse(JSON.stringify(contacts.items))).length > 4) {
                    console.log(providername.value + " may not be able to answer your call. " +
                        "In case of emergency, call 911. If it is not emergency, call " + providername.value + "'s office");
                    myToast.toastIt(providername.value + " may not be able to answer your call. " +
                        "In case of emergency, call 911. If it is not emergency, call " + providername.value + "'s office");
                } else {
                    if (RoomId.value != null) {
                        SendMessage.createSession(RoomId.value, "Request for call");

                        setTimeout(function() {
                            console.log("time out");
                            SendNotification.sendPushNotification(
                                User.FirstName + " " + User.LastName,
                                "Request for call",
                                "Request for call",
                                "Curandus",
                                RegId.value,
                                RoomId.value,
                                User.FirstName + " " + User.LastName,
                                User.ChatId);
                        }, 1000);
                        console.log("Request for call was sent.");
                        myToast.toastIt("Request for call was sent.");
                    }
                }
            }).catch(function(err) {
                console.log(" error vo neprocitani poraki");
                console.log(err.message);
            });
        }, function(error) {
            console.log("eror vo storage " + error.message);
        });
    }
}


this.onParameterChanged(function(param) {

    // var Lifecycle = require('FuseJS/Lifecycle');
    // Lifecycle.on("enteringForeground", function() {
    //     console.log("on enteringForeground");
    // });
    // Lifecycle.on("enteringInteractive", function() {
    //     console.log("on enteringInteractive");
    // });
    // Lifecycle.on("exitedInteractive", function() {
    //     console.log("on exitedInteractive");
    // });
    // Lifecycle.on("enteringBackground", function() {
    //     console.log("on enteringBackground");
    // });
    // Lifecycle.on("stateChanged", function(newState) {
    //     console.log("on stateChanged " + newState);
    // });


    // push.on("registrationSucceeded", function(regID) {
    //     console.log("Reg Succeeded: " + regID);
    //     //registration_id.value = regID;
    // });

    // push.on("registrationSucceeded", function(regID) {
    //     console.log("Reg Succeeded: " + regID);
    //     registration_id.value = regID;
    // });

    // push.on("error", function(reason) {
    //     console.log("Reg Failed: " + reason);
    // });
    // push.on("receivedMessage", function(payload) {
    //     console.log("Recieved Push Notification: " + payload);
    //     vibration.vibrate(0.8);
    //     hasNotification.value = "true";
    //     //timeoet
    //     hasNotification.value = "false";
    // });
    Panel1Visibility.value = "Visible";
    if (param.comesfromchat) {
        initload();

        currentPage.value = "page2";

    } else {
        initload();
    }
    Storage.write("notification", "main");
    console.log("onParameterChanged vo  MAIN PAGE: " + JSON.stringify(param));
    // if (currentPage.value == "page1") {
    //     initload();
    // }
    Storage.read("patientInfo").then(function(content) {
        User = JSON.parse(content);
        name.value = User.firstName;
        surname.value = User.lastName;
        chronicDiseases.value = User.ChronicDiseases;
        allergies.value = User.Allergies;
        medicationsThatRecieves.value = User.MedicationsThatRecieves;
        additionalInnfo.value = User.AdditionalInnfo;
    }, function(error) {

    });
    Panel1Visibility.value = "Collapsed";


}); // end on param change


function endLoading() {
    isLoading.value = false;
}

function toolbarSearch() {
    console.log('da');
}

function initload() {
    Storage.read("patientInfo").then(function(content) {
        // console.log("povik**************88");
        User = JSON.parse(content);
        console.log("User " + JSON.stringify(User));
        //console.log("content vo main page " + content);
        // p_patientID = Storage.readSync("patientInfo");
        patientid = User.PatientId;

        Panel1Visibility.value = "Collapsed";

        fetch(activeUrl.URL + "/curandusproject/webapi/api/treatmentitemlist/patientid=" + patientid + "&securityToken=" +
            securityToken, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json"
                },
                dataType: 'json'
            }).then(function(response) {
            response_ok = response.ok; // Is response.status in the 200-range?
            return response.json(); // This returns a promise
            Panel1Visibility.value = "Visible";
        }).then(function(responseObject) {
                Panel1Visibility.value = "Visible";
                // Panel1Visibility.value = "Visible";
                console.log("Success");
                //console.log(JSON.stringify(responseObject));

                firstID = responseObject[0].treatmentItemListId;
                treatmentitemlistId.value = responseObject[0].treatmentItemListId;
                lastID = responseObject[responseObject.length - 1].treatmentItemListId;
                providerChatId.value = responseObject[0].providerChatId;
                providername.value = "DR. " + responseObject[0].providername;
                //   console.log(firstID, lastID);
                for (var i = 0; i < responseObject.length; i++) {

                    if (responseObject[i].responseInfo != null) {
                        var label = responseObject[i].label;
                        if (label == "Comparison With Picture" || label == "X Percription" || label == "Diet" || label == "Activity" || label == "Hygiene" || label == "Other Instructions") {

                            if (responseObject[i].responseInfo != null) {

                                responseObject[i].response1 = JSON.parse(responseObject[i].responseInfo).response;
                                //  response1.value = JSON.parse(responseObject[i].responseInfo).response;
                                // response1.value = JSON.parse(responseObject[i].responseInfo).response;


                            } else {
                                responseObject[i].response1 = null;
                                // responseObject[i].responseInfo = null;
                            }

                            responseObject[i].response1 = JSON.parse(responseObject[i].responseInfo).response;
                        } else if (label == "Send Image") {
                            //**** if response info containt image sent
                            if (responseObject[i].responseInfo != null) {
                                responseObject[i].responseInfoSendImage = "Image sent";
                            } else {
                                responseObject[i].responseInfoSendImage = null;
                            }
                        } else if (label == "Blood Pressure") {

                            if (responseObject[i].responseInfo != null) {

                                responseObject[i].responseBloodPressure = JSON.stringify(responseObject[i].responseInfo);
                                var systolic = JSON.parse(JSON.parse(responseObject[i].responseBloodPressure)).systolicNumber;
                                var diastolic = JSON.parse(JSON.parse(responseObject[i].responseBloodPressure)).diastolicNumber;
                                var response2 = systolic + "/" + diastolic;
                                responseObject[i].response2 = systolic + "/" + diastolic;

                            } else {
                                responseObject[i].response2 = null;
                                // responseObject[i].responseInfo = null;
                            }
                        }
                    }


                    var tmpDate = new Date(responseObject[i].timeScheduled);

                    var days = tmpDate.getDate();
                    var months = tmpDate.getMonth() + 1;
                    var year = tmpDate.getFullYear();
                    var hours = tmpDate.getHours();
                    if (hours == "00") {
                        hours = "23";
                    } else {
                        hours = hours - 1;
                    }
                    var min = tmpDate.getMinutes();

                    //var fullDate = ('0' + tmpDate.getDate()).slice(-2) + '.' + ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '.' + tmpDate.getFullYear();

                    var fullDate = ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tmpDate.getDate()).slice(-2) + '-' + tmpDate.getFullYear();
                    var fulltime = ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);

                    responseObject[i].fullDate = fullDate;
                    responseObject[i].fullTime = fulltime;
                    RoomId.value = responseObject[i].roomId;
                    RegId.value = responseObject[i].regId;
                    Storage.write("patientRoomId", responseObject[i].roomId);



                    //  console.log("Tuka treba da se kreiraat objektite: " + JSON.stringify(responseObject[i]));

                }
                templejt.replaceAll(responseObject);

                //console.log("User vo init load111 " + JSON.stringify(User));
                patientid = User.PatientId;
                //console.log("pacientID vo main page " + patientid);
                //console.log("LOAD");
                Panel1Visibility.value = "Collapsed";
            },
            function(error) {
                //debug_log("Not Registered");
                templejt.replaceAll([]);
                Panel1Visibility.value = "Collapsed";
                //console.log("404");
            });


    }).catch(function(err) {
        console.log("Error", err.message);

    }); // kraj na chitanje od storage
}


function loadMore() {

    console.log("LOAD");
    fetch(activeUrl.URL + "/curandusproject/webapi/api/treatmentitemlistscrollpatient/treatmentitemlistid=" + lastID + "&updown=D&range=10&securityToken=" + securityToken, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json'
    }).then(function(response) {
        response_ok = response.ok; // Is response.status in the 200-range?
        return response.json(); // This returns a promise
    }).then(function(responseObject) {
        console.log("Success");
        //console.log(JSON.stringify(responseObject));

        lastID = responseObject[responseObject.length - 1].treatmentItemListId;

        for (var i = 0; i < responseObject.length; i++) {

            if (responseObject[i].responseInfo != null) {
                var label = responseObject[i].label;
                // console.log("LABEL " + responseObject[i].label);
                if (label == "Comparison With Picture" || label == "X Percription" || label == "Diet" || label == "Activity" || label == "Hygiene" || label == "Other Instructions") {

                    if (responseObject[i].responseInfo != null) {

                        responseObject[i].response1 = JSON.parse(responseObject[i].responseInfo).response;


                    } else {
                        responseObject[i].response1 = null;
                        // responseObject[i].responseInfo = null;
                    }

                    responseObject[i].response1 = JSON.parse(responseObject[i].responseInfo).response;
                } else if (label == "Send Image") {
                    //**** if response info containt image sent
                    if (responseObject[i].responseInfo != null) {
                        responseObject[i].responseInfoSendImage = "Image sent";
                    } else {
                        responseObject[i].responseInfoSendImage = null;
                    }
                } else if (label == "Blood Pressure") {

                    if (responseObject[i].responseInfo != null) {



                        responseObject[i].responseBloodPressure = JSON.stringify(responseObject[i].responseInfo);

                        var systolic = JSON.parse(JSON.parse(responseObject[i].responseBloodPressure)).systolicNumber;
                        var diastolic = JSON.parse(JSON.parse(responseObject[i].responseBloodPressure)).diastolicNumber;

                        var response2 = systolic + "/" + diastolic;


                        responseObject[i].response2 = systolic + "/" + diastolic;

                    } else {
                        responseObject[i].response2 = null;
                        // responseObject[i].responseInfo = null;
                    }


                }

            }



            var tmpDate = new Date(responseObject[i].timeScheduled);

            var days = tmpDate.getDate();
            var months = tmpDate.getMonth() + 1;
            var year = tmpDate.getFullYear();
            var hours = tmpDate.getHours();

            if (hours == "00") {
                hours = "23";
            } else {
                hours = hours - 1;
            }
            var min = tmpDate.getMinutes();

            //var fullDate = ('0' + tmpDate.getDate()).slice(-2) + '.' + ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '.' + tmpDate.getFullYear();

            var fullDate = ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tmpDate.getDate()).slice(-2) + '-' + tmpDate.getFullYear();
            var fulltime = ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);

            responseObject[i].fullDate = fullDate;
            responseObject[i].fullTime = fulltime;



            templejt.add(responseObject[i])
        }

    }).catch(function(err) {
        console.log("Error", err.message);

    });
}


function loadMore1() {

    //console.log("LOAD111111");
    fetch(activeUrl.URL + "/curandusproject/webapi/api/treatmentitemlistscrollpatient/treatmentitemlistid=" + firstID + "&updown=U&range=10&securityToken=" + securityToken, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json'
    }).then(function(response) {
        response_ok = response.ok; // Is response.status in the 200-range?
        return response.json(); // This returns a promise
    }).then(function(responseObject) {
        console.log("Success");
        //console.log(JSON.stringify(responseObject));;
        if (responseObject.length == 10) {
            scrollPos.value = [0, 80];
        };
        firstID = responseObject[0].treatmentItemListId;

        for (var i = responseObject.length - 1; i >= 0; i--) {

            if (responseObject[i].responseInfo != null) {
                var label = responseObject[i].label;
                //console.log("LABEL " + responseObject[i].label);
                if (label == "Comparison With Picture" || label == "X Percription" || label == "Diet" || label == "Activity" || label == "Hygiene" || label == "Other Instructions") {

                    if (responseObject[i].responseInfo != null) {

                        responseObject[i].response1 = JSON.parse(responseObject[i].responseInfo).response;


                    } else {
                        responseObject[i].response1 = null;
                        // responseObject[i].responseInfo = null;
                    }

                    responseObject[i].response1 = JSON.parse(responseObject[i].responseInfo).response;
                } else if (label == "Send Image") {
                    //**** if response info containt image sent
                    if (responseObject[i].responseInfo != null) {
                        responseObject[i].responseInfoSendImage = "Image sent";
                    } else {
                        responseObject[i].responseInfoSendImage = null;
                    }
                } else if (label == "Blood Pressure") {

                    if (responseObject[i].responseInfo != null) {


                        responseObject[i].responseBloodPressure = JSON.stringify(responseObject[i].responseInfo);

                        var systolic = JSON.parse(JSON.parse(responseObject[i].responseBloodPressure)).systolicNumber;
                        var diastolic = JSON.parse(JSON.parse(responseObject[i].responseBloodPressure)).diastolicNumber;


                        var response2 = systolic + "/" + diastolic;


                        responseObject[i].response2 = systolic + "/" + diastolic;


                    } else {
                        responseObject[i].response2 = null;
                        // responseObject[i].responseInfo = null;
                    }


                }

            }

            var tmpDate = new Date(responseObject[i].timeScheduled);

            var days = tmpDate.getDate();
            var months = tmpDate.getMonth() + 1;
            var year = tmpDate.getFullYear();
            var hours = tmpDate.getHours();
            if (hours == "00") {
                hours = "23";
            } else {
                hours = hours - 1;
            }
            var min = tmpDate.getMinutes();

            var fullDate = ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tmpDate.getDate()).slice(-2) + '-' + tmpDate.getFullYear();
            // var fullDate = ('0' + tmpDate.getDate()).slice(-2) + '.' + ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '.' + tmpDate.getFullYear();
            var fulltime = ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);

            responseObject[i].fullDate = fullDate;
            responseObject[i].fullTime = fulltime;
            //**** if response info containt image sent
            /*   if (responseObject[i].responseInfo != null) {
                   responseObject[i].responseInfoSendImage = "Image sent";
               } else {
                   responseObject[i].responseInfoSendImage = null;
               }*/

            templejt.insertAt(0, responseObject[i])
        }


    }).catch(function(err) {
        console.log("Error", err.message);

    });
}

function setResponse(arg) {
    var label = arg.data.label;
    var time = arg.data.fullTime;
    var dateTreatment = new Date(arg.data.timeScheduled);
    var now = new Date();
    var patientTreatmentHours = dateTreatment.getHours();
    var nowDayMonth = now.getDate() + "" + now.getMonth();
    var patientTreatmentDayMonth = dateTreatment.getDate() + "" + dateTreatment.getMonth();
    var razlikaPast = 0;
    var razlikaFuture = 0;

    if (now > dateTreatment) {
        razlikaPast = (now.getTime() % dateTreatment.getTime()) / 3600000;
        console.log(" Pogolem e segasniot " + razlikaPast);
    } else {
        razlikaFuture = (dateTreatment.getTime() % now.getTime()) / 3600000;
        console.log(" Pogolem e od itemot " + razlikaFuture);
    }

    if (razlikaPast < 9 && razlikaFuture < 1) {
        console.log("Moze da se odgovara");

        if (label == "Blood Pressure") {
            router.goto("BloodPressure", {
                "treatmentitemlist": arg.data
            });
        } else if (label == "Temperature") {
            // router.goto("TempPulse");
            router.goto("Temperature", {
                "treatmentitemlist": arg.data
            });
        } else if (label == "Pain") { // here
            // router.goto("TempPulse");        // here
            router.goto("PainLevel", { // here
                "treatmentitemlist": arg.data // here
            });
        } else if (label == "Heart rate") {
            //console.log("hear rate");
            router.goto("HeartRate", {
                "treatmentitemlist": arg.data
            });

        } else if (label == "Send Image") {

            if ((arg.data.status == "FUTURE") || (arg.data.status == "EXPIRED")) {
                //  console.log("send image FUTURE");
                router.goto("SendImagePage", {
                    "treatmentitemlist": arg.data
                });

            } else if (arg.data.status == "DONE") {
                // console.log("send image DONE");
                if (arg.data.responseInfo != null) {
                    responseInfo1.value = "imageSent";
                }
                // console.log("labelata Image sent " + (arg.data.responseInfo));
                router.goto("ShowImage", {
                    "num": Math.random(),
                    "treatmentitemlist": arg.data
                });
            }
        } else if (arg.data.label == "Comparison With Picture") {
            var parsData = JSON.parse(JSON.parse(arg.data.renderingInfo));
            //console.log("Comparison With Picture seeResponse function: " + JSON.stringify(arg.data.treatmentItemListId));
            Storage.write("patientRoomId", RoomId.value);
            router.goto("ShowImageCompared", {
                "num": Math.random(),
                "data": parsData,
                "treatmentitemlist": arg.data,
                "treatmentitemlistId": arg.data.treatmentItemListId,
                "RoomId": RoomId.value
            });
            initload();

        } else if (label == "X Percription" || label == "Diet" || label == "Activity" || label == "Hygiene" || label == "Other Instructions") {
            skip(arg);
        }
    } else {
        console.log("The window to answer this question is closed ");
        myToast.toastIt("The window to answer this question is closed ");
    }
} // end function



function skip(arg) {
    var label = arg.data.label;
    var text = "";
    var textYes = "";
    var textNo = "";
    //console.log("medicine " + medicine.medicinename);
    if (label == "Diet") {
        //console.log("labelata " + arg.data.label);
        var diet = JSON.parse(JSON.parse(arg.data.renderingInfo));
        text = "Did you follow advices for diet: " + diet.diet + "?";
        textYes = "Followed advice for diet.";
        textNo = " Not Followed advice for diet.";
    } else if (label == "Activity") {
        //console.log("labelata " + arg.data.label);
        var activity = JSON.parse(JSON.parse(arg.data.renderingInfo));
        text = "Did you follow advices for activity: " + activity.activity + "?"
        textYes = "Followed advice for activity.";
        textNo = " Not Followed advice for activity.";
    } else if (label == "Hygiene") {
        //console.log("labelata " + arg.data.label);
        var hygiene = JSON.parse(JSON.parse(arg.data.renderingInfo));
        text = "Did you follow advices for hygiene: " + hygiene.hygiene + "?"
        textYes = "Followed advice for hygiene.";
        textNo = " Not Followed advice for hygiene.";
    } else if (label == "X Percription") {
        //console.log("labelata " + arg.data.label);
        var medicine = JSON.parse(JSON.parse(arg.data.renderingInfo));
        text = "Did you take " + medicine.medicinename + "?";
        textYes = "Medicine " + medicine.medicinename + " taken.";
        textNo = " Medicine " + medicine.medicinename + " not taken.";
    }
    //else if (label == "Comparison With Picture") {
    //     console.log("labelata comparision" + arg.data.label);
    //     var comparision = JSON.parse(JSON.parse(arg.data.renderingInfo));
    //     console.log("tekst " + comparision.comparisionquestion);
    //     text = "Did you compare?";
    //     textYes = "Compared with picture.";
    //     textNo = "Not comparison with picture.";
    // } 
    else {

        var instructions = JSON.parse(JSON.parse(arg.data.renderingInfo));
        text = "Did you follow advices for other instructions: " + instructions.otherinstruction + "?"

        textYes = "Followed advices for other instructions.";
        textNo = "Not followed advices for other instructions.";

    }



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
                    "createdBy": arg.data.createdBy,
                    "status": "DONE",
                    "treatmentItemListId": arg.data.treatmentItemListId,
                    "created": arg.data.created,
                    "modifiedBy": arg.data.modifiedBy,
                    "responseInfo": JSON.stringify(responseInfo)
                };
                //////////////////
                //fetch
                Panel1Visibility.value = "Visible";

                fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + arg.data.treatmentItemListId + "&securityToken=" + securityToken, {
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
                    Panel1Visibility.value = "Visible";
                    console.log("Success");
                    //console.log(JSON.stringify(responseObject));
                    // init();
                    //  router.goto("main", JSON.stringify(obj));
                    //RoomId.value = param.treatmentitemlist.roomId;
                    //console.log("Ova e roomid vo main page: "+param.treatmentitemlist.roomId);
                    SendMessage.createSession(RoomId.value, textYes);

                    if (arg.data.notificationEnabled == 1) {
                        SendNotification.sendPushNotification(
                            User.FirstName + " " + User.LastName,
                            textYes,
                            textYes,
                            "Curandus",
                            arg.data.regId,
                            RoomId.value,
                            User.FirstName + " " + User.LastName,
                            User.ChatId);
                    }

                    initload();
                    //console.log("responseObject= " + JSON.stringify(responseObject));
                }).catch(function(err) {
                    console.log("Error", err.message);
                    Panel1Visibility.value = "Collapsed";
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
                    "createdBy": arg.data.createdBy,
                    "status": "DONE",
                    "treatmentItemListId": arg.data.treatmentItemListId,
                    "created": arg.data.created,
                    "modifiedBy": arg.data.modifiedBy,
                    "responseInfo": JSON.stringify(responseInfo)
                }

                //////////////////
                //fetch
                Panel1Visibility.value = "Visible";

                fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + arg.data.treatmentItemListId + "&securityToken=" + securityToken, {
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
                    Panel1Visibility.value = "Visible";
                    console.log("Success");
                    //console.log(JSON.stringify(responseObject));
                    // init();
                    //  router.push("main", JSON.stringify(obj));
                    //console.log("This after update : - roomid: " + responseObject.roomId + " this is the text:" + textNo);
                    SendMessage.createSession(RoomId.value, textNo);

                    if (arg.data.notificationEnabled == 1) {
                        SendNotification.sendPushNotification(
                            User.FirstName + " " + User.LastName,
                            textNo,
                            textNo,
                            "Curandus",
                            arg.data.regId,
                            RoomId.value,
                            User.FirstName + " " + User.LastName,
                            User.ChatId);
                    }
                    initload();
                }).catch(function(err) {
                    console.log("Error", err.message);
                    Panel1Visibility.value = "Collapsed";
                });

                ///////////////


                //console.log("tuka vo else");
            }
        });
}


function NavigateBarTimeline() {
    console.log(" Navigation ");
    currentPage.value = "page1";
    if (hasChange.value == 1) {
        initload();
        hasChange.value = 0;
    }
}

function NavigateBarChat() {
    console.log(" Chat ");
    currentPage.value = "page2";
}

module.exports = {
    errorMessage: errorMessage,
    currentPage: currentPage,
    NavigateBarTimeline: NavigateBarTimeline,
    NavigateBarChat: NavigateBarChat,
    hasNotification: hasNotification,
    isLoading: isLoading,
    toolbarSearch: toolbarSearch,
    templejt: templejt,
    initload: initload,
    loadMore: loadMore,
    loadMore1: loadMore1,
    setResponse: setResponse,
    skip: skip,
    vibration: vibration,
    responseInfo1: responseInfo1,
    response1: response1,
    Panel1Visibility: Panel1Visibility,
    sendRequestForCall: sendRequestForCall,
    goBack: goBack,
    sendNow: sendNow,
    scrollPos: scrollPos,
    sendLater: sendLater,
    load: load
};
