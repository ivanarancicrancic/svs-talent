var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var myToast = require("myToast");
//var Modal = require('Modal');
var SendMessage = require("Scripts/SendMessage.js");
var Storage = require("FuseJS/Storage");
var securityToken = Storage.readSync("securityToken");
var response = Observable();
var item = Observable();
var RoomId = Observable();
var visibility = Observable("Collapsed");
var load = Observable("Saving...");

var SendNotification = require('Scripts/SendNotification.js');
var RegId = Observable();

var User = {};


this.onParameterChanged(function(param) {

    Storage.read("patientInfo").then(function(content) {
        User = JSON.parse(content);
        console.log("JSON.stringify(User));  " + JSON.stringify(User));
    }, function(error) {});

    // response.value = param.treatmentitemlist.responseInfo;
    console.log("podatok od main page " + JSON.stringify(param.treatmentitemlist));
    console.log("PARAMMMMMMM: " + JSON.stringify(param));
    item = param.treatmentitemlist;
    RegId.value = param.treatmentitemlist.regId;
    console.log("item objektot: " + JSON.stringify(param.treatmentitemlist));
    RoomId.value = param.treatmentitemlist.roomId;

});

function goToMain() {

    router.goto("main");
}

function save() {

    console.log("RESPONSE= " + response.value);
    if (response.value == "undefined" || response.value == null) {
        console.log("!!!!!!!!!!!!!!Please enter a value");
        myToast.toastIt("Please enter a value");
    } else {

        console.log("Success");
        saveFunc();
    }
}


function saveFunc() {

    var responseInfo = {
        "response": response.value
    }

    var obj = {
        //  "responseInfo": responseInfo.response,
        "num": Math.random(),
        "responseInfo": responseInfo.response
    }


    var data = {
        "createdBy": item.createdBy,
        "status": "DONE",
        "treatmentItemListId": item.treatmentItemListId,
        "created": item.created,
        "modifiedBy": item.modifiedBy,
        "responseInfo": responseInfo.response

    };

    visibility.value = "Visible";

    console.log("RESPONSE: " + response.value);

    fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + data.treatmentItemListId + "&securityToken=" + securityToken, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json',
        body: JSON.stringify(data)
    }).then(function(response) {
        visibility.value = "Visible";
        status = response.status; // Get the HTTP status code
        console.log('status', status);
        return response.json(); // This returns a promise
    }).then(function(responseObject) {
        visibility.value = "Visible";
        console.log("Success in pain level");
        console.log(JSON.stringify(responseObject));
        // goToMain();
        SendMessage.createSession(RoomId.value, "Pain level: " + responseObject.responseInfo);


        if (item.notificationEnabled == 1) {
            SendNotification.sendPushNotification(
                User.FirstName + " " + User.LastName,
                "Pain level: " + responseObject.responseInfo,
                "Pain level: " + responseObject.responseInfo,
                "Curandus",
                RegId.value,
                RoomId.value,
                User.FirstName + " " + User.LastName,
                User.ChatId);
        }

        router.goto("main", JSON.stringify(obj));
        // responseObject.responseInfo = "";
        response.value = "";
        console.log("na success" + JSON.stringify(responseObject.responseInfo));
    }).catch(function(err) {
        console.log("tuka vo Error");
        console.log("Error", err.message);
        visibility.value = "Collapsed";
    });

    console.log("api za update treatmentItemListId vrednost=" + data.treatmentItemListId);
}


module.exports = {
    save: save,
    saveFunc: saveFunc,
    response: response,
    item: item,
    visibility: visibility,
    load: load

};
