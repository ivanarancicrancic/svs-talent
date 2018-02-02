		var Observable = require("FuseJS/Observable");
		var url = require("Constants/SERVICE_URL.js");
		var Storage = require("FuseJS/Storage");
		var myToast = require("myToast");
		var activeUrl = require("Constants/SERVICE_URL.js");
		var securityToken = require('Pages/ActivationPage/ActivationPage.js');
		var onoff = Observable();
		var Notifications = Observable(true);
		var onoff1 = Observable();
		var Device = require('Device');
		var p_notificationenabled = Observable();
		///site promenlivi koi shto'kje se upotrebat 
		//var notify = Observable("");
		var firstName = Observable("");
		var lastName = Observable("");
		var phoneNumber = Observable("");
		var chatUserId = "";
		//var notificationEnabled = Observable();
		var User = JSON.parse(Storage.readSync("patientInfo"));
		///
		this.onParameterChanged(function(param) {

		    console.log("vleze ");


		    User = JSON.parse(Storage.readSync("patientInfo"));


		    console.log("User.notificationEnabled " + User.NotificationEnabled);

		    console.log("User " + JSON.stringify(User));

		    if (User.NotificationEnabled == 1) {
		        onoff1.value = true;
		        onoff.value = true;

		    } else {
		        onoff1.value = false;
		        onoff.value = false;
		    }


		    console.log("onoff.value " + onoff.value);

		});

		//onoff = onoff1; // DA GO MESTI SWITCH-OT NA POZICIJA KOJA E INICIJALIZIRANA

		function clicked() {

		    onoff.value = !onoff.value;
		    console.log("Vleze vo clicked ");
		    if (onoff.value == true) {
		        p_notificationenabled.value = 1;
		        console.log("Notifications are  ON");
		        myToast.toastIt("Notifications are ON");
		    } else {
		        p_notificationenabled.value = 0;
		        console.log("Notifications are OFF");
		        myToast.toastIt("Notifications are OFF");
		    }

		    if (User.regId == null) {
		        p_reg_id = User.RegId
		    } else {
		        p_reg_id = User.regId;
		    }

		    var notify = {
		        "firstName": User.FirstName,
		        "lastName": User.LastName,
		        "phone": User.Phone,
		        "allergies": User.Allergies,
		        "chronicDiseases": User.ChronicDiseases,
		        "medicationsThatRecieves": User.MedicationsThatRecieves,
		        "additionalInnfo": User.AdditionalInnfo,
		        "chatId": User.ChatId,
		        "deviceId": User.DeviceId,
		        "regId": p_reg_id,
		        "notificationEnabled": p_notificationenabled.value
		    }

		    console.log("This is the object on update patient: " + JSON.stringify(notify));
		    var url = activeUrl.URL + "/curandusproject/webapi/api/insertpatient";

		    console.log("Update na tabelata: " + onoff.value);
		    fetch(url, {
		        method: 'POST',
		        headers: {
		            "Content-type": "application/json"
		        },
		        dataType: 'json',
		        body: JSON.stringify(notify, securityToken.value)

		    }).then(function(response) {
		        status = response.status; // Get the HTTP status code 
		        response_ok = response.ok; // Is response.status in the 200-range? 
		        return response.json(); // This returns a promise 
		    }).then(function(responseObject) {
		        console.log("responseObject " + responseObject);
		        var userInfo = Observable();
		        userInfo.value = responseObject;
		        Storage.write("patientInfo", JSON.stringify(userInfo.value));

		        if (p_notificationenabled.value == 0) {
		            myToast.toastIt("Notifications are OFF");
		        } else {
		            myToast.toastIt("Notifications are ON");
		        }
		        // Storage.write("userInfo", responseObject);
		    }).catch(function(err) {
		        console.log("------Vleze vo ERROR");
		        console.log("ERROR : " + err.message);
		    });

		}

		module.exports = {
		    p_notificationenabled: p_notificationenabled,
		    clicked: clicked,
		    onoff1: onoff1,
		    onoff: onoff
		};