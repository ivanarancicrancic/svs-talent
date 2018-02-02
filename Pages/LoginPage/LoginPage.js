		// using Uno.Compiler.ExportTargetInterop;
		//var myPhonenumber = require("phoneNumber");
		var Observable = require("FuseJS/Observable");
		var activeUrl = require("Constants/SERVICE_URL.js");
		var Device = require('Device');
		//var Modal = require('Modal
		var myToast = require("myToast");
		var securityToken = require('Pages/ActivationPage/ActivationPage.js');
		var register = Observable();
		var firstName = Observable();
		var phone = Observable();
		var lastName = Observable();
		var chronicDiseases = Observable();
		var allergies = Observable();
		var additionalInnfo = Observable();
		var medicationsThatRecieves = Observable();
		var imagePath = Observable();
		var aCode = "";
		//var permisions = require("Uno.Permissions");
		imagePath.value = "Assets/placeholder.png";
		var phone = require("FuseJS/Phone");
		/*		phone.value = "001";
		
				console.log("phone format  " + phone);*/
		var phoneNumber = Observable("");
		var phoneNumber1 = Observable("");
		var phoneNumber2 = Observable("");
		var phoneNumber3 = Observable("");

		var re = Observable("");
		var temp = Observable("dva");
		var focused = Observable(true);
		var focus = Observable("prv");
		var counter = Observable(0);
		var tempCounter1 = Observable(0);
		var tempCounter2 = Observable(0);
		var tempCounter3 = Observable(0);
		var PhoneNumberColor = Observable("#BDBDBD");

		var editMode1 = Observable("false");
		var editMode2 = Observable("false");
		var editMode3 = Observable("false");

		var aCode = "565656";
		console.log("This is the phone number! " + JSON.stringify(phone));

		var visibility1 = Observable("Collapsed");
		var visibility = Observable("Visible");
		var load = Observable("Please wait...");
		var push = require("FuseJS/Push");
		var p_reg_id = Observable();

		this.onParameterChanged(function(param) {
		    //var permissionPromise = Permissions.Request(Permissions.Android.CAMERA);
		    p_reg_id.value = (JSON.parse(JSON.stringify(param))).regid;
		    console.log("onParameterChanged vo  login PAGE: " + p_reg_id.value);
		});

		function skip(item) {
		    Modal.showModal(
		        "REGISTER",
		        "Are you sure ?", ["Yes", "No"],
		        function(s) {
		            //debug_log("Got callback with " + s);
		            if (s == "Yes") {
		                registerFunc();
		                // statusFunc(item.data.treatmentItemListId);
		            }
		        });
		}

		function validateForm() {
		    phoneNumber.value = phoneNumber1.value + "" + phoneNumber2.value + "" + phoneNumber3.value;

		    if (firstName.value == null || lastName.value == null || phoneNumber.value.length != 10) {
		        console.log("validateForm phone=" + firstName.value);
		        console.log("validateForm phone=" + lastName.value);
		        console.log("validateForm phone=" + phoneNumber.value);
		        myToast.toastIt("Phone number, First Name and Last Name are required!");
		    } else {
		        visibility.value = "Collapsed";
		        visibility1.value = "Visible";
		        registerFunc();
		        visibility1.value = "Collapsed";
		    }
		}

		// using Uno.Compiler.ExportTargetInterop;
		// [Foreign(Language.Java)]
		// public static extern(Android) void Foo(double x, long y)
		// @{
		// 	android.util.Log.d("ForeignCodeExample*****************", "Well look at this: " + x + " and " + y);
		// @}

		// Foo(1.2, 12345678);

		// push.on("registrationSucceeded", function(regID) {
		//     console.log("Reg Succeeded: " + regID);
		//     p_reg_id.value = regID;
		// });

		function registerFunc() {

		    console.log("funkcija za registracija! " + p_reg_id.value);
		    //Replace this when sms-service is defined


		    //aCode = Math.floor(Math.random() * 900000) + 100000;
		    var aCode = 565656;

		    //aCode = Math.floor(Math.random() * 900000) + 100000;
		    //aCode = '111111';
		    sendSms(phoneNumber.value, aCode);

		    // console.log("Pred da vleze vo then ");
		    // Device.UUID.then(
		    //     function(image) {
		    //         console.log("Device.UUID " + Device.UUID);
		    //     }
		    // );

		    // try {
		    //     console.log("Vleze vo try ");
		    //     console.log("Device.UUID " + Device.UUID);
		    // } catch (err) {
		    //     console.log("Error " + err.message);
		    // }

		    console.log("p_reg_id.value " + p_reg_id.value);

		    register = {
		        "firstName": firstName.value,
		        "lastName": lastName.value,
		        "phone": phoneNumber.value,
		        "activationCode": aCode,
		        "chronicDiseases": chronicDiseases.value,
		        "allergies": allergies.value,
		        "medicationsThatRecieves": medicationsThatRecieves.value,
		        "additionalInnfo": additionalInnfo.value,
		        "deviceId": Device.UUID, //"EED38C3F-9468-3782-B94F-1202B30D249A", //
		        "regId": p_reg_id.value,
		        "notificationEnabled": 1
		            //"status": 0
		    };


		    console.log("register objekt:" + JSON.stringify(register));

		    //  sendSms(phone, aCode);

		    router.push("ActivationPage", {
		        register: register
		    });

		}


		function ValidatePassKey() {

		    /// Counting phone length of an input
		    if (phoneNumber1.value != null) {
		        //console.log("vrednost na counter phoneNumber1:"+counter.value );
		        tempCounter1.value = phoneNumber1.value.length;
		    }
		    if (phoneNumber2.value != null) {
		        //console.log("vrednost na counter phoneNumber2:"+counter.value );
		        tempCounter2.value = phoneNumber2.value.length;
		    }
		    if (phoneNumber3.value != null) {
		        //console.log("vrednost na counter phoneNumber3:"+counter.value );
		        tempCounter3.value = phoneNumber3.value.length;
		    }

		    counter.value = tempCounter1.value + tempCounter2.value + tempCounter3.value;
		    //console.log("This is the counter value : "+counter.value);

		    // Phone label color
		    if (counter.value > 0) {
		        //#00BCD4
		        PhoneNumberColor.value = "#00BCD4";
		    }
		    if (counter.value == 0) {
		        PhoneNumberColor.value = "#BDBDBD";
		    }

		    /// Setting phone-input focus 
		    if (phoneNumber1.value != null) {
		        if (counter.value == 3) {
		            editMode1.value = "true";
		            focus.value = "vtor";
		            editMode1.value = "false";
		        }

		        if (counter.value == 6) {
		            //console.log("(6)value od the counter is = "+counter.value);
		            editMode2.value = "true";
		            focus.value = "tret";
		            editMode2.value = "false";
		        }
		        if (counter.value == 10) {
		            //console.log(" (10)value od the counter is = "+counter.value);
		        }
		    }

		}

		function sendSms(phone, text) {
		    fetch(activeUrl.URL + "/curandusproject/webapi/api/sendsms/to=+1" + phone + "&body=" + text + "&securityToken=" + securityToken.value, {
		        method: 'GET',
		        headers: {
		            "Content-type": "application/json"
		        },
		        dataType: 'json'
		    }).then(function(response) {
		        return response.json(); // This returns a promise
		    }).then(function(responseObject) {
		        console.log("Success send sms");
		        // after sending sms go to activation pa

		    }).catch(function(err) {
		        console.log("Error", err.message);
		    });
		}




		module.exports = {
		    register: register,
		    firstName: firstName,
		    phone: phone,
		    lastName: lastName,
		    chronicDiseases: chronicDiseases,
		    allergies: allergies,
		    medicationsThatRecieves: medicationsThatRecieves,
		    additionalInnfo: additionalInnfo,
		    registerFunc: registerFunc,
		    imagePath: imagePath,
		    skip: skip,
		    validateForm: validateForm,
		    phoneNumber1: phoneNumber1,
		    phoneNumber2: phoneNumber2,
		    phoneNumber3: phoneNumber3,
		    ValidatePassKey: ValidatePassKey,
		    editMode1: editMode1,
		    editMode2: editMode2,
		    editMode3: editMode3,
		    PhoneNumberColor: PhoneNumberColor,
		    visibility: visibility,
		    visibility1: visibility1,
		    load: load
		};