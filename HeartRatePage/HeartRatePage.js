var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var SendMessage = require("Scripts/SendMessage.js");
var myToast = require("myToast");
var Modal = require('Modal');
var response = Observable(80.0);
var item;
var RoomId = Observable();
var visibility = Observable("Collapsed");
var color = Observable("#00BCD4");
var load = Observable("Saving...");
var SendNotification = require('Scripts/SendNotification.js');
var RegId = Observable();
var Storage = require("FuseJS/Storage");
var User = {};

this.onParameterChanged(function(param) {
    Storage.read("patientInfo").then(function(content) {
        User = JSON.parse(content);
        console.log("JSON.stringify(User));  " + JSON.stringify(User));
    }, function(error) {});

    console.log("param: " + JSON.stringify(param));
    item = param.treatmentitemlist;
    RoomId.value = param.treatmentitemlist.roomId;
    RegId.value = param.treatmentitemlist.regId;
    console.log("item objektot: " + JSON.stringify(param.treatmentitemlist));
});

function goToMain() {
    router.goto("main");
}

function changed() {
    if (response.value > 90) {
        color.value = "#c60031";
    } else if (response.value < 90) {
        color.value = "#00BCD4";
    }
}


function save() {

    console.log("RESPONSE=" + response.value);
    if (response.value == null || response.value == null || response.value == "" || response.value == "") {
        // if (response.value == "" || response.value == "undefined" || response.value == null) {
        console.log("Please enter a value");
        myToast.toastIt("Please enter a value!");
    } else {
        saveFunc();
    }
}


var buttontext = Observable(function() {
    return response.value.toFixed(0)
});


function saveFunc() {

    console.log("save func");
    console.log("response input " + response.value);

    var obj = {
        "num": Math.random()
    }

    console.log("pulse " + JSON.stringify(obj));

    var responseInfo = {
        "response": response.value.toFixed(0)
    }

    var data = {
        "createdBy": item.createdBy,
        "status": "DONE",
        "treatmentItemListId": item.treatmentItemListId,
        "created": item.created,
        "modifiedBy": item.modifiedBy,
        "responseInfo": responseInfo.response
    }
    console.log("data objektot " + JSON.stringify(responseInfo));

    visibility.value = "Visible";


    fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + data.treatmentItemListId, {
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
        visibility.value = "Visible";
        console.log("Success heart rate. ");
        console.log(JSON.stringify(responseObject));

        SendMessage.createSession(RoomId.value, "Heart rate measured: " + responseObject.responseInfo);


        console.log("item.notificationEnabled  " + item.notificationEnabled);
        if (item.notificationEnabled == 1) {

            SendNotification.sendPushNotification(
                User.FirstName + " " + User.LastName,
                "Heart rate measured: " + responseObject.responseInfo,
                "Heart rate measured: " + responseObject.responseInfo,
                "Curandus",
                RegId.value,
                RoomId.value,
                User.FirstName + " " + User.LastName,
                User.ChatId);
        }

        router.goto("main", JSON.stringify(obj));

    }).catch(function(err) {
        console.log("Error", err.message);
        visibility.value = "Collapsed";
    });
}


module.exports = {
    response: response,
    save: save,
    item: item,
    visibility: visibility,
    buttontext: buttontext,
    changed: changed,
    color: color,
    load: load
};