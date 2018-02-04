var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var myToast = require("myToast");
var Modal = require('Modal');
var Storage = require("FuseJS/Storage");
var securityToken = Storage.readSync("securityToken");
var response = Observable(97.0);
var item = Observable();
var RoomId = Observable();
var SendMessage = require('Scripts/SendMessage.js');
var visibility = Observable("Collapsed");
var text = Observable();
var color = Observable("#00BCD4");
var SendNotification = require('Scripts/SendNotification.js');
var RegId = Observable();
var Storage = require("FuseJS/Storage");
var User = {};

this.onParameterChanged(function(param) {
    // response.value = param.treatmentitemlist.responseInfo;

    Storage.read("patientInfo").then(function(content) {
        User = JSON.parse(content);
        console.log("JSON.stringify(User));  " + JSON.stringify(User));
    }, function(error) {});

    console.log("podatok od main page " + JSON.stringify(param.treatmentitemlist.roomId));
    RoomId.value = param.treatmentitemlist.roomId;
    RegId.value = param.treatmentitemlist.regId;
    console.log("PARAMMMMMMM: " + JSON.stringify(param));
    item = param.treatmentitemlist;
    console.log("item objektot: " + JSON.stringify(param.treatmentitemlist));

});

function goToMain() {

    router.goto("main");
}

var buttontext = Observable(function() {
    return response.value.toFixed(1)
});


function changed() {
    console.log("this is val out: " + response.value);
    if (response.value >= 97) {
        console.log("this is val1");
        color.value = "#c60031";
    } else if (response.value < 97) {
        console.log("this is val2");
        color.value = "#00BCD4";
    }

}

function save() {

    console.log("RESPONSE=" + response.value);
    if (response.value == "" || response.value == "undefined" || response.value == null) {
        console.log("Please enter a value");
        myToast.toastIt("Please enter a value!");
    } else {
        saveFunc();
    }
}



function saveFunc() {
    var responseInfo = {
        "response": response.value.toFixed(1)
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
        console.log("Success vo temperature : " + JSON.stringify(responseObject));

        SendMessage.createSession(RoomId.value, "Temperature meansured: " + response.value.toFixed(1));



        if (item.notificationEnabled == 1) {
            SendNotification.sendPushNotification(
                User.FirstName + " " + User.LastName,
                "Temperature meansured: " + response.value.toFixed(1),
                "Temperature meansured: " + response.value.toFixed(1),
                "Curandus",
                RegId.value,
                RoomId.value,
                User.FirstName + " " + User.LastName,
                User.ChatId);
        }


        console.log(JSON.stringify(responseObject));
        // goToMain();
        router.goto("main", JSON.stringify(obj));
        //response.value = "";


    }).catch(function(err) {
        console.log("tuka vo Error");
        console.log("Error", err.message);

        visibility.value = "Collapsed";

    });

    console.log("api za update treatmentItemListId vrednost=" + data.treatmentItemListId);
}


module.exports = {
    save: save,
    response: response,
    item: item,
    visibility: visibility,
    buttontext: buttontext,
    color: color,
    changed: changed

};
