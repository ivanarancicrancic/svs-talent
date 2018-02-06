var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var SendMessage = require('Scripts/SendMessage.js');
var Storage = require("FuseJS/Storage");
var myToast = require("myToast");
var securityToken = Storage.readSync("securityToken");
var errorMessage = Observable();
var isLoading = Observable(false);
var SystolicNumber = Observable();
var DiastolicNumber = Observable();
var item = Observable();
var Modal = require('Modal');
var systolicNumber = Observable(120.0);
var diastolicNumber = Observable(80.0);
var RoomId = Observable();
var color = Observable("#00BCD4");
var color1 = Observable("#00BCD4");
var visibility = Observable("Collapsed");
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


    console.log("HI");
    console.log("podatok od main page " + JSON.stringify(param.treatmentitemlist));
    console.log("PARAMMMMMMM: " + JSON.stringify(param));
    item = param.treatmentitemlist;
    RoomId.value = param.treatmentitemlist.roomId;
    RegId.value = param.treatmentitemlist.regId;
    console.log("itemot " + JSON.stringify(item));
});

var buttontext = Observable(function() {
    return systolicNumber.value.toFixed(0)
});

var buttontext1 = Observable(function() {
    return diastolicNumber.value.toFixed(0)
});




function save() {
    // console.log("^^^^SystolicNumber  " + systolicNumber.value + "diastolicNumber " + diastolicNumber.value);
    if (systolicNumber.value == null || diastolicNumber.value == null || systolicNumber.value == "" || diastolicNumber.value == "") {
        // console.log("Please enter a value");
        myToast.toastIt("Please enter a value!");
        console.log("VNESETE GI SITE BROEVI!!!");

    } else if (diastolicNumber.value > systolicNumber.value) {
        // console.log("Please enter a value");
        myToast.toastIt("Systolic must be bigger than diastolic");

    } else {
        saveFunc();
    }
}

function saveFunc() {
    // console.log("save function");

    var responseInfo = {
        "systolicNumber": systolicNumber.value.toFixed(0),
        "diastolicNumber": diastolicNumber.value.toFixed(0)

    }


    var obj = {
        "num": Math.random(),
        "responseInfo": responseInfo
    }


    var data = {
        "createdBy": item.createdBy,
        "status": "DONE",
        "treatmentItemListId": item.treatmentItemListId,
        "created": item.created,
        "modifiedBy": item.modifiedBy,
        "responseInfo": JSON.stringify(responseInfo)

    };


    visibility.value = "Visible";

    fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + data.treatmentItemListId + "&securityToken=" + securityToken, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json',
        body: JSON.stringify(data)
    }).then(function(response) {

        status = response.status;
        return response.json();

    }).then(function(responseObject) {

        visibility.value = "Visible";
        console.log("Success " + JSON.stringify(responseObject));
        SendMessage.createSession(RoomId.value, "Blood preasure meansured: " + responseInfo.systolicNumber + "/" + responseInfo.diastolicNumber);

        if (item.notificationEnabled == 1) {
            SendNotification.sendPushNotification(
                User.FirstName + " " + User.LastName,
                responseInfo.systolicNumber + "/" + responseInfo.diastolicNumber,
                responseInfo.systolicNumber + "/" + responseInfo.diastolicNumber,
                "Curandus",
                RegId.value,
                RoomId.value,
                User.FirstName + " " + User.LastName,
                User.ChatId);
        }

        router.goto("main", JSON.stringify(obj));




    }).catch(function(err) {
        console.log("Error:");
        visibility.value = "Collapsed";

    });

    console.log("this is visible property: " + visibility.value);
}

module.exports = {
    save: save,
    saveFunc: saveFunc,
    diastolicNumber: diastolicNumber,
    systolicNumber: systolicNumber,
    item: item,
    visibility: visibility,
    buttontext: buttontext,
    buttontext1: buttontext1,
    color1: color1,
    color: color,
    load: load
};
