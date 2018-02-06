		var Observable = require("FuseJS/Observable");
		var url = require("Constants/SERVICE_URL.js");
		var Storage = require("FuseJS/Storage");
		var securityToken = Storage.readSync("securityToken");
		var myToast = require("myToast");
		var activeUrl = require("Constants/SERVICE_URL.js");
		var onoff = Observable(false);
		var Notifications = Observable();
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
		var User = JSON.parse(Storage.readSync("userInfo"));
		///
		this.onParameterChanged(function(param) {

		    User = JSON.parse(Storage.readSync("userInfo"));

		    console.log("vleze ");
		    console.log("User.notificationEnabled " + User.notificationEnabled);

		    console.log("User.NotificationEnabled " + User.NotificationEnabled);



		    console.log("User " + JSON.stringify(User));

		    if (User.notificationEnabled == 1) {
		        onoff1.value = true;
		        onoff.value = true;

		    } else if (User.NotificationEnabled == 1) {
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
		    console.log("Vleze vo clicked ");
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

		    var p_reg_id;

		    if (User.regId == null) {
		        p_reg_id = User.RegId
		    } else {
		        p_reg_id = User.regId;
		    }
		    console.log("p_reg_id " + p_reg_id);


		    var notify = {
		        "firstName": User.firstName,
		        "lastName": User.lastName,
		        "phone": User.phone,
		        "deviceId": User.deviceId,
		        "chatId": User.chatId,
		        "regId": p_reg_id,
		        "activationCode": User.activationCode,
		        "notificationEnabled": p_notificationenabled.value
		    }
		    console.log("This is the object on update patient: " + JSON.stringify(notify));
		    var url = activeUrl.URL + "/curandusproject/webapi/api/insertprovider/securityToken=" + securityToken;

		    console.log("Update na tabelata: " + onoff.value);
		    fetch(url, {
		        method: 'POST',
		        headers: {
		            "Content-type": "application/json"
		        },
		        dataType: 'json',
		        body: JSON.stringify(notify)

		    }).then(function(response) {
		        status = response.status; // Get the HTTP status code 
		        response_ok = response.ok; // Is response.status in the 200-range? 
		        return response.json(); // This returns a promise 
		    }).then(function(responseObject) {
		        console.log("responseObject " + JSON.stringify(responseObject));
		        var userInfo = Observable();
		        userInfo.value = responseObject;
		        Storage.write("userInfo", JSON.stringify(userInfo.value));
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