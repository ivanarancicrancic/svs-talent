var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var Modal = require('Modal');
var Storage = require("FuseJS/Storage");
var securityToken = Storage.readSync("securityToken");
var response = Observable();
var item = Observable();
var imageUrl = Observable();
var question = Observable();
var data = Observable();
var treatmentItemListId_temp = Observable();
var SendMessage = require('Scripts/SendMessage.js');
var RoomId = Observable();
var visibility = Observable("Collapsed");

var SendNotification = require('Scripts/SendNotification.js');
var RegId = Observable();
var Storage = require("FuseJS/Storage");
var User = {};


this.onParameterChanged(function(param) {

    Storage.read("patientInfo").then(function(content) {
        User = JSON.parse(content);
        console.log("JSON.stringify(User));  " + JSON.stringify(User));
    }, function(error) {});

    visibility.value = "Visible";
    data = param.data;
    item = param.treatmentitemlist;
    imageUrl.value = param.data.comparisionurl;
    question.value = param.data.comparisionquestion;
    treatmentItemListId_temp.value = param.treatmentitemlistId;
    RoomId.value = param.RoomId;
    RegId.value = param.treatmentitemlist.regId;
    visibility.value = "Collapsed";
});


function updatePatientAnswerNo() {
    visibility.value = "Visible";
    var responseInfo = {
        "response": "No"
    }

    var data1 = {
        "createdBy": 0,
        "status": "DONE",
        "treatmentItemListId": treatmentItemListId_temp.value,
        "created": "",
        "modifiedBy": 0,
        "responseInfo": JSON.stringify(responseInfo)
    };
    //////////////////

    //fetch
    fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + treatmentItemListId_temp.value + "&securityToken=" + securityToken, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json',
        body: JSON.stringify(data1)
    }).then(function(response) {
        status = response.status; // Get the HTTP status code
        console.log('status', status);
        return response.json(); // This returns a promise
    }).then(function(responseObject) {
        console.log("Success");
        textYes = "Compared with picture.";
        SendMessage.createSession(RoomId.value, "Not compared with picture. ");
        router.push("main", {
            "num": Math.random()
        });
        console.log("Compared with picture.");
    }).catch(function(err) {
        console.log("Error", err.message);
    });
    /////////////
}


function updatePatientAnswerYes() {
    visibility.value = "Visible";
    var responseInfo = {
        "response": "Yes"
    }

    var data1 = {
        "createdBy": 0,
        "status": "DONE",
        "treatmentItemListId": treatmentItemListId_temp.value,
        "created": "",
        "modifiedBy": 0,
        "responseInfo": JSON.stringify(responseInfo)
    };
    //////////////////
    //fetch

    fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + treatmentItemListId_temp.value + "&securityToken=" + securityToken, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json',
        body: JSON.stringify(data1)
    }).then(function(response) {
        status = response.status; // Get the HTTP status code
        console.log('status', status);

        return response.json(); // This returns a promise
    }).then(function(responseObject) {

        console.log("Success");
        textYes = "Compared with picture.";
        SendMessage.createSession(RoomId.value, "Compared with picture.");

        if (item.notificationEnabled == 1) {
            SendNotification.sendPushNotification(
                User.FirstName + " " + User.LastName,
                "Compared with picture.",
                "Compared with picture.",
                "Curandus",
                RegId.value,
                RoomId.value,
                User.FirstName + " " + User.LastName,
                User.ChatId);
        }


        // router.goto("TempPulse");        // here
        router.push("main", {
            "num": Math.random()
        });
        console.log("Compared with picture.");

    }).catch(function(err) {
        console.log("Error", err.message);
        visibility.value = "Visible";
    });

    /////////////
}


module.exports = {
    imageUrl: imageUrl,
    question: question,
    updatePatientAnswerYes: updatePatientAnswerYes,
    updatePatientAnswerNo: updatePatientAnswerNo,
    treatmentItemListId_temp: treatmentItemListId_temp,
    visibility: visibility
}
