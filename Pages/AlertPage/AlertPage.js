var Observable = require("FuseJS/Observable");
 		var activeUrl = require("Constants/SERVICE_URL.js");
 		var Modal = require('Modal');
 		var Storage = require("FuseJS/Storage");
 		var SendMessage = require('Scripts/SendMessage.js');
 		var SendNotification = require('Scripts/SendNotification.js');
 		var securityToken = Storage.readSync("securityToken");
 		var user = Observable();
 		var status = Observable();
 		var patientInfo = Observable();
 		var stateCity = Observable();
 		var nameLastname = Observable();
 		var chat = Observable();
 		var treatmentItems = Observable();
 		var templejt = Observable();
 		var firstID = 0;
 		var lastID = 0;
 		var providername = Observable();
 		var patientId = "";
 		var activetreatmentid = "";
 		var subtrementID = "";
 		var patient_roomid = Observable();
 		var WarningInfo = Observable();
 		var load = Observable("Loading...");
 		var response1 = Observable();
 		var namenovo = Observable();
 		var visibility = Observable("Collapsed");
 		var myToast = require("myToast");
 		var User;
 		var push = require("FuseJS/Push");
 		var vibration = require('FuseJS/Vibration');

 		var userInfo = JSON.parse(Storage.readSync("userInfo"));
 		var providerId = JSON.stringify(userInfo.providerId);
 		var ime1 = Observable();
 		var currentDoc = Observable();
 		var enabled = Observable(true);
 		var finalname3 = Observable();
 		var scrollPos = Observable([0, 80]);
 		var comesfrom = Observable();

 		var d = new Date();
 		var gmt = new Date();

 		function NVL(x) {
 		    if (x == null) {
 		        return "";
 		    } else {
 		        return x;
 		    }
 		}

 		push.on("receivedMessage", function(payload, fromNotificationBar) {
 		    if (fromNotificationBar == false) {
 		        console.log("payload " + payload);
 		        Storage.read("notification").then(function(content) {
 		                console.log("kade da prakja notification: " + content);
 		                if (content == "alert") {
 		                    console.log("primanje notifikacija vo alert timeline");
 		                    var push_from = JSON.parse((JSON.parse(payload)).notification).alert.from;

 		                    if (patientInfo.value.chatId == (JSON.parse((JSON.parse(payload)).notification).alert.fromchatid) && (JSON.parse((JSON.parse(payload)).notification).alert.from == "Curandus")) {
 		                        initload();
 		                    }
 		                    myToast.toastIt(JSON.parse((JSON.parse(payload)).notification).alert.title + ":  " + (JSON.parse(payload)).message);
 		                    vibration.vibrate(0.8);
 		                    console.log("Recieved Push NotificaNotificationtion vo main page: " + payload);
 		                }
 		            },
 		            function(error) {
 		                console.log("error vo citanje od storage");
 		            });
 		    }
 		});

 		this.onParameterChanged(function(param) {
 		    comesfrom.value = param.comesfrom;

 		    Storage.write("notification", "alert");
 		    console.log("------------ALERT PAGE------------------");

 		    //Prikazuvanje na vreme od uredot na koja mreza e povrzan
 		    d.value = d.getUTCHours() + "/" + d.getUTCMinutes(); // OVA E STANDATIZIRANO VREME 00 : 00 
 		    //gmt.value =gmt.toGMTString(); // OVA E STANDARNO VREME!!!
 		    var z = new Date();
 		    //       console.log("this is Date: "+z);
 		    //    console.log("GMT: " + gmt);
 		    // console.log("D: " + d.value);
 		    // console.log("Chas: " + d.getHours() + ":"+ d.getMinutes());	
 		    //////////////////////// 			


 		    //d.value = (d.getMonth() +1)+  "/" + d.getDate() +"/" + d.getFullYear() + " Vremeto: " + d.getHours() + ":" +d.getMinutes() ;
 		    //console.log("Vremeto: " + JSON.stringify(d.value));
 		    //myToast.toastIt(d.value);
 		    //param.user.fullName = "";

 		    console.log("Parametarrrrrr " + JSON.stringify(param.user));
 		    user.value = param.user;

 		    if (param.finalname != null) {
 		        param.user = null;
 		        param.ime = null;
 		        nameLastname.value = param.finalname;
 		    }

 		    // if(param.fullname2 != null)
 		    // {
 		    // 	console.log("FULLNAME2 OD SELECT ITEMS!!!! " + param.fullname3);
 		    // 	nameLastname = param.fullname2;
 		    // 	//console.log("namenovo OD SEND!!!! " + param.namenovo);
 		    // }
 		    if (param.ime != null) {

 		        ime1 = param.ime;
 		        nameLastname = ime1;
 		        //nameLastname = param.ime;
 		    }



 		    // param.user.fullName = "";
 		    // user.value = param.user;
 		    if (param.namenovo2 != null) {
 		        console.log("namenovo2222222222222222222" + param.namenovo2);
 		    }

 		    console.log("CHAt doctorChatRoomId: " + param.doctorChatRoomId);
 		    console.log("onParameterChanged" + JSON.stringify(user));

 		    activetreatmentid = JSON.stringify(user.value.activetreatmenId);
 		    patientId = JSON.stringify(user.value.patientId);
 		    subtrementID = JSON.stringify(user.value.subtreatmentid);
 		    patient_roomid.value = JSON.stringify(user.value.RoomId);
 		    // if(param.newContact != null)
 		    // {
 		    // 	console.log("Ova e noviot contact:   "+JSON.stringify(param.newContact));
 		    // 	console.log("nameLastname.value: "+nameLastname.value);
 		    // 	console.log("param.userfullname: "+param.userfullname.value);
 		    if (param.namenovo != null) {
 		        namenovo = param.namenovo;
 		        console.log("namenovo OD SEND!!!! " + param.namenovo);
 		    }


 		    console.log("*********************This is ActiveTreatmentId: " + activetreatmentid);

 		    initload();
 		    var url = activeUrl.URL + "/curandusproject/webapi/api/getPatientsDataRoomId/patientId=" + patientId + "&providerid=" + providerId + "&securityToken=" + securityToken;
 		    fetch(url, {
 		        method: 'GET',
 		        headers: {
 		            "Content-type": "application/json"
 		        },
 		        dataType: 'json'
 		    }).then(function(response) {
 		        response_ok = response.ok; // Is response.status in the 200-range?
 		        return response.json(); // This returns a promise
 		    }).then(function(responseObject) {

 		        console.log("Success!!!!!!:");
 		        console.log("Podatoci za pacient " + JSON.stringify(responseObject));

 		        patientInfo.value = responseObject;

 		        if (NVL(patientInfo.value.allergies) != "" || NVL(patientInfo.value.chronicDiseases) != "" || NVL(patientInfo.value.medicationsThatRecieves) != "") {
 		            WarningInfo.value = "Warning";

 		            console.log("warning " + WarningInfo.value);
 		        } else {
 		            WarningInfo.value = "";
 		            console.log("nema warning " + WarningInfo.value);
 		        }

 		        //onsole.log(patientInfo.value.StreetAddress);
 		        //console.log(patientInfo.value.city);



 		        stateCity.value = patientInfo.value.city + " /  " + patientInfo.value.state;
 		        // <<<<<<< HEAD
 		        // 		        if (param.namenovo != null) {
 		        // 		            nameLastname.value = namenovo;
 		        // 		        }
 		        // 		        // koga doagja od ChatPage
 		        // 		        if (typeof param.userfullname != undefined) {
 		        // 		            console.log("ova e userFullName: " + JSON.stringify(param));
 		        // 		            nameLastname.value = param.userfullname;
 		        // 		            //nameLastname.value = namenovo;
 		        // 		            //nameLastname.value = user.value.firstName + " " + user.value.lastName;
 		        // 		            console.log("ova e name last name: " + JSON.stringify(nameLastname.value));

 		        // 		        }
 		        // 		        // koga doagja od kontakti
 		        // 		        else {
 		        // 		            //nameLastname.value = user.value.firstName + " " + user.value.lastName;
 		        // 		            nameLastname.value = param.userfullname;
 		        // 		            //nameLastname.value = namenovo;
 		        // 		            console.log("ova e name last name111: " + JSON.stringify(nameLastname.value));
 		        // 		        }

 		        // =======
 		        if (param.namenovo != null) {

 		            nameLastname.value = namenovo;
 		        }
 		        if (typeof param.userfullname != undefined) {

 		            if (nameLastname.value != null) {
 		                param.userfullname = null;
 		            } else {
 		                nameLastname.value = param.userfullname;
 		            }
 		            //nameLastname.value = namenovo;
 		            //nameLastname.value = user.value.firstName + " " + user.value.lastName;


 		        }
 		        // koga doagja od kontakti
 		        else {
 		            //nameLastname.value = user.value.firstName + " " + user.value.lastName;
 		            nameLastname.value = param.firstName + param.lastName;
 		            //nameLastname.value = namenovo;

 		        }

 		        // >>>>>>> origin/master

 		        //console.log(stateCity);
 		        //console.log(nameLastname);

 		    }).catch(function(err) {
 		        console.log("Error getPatientsData()", err.message);

 		    });
 		    //console.log("PARAM param param", patientInfo.value);

 		    // param.user.fullName = patientInfo.value.firstName + " " + patientInfo.value.lastName;

 		    console.log("PARAM", patientId);
 		})



 		function loadMore() {

 		    console.log("loadMore loadMore");
 		    fetch(activeUrl.URL + "/curandusproject/webapi/api/treatmentitemlistscroll/treatmentitemlistid=" + lastID + "&updown=D&range=10&securityToken=" + securityToken, {
 		        method: 'GET',
 		        headers: {
 		            "Content-type": "application/json"
 		        },
 		        dataType: 'json'
 		    }).then(function(response) {
 		        response_ok = response.ok; // Is response.status in the 200-range?
 		        return response.json(); // This returns a promise
 		    }).then(function(responseObject) {
 		        console.log("Success!!!");
 		        console.log(JSON.stringify(responseObject));

 		        lastID = responseObject[responseObject.length - 1].treatmentItemListId;

 		        for (var i = 0; i < responseObject.length; i++) {

 		            if (responseObject[i].responseInfo != null) {
 		                var label = responseObject[i].label;
 		                console.log("LABEL " + responseObject[i].label);
 		                if (label == "Comparison With Picture" || label == "X Percription" || label == "Diet" || label == "Activity" || label == "Hygiene" || label == "Other Instructions") {

 		                    if (responseObject[i].responseInfo != null) {

 		                        responseObject[i].response1 = JSON.parse(responseObject[i].responseInfo).response;
 		                        //  response1.value = JSON.parse(responseObject[i].responseInfo).response;
 		                        // response1.value = JSON.parse(responseObject[i].responseInfo).response;

 		                        console.log(" **vrednosta** " + response1.value)

 		                    } else {
 		                        responseObject[i].response1 = null;
 		                        // responseObject[i].responseInfo = null;
 		                    }

 		                    response1.value = JSON.parse(responseObject[i].responseInfo).response;
 		                } else if (label == "Send Image") {
 		                    //**** if response info containt image sent
 		                    if (responseObject[i].responseInfo != null) {
 		                        responseObject[i].responseInfoSendImage = "Image received";
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
 		            var hours = tmpDate.getHours(); // - 1;
 		            if (hours == "00") {
 		                hours = "23";
 		            } else {
 		                hours = hours - 1;
 		            }
 		            var min = tmpDate.getMinutes();

 		            var fullDate = ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('0' + tmpDate.getDate()).slice(-2) + '-' + tmpDate.getFullYear();
 		            var fulltime = ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);

 		            responseObject[i].fullDate = fullDate;
 		            responseObject[i].fullTime = fulltime;
 		            //**** if response info containt image received
 		            /*     if (responseObject[i].responseInfo != null) {
		                responseObject[i].responseInfoSendImage = "Image received";
		            } else {
		                responseObject[i].responseInfoSendImage = null;
		            }
*/
 		            templejt.add(responseObject[i])
 		        }

 		    }).catch(function(err) {

 		        console.log("Error loadMore()", err.message);

 		    });
 		}


 		function loadMore1() {

 		    console.log("loadMore1 loadMore1");
 		    fetch(activeUrl.URL + "/curandusproject/webapi/api/treatmentitemlistscroll/treatmentitemlistid=" + firstID + "&updown=U&range=10&securityToken=" +
 		        securityToken, {
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
 		        console.log(JSON.stringify(responseObject));;

 		        firstID = responseObject[0].treatmentItemListId;
 		        if (responseObject.length == 10) {
 		            scrollPos.value = [0, 80];
 		        };

 		        for (var i = responseObject.length - 1; i >= 0; i--) {

 		            if (responseObject[i].responseInfo != null) {
 		                var label = responseObject[i].label;
 		                console.log("LABEL " + responseObject[i].label);
 		                if (label == "Comparison With Picture" || label == "X Percription" || label == "Diet" || label == "Activity" || label == "Hygiene" || label == "Other Instructions") {

 		                    if (responseObject[i].responseInfo != null) {

 		                        responseObject[i].response1 = JSON.parse(responseObject[i].responseInfo).response;
 		                        //  response1.value = JSON.parse(responseObject[i].responseInfo).response;
 		                        // response1.value = JSON.parse(responseObject[i].responseInfo).response;

 		                        console.log(" **vrednosta** " + response1.value)

 		                    } else {
 		                        responseObject[i].response1 = null;
 		                        // responseObject[i].responseInfo = null;
 		                    }

 		                    response1.value = JSON.parse(responseObject[i].responseInfo).response;
 		                } else if (label == "Send Image") {
 		                    //**** if response info containt image sent
 		                    if (responseObject[i].responseInfo != null) {
 		                        responseObject[i].responseInfoSendImage = "Image received";
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
 		            var hours = tmpDate.getHours(); // - 1;
 		            if (hours == "00") {
 		                hours = "23";
 		            } else {
 		                hours = hours - 1;
 		            }
 		            var min = tmpDate.getMinutes();

 		            var fullDate = ('0' + tmpDate.getMonth()).slice(-2) + '-' + ('0' + (tmpDate.getDate())).slice(-2) + '-' + tmpDate.getFullYear();
 		            var fulltime = ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);

 		            responseObject[i].fullDate = fullDate;
 		            responseObject[i].fullTime = fulltime;
 		            //**** if response info containt image received
 		            /*if (responseObject[i].responseInfo != null) {
 		                responseObject[i].responseInfoSendImage = "Image received";
 		            } else {
 		                responseObject[i].responseInfoSendImage = null;
 		            }*/
 		            templejt.insertAt(0, responseObject[i])
 		        }


 		    }).catch(function(err) {
 		        console.log("Error", err.message);

 		    });

 		}


 		function initload() {

 		    Storage.write("patientchatidpom", "patientchatidpom konecno");

 		    console.log("LOAD");
 		    visibility.value = "Visible";
 		    fetch(activeUrl.URL + "/curandusproject/webapi/api/treatmentitemlis/activetreatmentid=" + activetreatmentid + "&securityToken=" +
 		        securityToken, {
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
 		        console.log("Ovde e doctor: " + JSON.stringify(responseObject));
 		        firstID = responseObject[0].treatmentItemListId;

 		        lastID = responseObject[responseObject.length - 1].treatmentItemListId;
 		        console.log(firstID, lastID);

 		        for (var i = 0; i < responseObject.length; i++) {
 		            patient_roomid.value = responseObject[i].roomId;
 		            if (responseObject[i].responseInfo != null) {
 		                var label = responseObject[i].label;
 		                console.log("LABEL " + responseObject[i].label);
 		                if (label == "Comparison With Picture" || label == "X Percription" || label == "Diet" || label == "Activity" || label == "Hygiene" || label == "Other Instructions") {
 		                    if (responseObject[i].responseInfo != null) {
 		                        responseObject[i].response1 = JSON.parse(responseObject[i].responseInfo).response;
 		                        //  response1.value = JSON.parse(responseObject[i].responseInfo).response;
 		                        // response1.value = JSON.parse(responseObject[i].responseInfo).response;
 		                        console.log(" **vrednosta** " + response1.value);
 		                    } else {
 		                        responseObject[i].response1 = null;
 		                        // responseObject[i].responseInfo = null;
 		                    }
 		                    response1.value = JSON.parse(responseObject[i].responseInfo).response;
 		                } else if (label == "Send Image") {
 		                    //**** if response info containt image sent
 		                    if (responseObject[i].responseInfo != null) {
 		                        responseObject[i].responseInfoSendImage = "Image received";
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
 		            } else {
 		                responseObject[i].response1 = null;
 		                //console.log(" nema vrednost ");
 		            }
 		            var tmpDate = new Date(responseObject[i].timeScheduled);

 		            var days = tmpDate.getDate();
 		            var months = tmpDate.getMonth() + 1;
 		            var year = tmpDate.getFullYear();
 		            var hours = tmpDate.getHours(); // - 1;
 		            if (hours == "00") {
 		                hours = "23";
 		            } else {
 		                hours = hours - 1;
 		            }
 		            var min = tmpDate.getMinutes();

 		            var fullDate = ('0' + (tmpDate.getMonth() + 1)).slice(-2) + '-' + ('0' + (tmpDate.getDate())).slice(-2) + '-' + tmpDate.getFullYear();
 		            var fulltime = ('0' + hours).slice(-2) + ':' + ('0' + min).slice(-2);

 		            responseObject[i].fullDate = fullDate;
 		            responseObject[i].fullTime = fulltime;
 		            //**** if response info containt image received
 		            /*   if (responseObject[i].responseInfo != null) {
 		                   responseObject[i].responseInfoSendImage = "Image received";
 		               } else {
 		                   responseObject[i].responseInfoSendImage = null;
 		               }*/
 		            //console.log(fullDate, fulltime);

 		        }
 		        //  //OVDE SE ZEMAAT DVATA DOKTORI I SE SPOREDUVAAT
 		        providername = responseObject[0].providerid;
 		        // Storage.read("userInfo").then(function(content) {

 		        //     User = JSON.parse(content);
 		        //     console.log("User " + JSON.stringify(User));
 		        // });

 		        currentDoc = userInfo.providerId;
 		        console.log("currentDoc: " + currentDoc);
 		        console.log(providername);
 		        if (currentDoc == providername) {
 		            enabled.value = true;
 		            //myToast.toastIt("You are not able to do changes on this patient until the previous tretment is not terminated");
 		            //console.log("You are not able to do changes on this patient");

 		        }

 		        // ///
 		        visibility.value = "Collapsed";
 		        templejt.replaceAll(responseObject);

 		    }).catch(function(err) {
 		        console.log("Error initload()", err.message);
 		        visibility.value = "Visible";

 		    });



 		}
 		console.log("Enabled " + enabled.value);

 		function statusFunc(e) {

 		    console.log("ovaaa", JSON.stringify(e.data));

 		    var treatmentItemListId = JSON.stringify(e.data.treatmentItemListId);


 		    var data = {
 		        "treatmentItemListId": e.data.treatmentItemListId,
 		        "treatmentitem": e.data.treatmentitem,
 		        "label": e.data.treatmentitem,
 		        "timeScheduled": null,
 		        "timeDone": e.data.timeDone,
 		        "timeRemove": e.data.timeRemove,
 		        "status": "SKIPPED",
 		        "renderingInfo": null,
 		        "responseInfo": e.data.responseInfo,
 		        "created": null,
 		        "createdBy": e.data.createdBy,
 		        "modified": null,
 		        "modifiedBy": e.data.modifiedBy
 		    };
 		    if (currentDoc != providername) {

 		        myToast.toastIt("You are not able to do changes on this patient until the previous tretment is not terminated");

 		    } else {

 		        Modal.showModal(
 		            "Skip " + JSON.stringify(e.data.label),
 		            "Are you sure you want to skip this item?", ["Yes", "No"],
 		            function(s) {
 		                //debug_log("Got callback with " + s);

 		                if (s == "Yes") {
 		                    fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + treatmentItemListId + "&securityToken=" + securityToken, {
 		                        method: 'POST',
 		                        headers: {
 		                            "Content-type": "application/json"
 		                        },
 		                        dataType: 'json',
 		                        body: JSON.stringify(data)
 		                    }).then(function(response) {
 		                        response_ok = response.ok; // Is response.status in the 200-range?
 		                        return response.json(); // This returns a promise
 		                    }).then(function(responseObject) {
 		                        console.log("Success EDIT");
 		                        SendMessage.createSession(e.data.roomId, "Skipped Item from type: " + e.data.label);


 		                        console.log("patientInfo.value.regId " + patientInfo.value.regId);

 		                        if (patientInfo.value.notificationEnabled == 1) {
 		                            SendNotification.sendPushNotification(
 		                                userInfo.firstName + " " + userInfo.lastName,
 		                                "Skipped Item from type " + e.data.label,
 		                                "Skipped Item from type " + e.data.label,
 		                                "Curandus",
 		                                patientInfo.value.regId,
 		                                e.data.roomId,
 		                                userInfo.firstName + " " + userInfo.lastName,
 		                                userInfo.chatId);
 		                        }
 		                        initload();
 		                        console.log(JSON.stringify(responseObject));

 		                    }).catch(function(err) {
 		                        console.log("Error", err.message);

 		                    });

 		                }
 		            });
 		    }


 		};

 		function ShowAlergies() {

 		    Modal.showModal(
 		        "Patient Info ",
 		        "Alergies: " + NVL(patientInfo.value.allergies) + "\n" +
 		        "Past Medical History: " + NVL(patientInfo.value.chronicDiseases) + "\n" +
 		        "Prescribed Medications: " + NVL(patientInfo.value.medicationsThatRecieves) + "\n", ["OK"],
 		        function(s) {});
 		}

 		function skip(item) {


 		    Modal.showModal(
 		        "Skip " + "TEST",
 		        "Are you sure you want to skip this item?", ["Yes", "No"],
 		        function(s) {
 		            //debug_log("Got callback with " + s);
 		            if (s == "Yes") {
 		                console.log("Clicked item - TEST");
 		                // statusFunc(item.data.treatmentItemListId);
 		            }
 		        });

 		}


 		function edit() {
 		    comesfrom.value = "obicno back";
 		    if (currentDoc != providername) {
 		        enabled.value = false;
 		        myToast.toastIt("You are not able to do changes on this patient until the previous tretment is not terminated");

 		    } else {

 		        console.log("This is subtreatmentid: " + subtrementID);
 		        fetch(activeUrl.URL + "/curandusproject/webapi/api/gettreatmentitemssbytreatment/treatmentId=" + subtrementID + "&typetreatment=R&securityToken=" + securityToken, {
 		            method: 'GET',
 		            headers: {
 		                "Content-type": "application/json"
 		            },
 		            dataType: 'json'
 		        }).then(function(response) {
 		            status = response.status; // Get the HTTP status code 
 		            response_ok = response.ok; // Is response.status in the 200-range? 
 		            return response.json(); // This returns a promise 
 		        }).then(function(responseObject) {
 		            //console.log("Success: " + JSON.stringify(responseObject));
 		            responseObject.push({
 		                "num": Math.random()
 		            });
 		            if (subtrementID != null) {
 		                responseObject.push({
 		                    "subtrementID": subtrementID
 		                })
 		            }

 		            if (patientId != null) {
 		                responseObject.push({
 		                    "patientId": patientId
 		                })
 		            }

 		            if (nameLastname.value != null) {
 		                responseObject.push({
 		                    "fullName": nameLastname.value
 		                })
 		            }


 		            console.log("Success: " + JSON.stringify(responseObject));

 		            // console.log("Vo alertPage go stava imeto: " + nameLastname.value);
 		            Storage.write("nameLastname", JSON.stringify(nameLastname.value));
 		            //responseObject.push({"nameLastname":nameLastname.value});
 		            // console.log("ova se printa pred da se prati kon selecttype: " + JSON.stringify(responseObject));
 		            console.log("ova se printa pred da se prati kon selecttype: " + JSON.stringify(responseObject));
 		            router.push("SelectType", {
 		                "user": responseObject
 		            });


 		        }).catch(function(err) {
 		            console.log("Error", err.message);

 		        });
 		    }

 		}

 		function end() {
 		    comesfrom.value = "obicno back";
 		    if (currentDoc != providername) {
 		        enabled.value = false;
 		        myToast.toastIt("You are not able to do changes on this patient until the previous tretment is not terminated");

 		    } else {

 		        Modal.showModal(
 		            "END TREATMENT",
 		            "Are you sure you want to end this treatment?", ["Yes", "No"],
 		            function(s) {
 		                //debug_log("Got callback with " + s);
 		                console.log("patient_roomid.value " + patient_roomid.value);
 		                if (s == "Yes") {
 		                    console.log("patient_roomid.value posle yes  " + patient_roomid.value);
 		                    visibility.value = "Visible";

 		                    fetch(activeUrl.URL + "/curandusproject/webapi/api/EndTreatment/ActiveTreatmentId=" + activetreatmentid + "&securityToken=" + securityToken, {
 		                        method: 'POST',
 		                        headers: {
 		                            "Content-type": "application/json"
 		                        }

 		                    }).then(function(response) {
 		                        status = response.status; // Get the HTTP status code
 		                        response_ok = response.ok; // Is response.status in the 200-range?
 		                        return response.json(); // This returns a promise
 		                    }).then(function(responseObject) {
 		                        console.log("Success ");

 		                        SendMessage.createSession(patient_roomid.value, "End of treatment");

 		                        if (patientInfo.value.notificationEnabled == 1) {
 		                            SendNotification.sendPushNotification(
 		                                userInfo.firstName + " " + userInfo.lastName,
 		                                "End of treatment",
 		                                "End of treatment",
 		                                "Curandus",
 		                                patientInfo.value.regId,
 		                                patientInfo.value.zip,
 		                                userInfo.firstName + " " + userInfo.lastName,
 		                                userInfo.chatId);
 		                        }

 		                        var tmp = Math.random();
 		                        router.goto("main", {
 		                            newContact: tmp,
 		                            comesFromAlertPage: true
 		                        });
 		                        visibility.value = "Collapsed";
 		                    }).catch(function(err) {
 		                        console.log("Error", err.message);
 		                        visibility.value = "Visible";
 		                    });

 		                }
 		            });
 		    }
 		};

 		function goToChat() {

 		    //user.value.fullName = patientInfo.value.firstName + " " + patientInfo.value.lastName;
 		    user.value.fullName = nameLastname.value;
 		    router.push("chat", {
 		        doctorChatRoomId: user.value,
 		        comesFromAlertPagePatient: true
 		    });
 		}

 		function seeResponse(arg) {
 		    if (arg.data.status == "DONE" && arg.data.label == "Send Image") {
 		        console.log("send image seeResponse function: " + JSON.stringify(arg));
 		        router.push("ShowImage", {
 		            "num": Math.random(),
 		            "treatmentitemlist": arg.data
 		        });
 		    }

 		}

 		function goBack() {


 		    console.log("go_back alert page " + comesfrom.value);

 		    // router.goBack();
 		    var obj = {
 		        "num": Math.random()
 		    }
 		    if ((comesfrom.value == "selectitems") || (comesfrom.value == "main")) {
 		        console.log(" Vleze vo main back");
 		        comesfrom.value = "obicno back";
 		        router.goto("main", {
 		            obj: JSON.stringify(obj),
 		            comesFromContactsPatients: true
 		        });
 		    } else if (comesfrom.value == "obicno back") {
 		        console.log(" Vleze vo main back vo ifot");
 		    } else {
 		        console.log(" Vleze vo obicen back");
 		        router.goBack();
 		    }

 		}


 		module.exports = {
 		    user: user,
 		    goBack: goBack,
 		    statusFunc: statusFunc,
 		    patientInfo: patientInfo,
 		    stateCity: stateCity,
 		    treatmentItems: treatmentItems,
 		    nameLastname: nameLastname,
 		    skip: skip,
 		    edit: edit,
 		    end: end,
 		    goToChat: goToChat,
 		    templejt: templejt,
 		    loadMore: loadMore,
 		    loadMore1: loadMore1,
 		    ShowAlergies: ShowAlergies,
 		    WarningInfo: WarningInfo,
 		    seeResponse: seeResponse,
 		    response1: response1,
 		    initload: initload,
 		    patient_roomid: patient_roomid,
 		    visibility: visibility,
 		    load: load,
 		    scrollPos: scrollPos,
 		    nameLastname: nameLastname,
 		    enabled: enabled

 		};
