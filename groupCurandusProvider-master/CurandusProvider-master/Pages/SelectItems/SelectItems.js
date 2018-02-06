var Observable = require('FuseJS/Observable');
var activeUrl = require("Constants/SERVICE_URL.js");
var Storage = require("FuseJS/Storage");
var Modal = require('Modal');
var myToast = require("myToast");
var CameraRoll = require("FuseJS/CameraRoll");
var Camera = require("FuseJS/Camera");
var ImageTools = require("FuseJS/ImageTools");
var SendMessage = require('Scripts/SendMessage.js');
var SendNotification = require('Scripts/SendNotification.js');
var securityToken = Storage.readSync("securityToken");
var patientname = Observable();
var namenovo1 = Observable();
var roomid = Observable();
var lista = Observable();
var P_ActiveTreatmentID;
var P_SubTreatmentID;
var api_call;
var P_PatientID;
var p_enabled = Observable(true);
var user_patient = Observable();
var WarningInfo = Observable();
var praznoime = "";
var show_string = "";
var Types = require("Constants/Types.js");
var flag = Observable();
flag.value = "nemaslika";
var visibility = Observable("Collapsed");
var lista_send = [];
var load = Observable();
var p_patientID = JSON.parse(Storage.readSync("patientId"));
var chatid_p = Observable();

//activeUrl.URL="http://192.168.0.111:8080"
var userInfo = JSON.parse(Storage.readSync("userInfo")); //Storage.readSync("userInfo");
console.log("OVA E user info  yyyy: " + JSON.stringify(userInfo));
var providerId = JSON.stringify(userInfo.providerId);

var stname = Observable();

var lista_post = [];

var imagePath = Observable();
var imageName = Observable();
var imageSize = Observable();
var base64Code;
var rendering;

///code for autocomplete medicineitem START***
var matchData = Observable();
var medicinename = Observable();
var list = [];
var counter = 0;
var flag = Observable(2);
var senderIndex = Observable();
var tmp = Observable();
var flagAutoComplete = Observable();

var finalname = Observable();
flagAutoComplete = "standBy";
var namenovo2 = Observable();
var namenovo = Observable();

var itemsTwo = Observable({
    name: "B.I.D."
}, {
    name: "T.I.D."
}, {
    name: "Q.I.D."
}, {
    name: "Once a day"
}, {
    name: "Every 2 days"
}, {
    name: "Every 3 days"
}, {
    name: "Every 4 days"
}, {
    name: "Every 5 days"
}, {
    name: "Every 6 days"
}, {
    name: "Every 7 days"
}, {
    name: "Every 14 days"
}, {
    name: "Every 30 days"
});

var whenStart = Observable({
    name: "Today",
    ID: "0"
}, {
    name: "Tommorow",
    ID: "1"
}, {
    name: "In 2 days",
    ID: "2"
}, {
    name: "In 3 days",
    ID: "3"
}, {
    name: "In 5 days",
    ID: "4"
}, {
    name: "In 7 days",
    ID: "5"
}, {
    name: "In 10 days",
    ID: "6"
}, {
    name: "In 15 days",
    ID: "7"
}, {
    name: "In 30 days",
    ID: "8"
});

// set flag for autocomplete - when to be triggered autocomplete
function setFlag() {
    console.log("setiran flag!!");
    flagAutoComplete = "runAction";
    console.log("flagAutoComplete - vo setflag: " + flagAutoComplete);
}

// find a match in the database 
function machFound(tmp) {
    var Data = require("Constants/Drugs.js");
    if (counter > 2) {
        tmp.matchData = Observable();
        var temp = 0; // for only 10 suggestions
        // console.log("these are drugs: "+JSON.stringify(Data.DrugsData.length));
        for (var i = Data.DrugsData.length - 1; i >= 0; i--) {
            if (Data.DrugsData[i].term.toLowerCase().trim().indexOf(tmp.medicinename.toLowerCase().trim()) != -1) {
                tmp.matchData.add({
                    "term": Data.DrugsData[i].term.toLowerCase()
                });
            }
        }
        console.log("Ok this is the matchData: " + JSON.stringify(tmp.matchData));

        // lista.getAt(sender.data.index.value).matchData.add() = tmp.matchData;
        //console.log("Ok this is the matchData in lista: "+JSON.stringify(sender.data.index.value).matchData);
    } else {
        tmp.matchData.clear();
    }

    return tmp.matchData
}

// on value changed meansure the length of an input and call matchData()
function autoComplete(sender) {
    console.log("flag autoComplete: " + flagAutoComplete);
    if (flagAutoComplete == "runAction") {
        console.log("se izvrshuva autoComplete!");
        tmp = {
            "medicinename": lista.getAt(sender.data.index.value).medicinename.value,
            "medicinecomment": lista.getAt(sender.data.index.value).medicinecomment.value,
            "matchData": {}
        }

        if (tmp != null) {
            if (flag.value == 2) {
                counter = tmp.medicinename.length;
                if (counter > 2) {
                    senderIndex.value = sender.data.index.value;
                    lista.getAt(sender.data.index.value).matchData.clear();
                    var match = machFound(tmp);
                    for (var i = 0; i < match.length; i++) {
                        lista.getAt(sender.data.index.value).matchData.add(match.getAt(i));
                    }
                } else if (counter < 2) {
                    lista.getAt(sender.data.index.value).matchData.clear();
                }
            } else {
                flag.value = 2;
            }
        }
        //lista.getAt(sender.data.index.value).matchData.clear();
    } else if (flagAutoComplete = "standBy") {
        console.log("Ne se izvrshuva autoComplete!");
    }


}

// when option is selected
function optionSelected(sender) {

    flag.value = 1;
    console.log("this is selected option: " + JSON.stringify(sender.data));

    //if(sender.data.term.length > 25){
    //lista.getAt(senderIndex.value).medicinename.value = sender.data.term.substring(0,25)+" ...";
    lista.getAt(senderIndex.value).medicinename.value = sender.data.term;
    lista.getAt(senderIndex.value).matchData.clear();

    // }

    // else{
    //     lista.getAt(senderIndex.value).medicinename.value = sender.data.term;
    //     lista.getAt(senderIndex.value).matchData.clear();

    // }             
}


/// code for autocomplete medicineitem END ***

function NVL(x) {
    if (x == null) {
        return "";
    } else {
        return x;
    }
}

function NewItem(data) {
    this.index = Observable(data.index);
    this.Selected = Observable(data.intervaldaytime);
    this.SelectedStart = Observable(data.SelectedStart);
    this.isAgree = Observable(data.isAgree);
    this.treatmentitemid = Observable(data.treatmentItemId);
    this.subtreatmentdetail = Observable(data.subtreatmentid);
    this.name = Observable(data.name);
    this.label = Observable(data.label);
    this.typet = Observable(data.typeT);
    this.interval = Observable(data.repeatT);
    this.duration = Observable(data.duration);
    this.defaultvalue = Observable(data.render.defaultvalue);
    this.painlevelof = Observable(data.render.painlevelof);
    this.sendimageof = Observable(data.render.sendimageof);
    this.medicinename = Observable(data.render.medicinename);
    this.medicinecomment = Observable(data.render.medicinecomment);
    this.matchData = Observable();
    this.diet = Observable(data.render.diet);
    this.activity = Observable(data.render.activity);
    this.hygiene = Observable(data.render.hygiene);
    this.otherinstruction = Observable(data.render.otherinstruction);
    this.comparisionquestion = Observable(data.render.comparisionquestion);
    //this.comparisioncomment = Observable(data.render.comparisioncomment);
    this.comparisionurl = Observable(data.render.comparisionurl);
    this.comparisionflag = Observable(data.render.comparisionflag);
    this.comparisionbase64 = Observable(data.render.comparisionbase64);
    this.comparisionimagefile = Observable(data.render.comparisionimagefile);
}

this.onParameterChanged(function(param) {
    console.log("-------------------- SELECT ITEMS -----------------------");
    P_ActiveTreatmentID = 0;
    P_SubTreatmentID = 0;
    P_PatientID = 0;
    stname.value = "";
    lista.clear();
    if ("namenovo1" in param && param.namenovo1 != null) {
        console.log("OVA E NAMENOVO OD SELECT TYPE: " + param.namenovo);
        namenovo = param.namenovo1;
        console.log("OVA E NAPOLNETO NAMENOVO: " + namenovo);
    }
    if ("namenovo2" in param && param.namenovo2 != null) {
        console.log("NAMENOVO222222222222222222222222222: " + JSON.stringify(param));
        namenovo2 = param.namenovo2;
    }
    var responseObject = JSON.stringify(param.sendData);
    console.log("response:" + responseObject);
    if (param.name != null) {
        param.fullname1 = null;

        finalname.value = param.name;
        patientname.value = param.name;
        //param.fullname1 = "";
        // param.sendData= "";
    }
    if (param.fullname1 != null) {
        //param.name = "";
        //param.sendData= "";

        finalname.value = param.fullname1;
        patientname.value = param.fullname1;
    }
    for (var i = 0; i < param.sendData.length - 3; i++) {

        //  param.sendData[i].name=param.sendData[i].name.replace(" ","");
        //  param.sendData[i].name=param.sendData[i].name.replace(" ","");
        //  console.log("Ime Tip  "+ Types.GetTypeLabel("1"));
        console.log("ID  " + param.sendData[i].name);

        param.sendData[i].label = Types.GetTypeLabel(param.sendData[i].name);

        console.log("Ime Tip  " + param.sendData[i].label);
        //console.log("TIPOVI", JSON.stringify(Types.types.value)); 
        if (param.sendData[i].renderingInfo == null || param.sendData[i].renderingInfo == "null") {
            param.sendData[i].render = "";
        } else {
            param.sendData[i].render = JSON.parse(JSON.parse(param.sendData[i].renderingInfo));
        }

        // console.log("Render "+(JSON.parse(param.sendData[i].render)).diet);    
        param.sendData[i].index = i;
        lista.add(new NewItem(param.sendData[i]));

        console.log("lista.getAt(i).isAgree " + lista.getAt(i).isAgree);
        console.log("lista.getAt(i).SelectedStart " + lista.getAt(i).SelectedStart);
        console.log("lista.getAt(i).Selected " + lista.getAt(i).Selected);
    }

    p_patient_id = param.sendData[param.sendData.length - 3].patientId;
    P_SubTreatmentID = param.sendData[param.sendData.length - 1].SubtreatmentIdOnEDIT;

    if (P_SubTreatmentID == "") {
        P_SubTreatmentID = 0;
    }

    stname.value = param.sendData[param.sendData.length - 2].templateName;

    prazno_ime = param.sendData[param.sendData.length - 2].templateName;

    if (param.sendData[param.sendData.length - 2].templateName == "") {
        console.log("44444");
    }

    console.log("Nameeee " + param.sendData[param.sendData.length]);
    console.log("Nameeee " + namenovo2);
    console.log("Prametar " + p_patient_id + " P_SubTreatmentID " + P_SubTreatmentID + " Name " + stname.value);
    //   stname.value="";

    var url = activeUrl.URL + "/curandusproject/webapi/api/getPatientsDataRoomId/patientId=" + p_patient_id + "&providerid=" + providerId + "&securityToken=" + securityToken;
    console.log("getPatientsDataRoomId " + url);
    fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json'
    }).then(function(response) {
        status = response.status; // Get the HTTP status code  
        response_ok = response.ok; // Is response.status in the 200-range?  
        return response.json(); // This returns a promise  
    }).then(function(data) {
        user_patient.value = data;
        roomid.value = user_patient.value.zip;
        chatid_p.value = user_patient.value.chatId;
        console.log("roomid.value " + roomid.value);

        if (NVL(user_patient.value.allergies) != "" || NVL(user_patient.value.chronicDiseases) != "" || NVL(user_patient.value.medicationsThatRecieves) != "") {
            WarningInfo.value = "Warning";
            console.log("warning " + WarningInfo.value);
        } else {
            WarningInfo.value = "";
            console.log("nema warning " + WarningInfo.value);
        }

    }).catch(function(err) {
        console.log("Fetch data error");
        console.log(err.message);
    });


});

// dodadeno od moki samo za prikaz na slika bez da zapishuva vo baza (LOAD)
var displayImage = function(image) {
    imagePath.value = image.path;
    imageName.value = image.name;
    imageSize.value = image.width + "x" + image.height;
}

// dodadeno od moki samo za prikaz na slika bez da zapishuva vo baza (LOAD)
function selectImageShow(sender) {
    console.log("VLEZE VO selectImageShow");
    CameraRoll.getImage().then(
        function(image) {
            var args = {
                desiredWidth: 480,
                desiredHeight: 480,
                mode: ImageTools.SCALE_AND_CROP,
                performInPlace: true
            };
            ImageTools.resize(image, args).then(
                function(image) {
                    ImageTools.getBase64FromImage(image)
                        .then(function(image) {
                            lista.getAt(sender.data.index.value).comparisionbase64.value = image;
                            // var base64Code = {
                            //     "base64": image
                            // };
                            // console.log("vleze vo selectImageShow i ova e kodot: "+base64Code.base64.substr(1, 100));
                        }).then(function(err) {
                            console.log(err);
                        });
                    lista.getAt(sender.data.index.value).comparisionimagefile.value = image.path;
                    lista.getAt(sender.data.index.value).comparisionflag.value = true;

                    console.log("image.path: " + image.path);
                    //displayImage(image);
                }
            ).catch(
                function(reason) {
                    console.log("Couldn't resize image: " + reason);
                }
            );
        }
    ).catch(
        function(reason) {
            console.log("Couldn't get image: " + reason);
        }
    );

};

// dodadeno od moki samo za prikaz na slika bez da zapishuva vo baza (CAMERA)
function takePictureShow(sender) {
    Camera.takePicture().then(
        function(image) {
            console.log("Vleze vo takepictureShow: ");
            var args = {
                desiredWidth: 480,
                desiredHeight: 480,
                mode: ImageTools.SCALE_AND_CROP,
                performInPlace: true
            };
            ImageTools.resize(image, args).then(
                function(image) {
                    ImageTools.getBase64FromImage(image)
                        .then(function(image) {
                            lista.getAt(sender.data.index.value).comparisionbase64.value = image;
                            // base64Code = {
                            //     "base64": image
                            // };
                            // console.log("vleze vo takePictureShow i ova e kodot: "+base64Code.base64.substr(1, 100));
                        });
                    lista.getAt(sender.data.index.value).comparisionimagefile.value = image.path;
                    lista.getAt(sender.data.index.value).comparisionflag.value = true;
                    //displayImage(image);
                }
            ).catch(
                function(reason) {
                    console.log("Couldn't resize image: " + reason);
                }
            );
        }
    ).catch(
        function(reason) {
            console.log("Couldn't get image: " + reason);
        }
    );
};



function selectImage(sender) {
    console.log("data" + sender.data.index.value);
    lista.getAt(sender.data.index.value).flag.value = "load";
    console.log("Vleguva vo selectimage: ");
    //console.log("ova e patekata na slikata:"+ImageURL.value);     
    CameraRoll.getImage().then(
        function(image) {
            var args = {
                desiredWidth: 480,
                desiredHeight: 480,
                mode: ImageTools.SCALE_AND_CROP,
                performInPlace: true
            };
            ImageTools.resize(image, args).then(
                function(image) {
                    ImageTools.getBase64FromImage(image)
                        .then(function(image) {

                            rendering = {
                                "base64": image
                            };
                            //console.log("The base64 encoded image is "+rendering);
                            var tmp = {
                                "name": "ComparisonWithPicture",
                                "duration": "3",
                                "status": "1",
                                "createdBy": 0,
                                "modifiedBy": 0,
                                "created": null,
                                "modified": null,
                                "typeT": "ACK",
                                "renderingInfo": JSON.stringify(rendering),
                                "repeatT": "5",
                                "subtreatmentid": 18
                            };
                            console.log("The tmp is " + tmp);

                            fetch(activeUrl.URL + "/curandusproject/webapi/api/inserttreatmentitemimage/securityToken=" + securityToken, {
                                method: 'POST',
                                headers: {
                                    "Content-type": "application/json"
                                },
                                dataType: 'json',
                                body: JSON.stringify(tmp)
                            }).then(function(response) {
                                status = response.status; // Get the HTTP status code
                                response_ok = response.ok; // Is response.status in the 200-range?
                                return response.json(); // This returns a promise
                            }).then(function(responseObject) {
                                console.log("Success");
                                console.log("broj na slika: " + responseObject);
                                //  ImageURL.value = "http://192.168.1.110:8080/curandusImages/"+responseObject+".jpg";
                                lista.getAt(sender.data.index.value).comparisionurl.value = activeUrl.URL + "/curandusImages/" + responseObject + ".jpg";

                                console.log("URL " + lista.getAt(sender.data.index.value).comparisionurl.value);
                            }).catch(function(err) {
                                console.log("Error", err.message);
                            });
                        });

                    // displayImage(image);
                }
            ).catch(
                function(reason) {
                    console.log("Couldn't resize image: " + reason);
                }
            );
        }
    ).catch(
        function(reason) {
            console.log("Couldn't get image: " + reason);
        }
    );
};

function takePicture(sender) {
    Camera.takePicture().then(
        function(image) {
            console.log("Vleze vo takepicture: " + image);
            var args = {
                desiredWidth: 480,
                desiredHeight: 480,
                mode: ImageTools.SCALE_AND_CROP,
                performInPlace: true
            };
            ImageTools.resize(image, args).then(
                function(image) {
                    ImageTools.getBase64FromImage(image)
                        .then(function(image) {

                            rendering = {
                                "base64": image
                            };
                            //console.log("The base64 encoded image is "+rendering);
                            var tmp = {
                                "name": "ComparisonWithPicture",
                                "duration": "3",
                                "status": "1",
                                "createdBy": 0,
                                "modifiedBy": 0,
                                "created": null,
                                "modified": null,
                                "typeT": "ACK",
                                "renderingInfo": JSON.stringify(rendering),
                                "repeatT": "5",
                                "subtreatmentid": 18
                            };
                            console.log("The tmp is " + tmp);

                            fetch(activeUrl.URL + "/curandusproject/webapi/api/inserttreatmentitemimage/securityToken=" + securityToken, {
                                method: 'POST',
                                headers: {
                                    "Content-type": "application/json"
                                },
                                dataType: 'json',
                                body: JSON.stringify(tmp)
                            }).then(function(response) {
                                status = response.status; // Get the HTTP status code
                                response_ok = response.ok; // Is response.status in the 200-range?
                                return response.json(); // This returns a promise
                            }).then(function(responseObject) {
                                console.log("Success");
                                console.log("broj na slika: " + responseObject);
                                //  ImageURL.value = "http://192.168.1.110:8080/curandusImages/"+responseObject+".jpg";
                                lista.getAt(sender.data.index.value).comparisionurl.value = activeUrl.URL + "/curandusImages/" + responseObject + ".jpg";

                                console.log("URL " + lista.getAt(sender.data.index.value).comparisionurl.value);
                            }).catch(function(err) {
                                console.log("Error", err.message);
                            });
                        });

                    // displayImage(image);
                }
            ).catch(
                function(reason) {
                    console.log("Couldn't resize image: " + reason);
                }
            );
        }
    ).catch(
        function(reason) {
            console.log("Couldn't get image: " + reason);
        }
    );
};

function ShowAlergies() {
    Modal.showModal(
        "Patient Info ",
        "Alergies: " + NVL(user_patient.value.allergies) + "\n" +
        "Past Medical History: " + NVL(user_patient.value.chronicDiseases) + "\n" +
        "Prescribed Medications: " + NVL(user_patient.value.medicationsThatRecieves) + "\n", ["OK"],
        function(s) {});
}

function goToSavedTreatments() {
    lista_send = [];

    console.log("Redirekting");
    var url = activeUrl.URL + "/curandusproject/webapi/api/getsavedtreatmenttemplatebyprovider/" + providerId + "&&" + securityToken;
    console.log(url);
    fetch(url, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json'
    }).then(function(response) {
        status = response.status; // Get the HTTP status code 
        response_ok = response.ok; // Is response.status in the 200-range? 
        return response.json(); // This returns a promise 
    }).then(function(data) {
        var tmp = {};
        for (var i = 0; i < data.length; i++) {
            tmp = {
                "savedTreatmentTemplateId": data[i].savedTreatmentTemplateId,
                "nameTreatment": data[i].nameTreatment,
                "created": data[i].created,
                "createdBy": data[i].createdBy,
                "modified": data[i].modified,
                "modifiedBy": data[i].modifiedBy,
                "providerDetail": data[i].providerDetail
            }
            lista_send[i] = tmp;
        }

        router.push("savedTreatment", {
            lista: lista_send,
            finalname: finalname.value

        });

        //router.goto("savedTreatment", lista_send); 
        // router.goto("WelcomePage", null,"savedTreatment", lista_send); 
        //       router.modify({
        //     how: "Goto",
        //     path: [ "main", {}, "savedTreatment", lista_send ],
        //     transition: "Bypass",
        // });
    }).catch(function(err) {
        console.log("Fetch data error");
        console.log(err.message);
    });
}


function CheckFields() {
    var ret = 0;
    var interval_par;
    for (var i = 0; i < lista.length; i++) {
        if (lista.getAt(i).name.value != "8" && lista.getAt(i).name.value != "9" &&
            lista.getAt(i).name.value != "10" && lista.getAt(i).name.value != "11")
        // lista.getAt(0).name.value=="TemperatureCheck"||lista.getAt(0).name.value=="PulseCheck"
        // ||lista.getAt(0).name.value=="BloodPressuerCheck")  
        {

            if ((NVL(lista.getAt(i).isAgree.value)).toString() == "true") {
                console.log("vleze vo isAgree true " + NVL(lista.getAt(i).isAgree.value));
                interval_par = NVL(lista.getAt(i).Selected.value);
            } else {
                interval_par = NVL(lista.getAt(i).interval.value);
                console.log("vleze vo isAgree false " + NVL(lista.getAt(i).isAgree.value));
            }


            if (((NVL(lista.getAt(i).isAgree.value)).toString() == "true") && (NVL(lista.getAt(i).Selected.value) == "" ||
                    NVL(lista.getAt(i).duration.value) == "" || NVL(lista.getAt(i).duration.value) > 90 || NVL(lista.getAt(i).duration.value) == 0)) {
                //myToast.toastIt("Please enter valid values "); //" higher than 0");
                console.log("Please enter values higher than 0");
                ret = ret + 1;
            } else if (((NVL(lista.getAt(i).isAgree.value)).toString() == "false") && (NVL(lista.getAt(i).interval.value) == "" || NVL(lista.getAt(i).duration.value) == "" || NVL(lista.getAt(i).duration.value) > 90 ||
                    NVL(lista.getAt(i).interval.value) == 0 || NVL(lista.getAt(i).duration.value) == 0)) {
                //myToast.toastIt("Please enter valid values " + interval_par); //" higher than 0");
                console.log("Please enter values higher than 0");
                ret = ret + 1;
            }
        } else if (lista.length == 0) {
            myToast.toastIt("Add treatments");
            console.log("NEMOZE!");
        } else if (lista.getAt(i).name.value == "8") {
            if (NVL(lista.getAt(i).diet.value) == "" || NVL(lista.getAt(i).duration.value) == "" || NVL(lista.getAt(i).duration.value) > 90 || NVL(lista.getAt(i).duration.value) == 0) {
                //myToast.toastIt("ENTER VALID NUMBER OF DAYS");
                ret = ret + 1;
            }
        } else if (lista.getAt(0).name.value == "10") {
            if (NVL(lista.getAt(i).hygiene.value) == "" || NVL(lista.getAt(i).duration.value) == "" || NVL(lista.getAt(i).duration.value) > 90 || NVL(lista.getAt(i).duration.value) == 0) {
                //myToast.toastIt("ENTER VALID NUMBER OF DAYS");
                console.log("ENTER VALID");
                ret = ret + 1;
            }
        } else if (lista.getAt(i).name.value == "11") {
            if (NVL(lista.getAt(i).otherinstruction.value) == "") {
                ret = ret + 1;
            }
        } else if (lista.getAt(i).name.value == "9") {
            if (NVL(lista.getAt(i).activity.value) == "" || NVL(lista.getAt(i).duration.value) == "" || NVL(lista.getAt(i).duration.value) > 90 ||
                NVL(lista.getAt(i).duration.value) == 0) {
                ret = ret + 1;
            }
        }


        if (lista.getAt(i).name.value == "4") {
            if (NVL(lista.getAt(i).painlevelof.value) == "") {
                ret = ret + 1;
                console.log("ENTER pain");
            }
        } else if (lista.getAt(i).name.value == "6") {
            if (NVL(lista.getAt(i).sendimageof.value) == "") {
                ret = ret + 1;
                console.log("ENTER sen image of");
            }
        } else if (lista.getAt(i).name.value == "7") {
            if (NVL(lista.getAt(i).comparisionquestion.value) == "" ||
                (NVL(lista.getAt(i).comparisionimagefile.value) == "" && NVL(lista.getAt(i).comparisionurl.value) == "")) {
                ret = ret + 1;
                console.log("ENTER comparision");
            }
        } else if (lista.getAt(i).name.value == "5") {
            if (NVL(lista.getAt(i).medicinename.value) == "") {
                ret = ret + 1;
                console.log("ENTER medicine");
            }
        }
    }

    console.log("ret " + ret);
    if (ret == 0) {
        p_enabled.value = true;
        return true;
    } else {
        p_enabled.value = false;
        return false;
    }
}

function ChekNameTreatment() {
    console.log("klik");

    var pom = CheckFields();
    console.log("pom " + pom);

    // Modal.showModal(
    //     "Skip " + "TEST",
    //     "Are you sure you want to ovveride this treatment?", ["Yes", "No"],
    //     function(s) {
    //         //debug_log("Got callback with " + s);
    //         if (s == "Yes") {
    //             console.log("Clicked item - TEST");
    //         }
    //         else
    //         {
    //          console.log("Clicked item - TEST");
    //         }
    //     });
}

function AddNewItem(sender) {
    console.log("subtreatmentdetail" + sender.data.subtreatmentdetail.value);

    console.log("index" + sender.data.index);
    var pom_item = {
        "name": sender.data.name.value,
        "label": sender.data.label.value,
        "subtreatmentid": sender.data.subtreatmentdetail.value,
        "index": sender.data.index.value + 1,
        "SelectedStart": "Today",
        "render": ""
    }
    lista.insertAt(sender.data.index.value + 1, new NewItem(pom_item));
    for (var i = 0; i < lista.length; i++) {
        lista.getAt(i).index.value = i;
    }
}

function RemoveItem(sender) {
    lista.remove(sender.data);
    for (var i = 0; i < lista.length; i++) {
        lista.getAt(i).index.value = i;

    }
    console.log("IZBRISHA");
    console.log("OSTANAA:" + lista.length);
}

function Insert_Treatment1() {
    for (var i = 0; i < lista.length; i++) {
        if (!lista.getAt(i).isAgree.value) {
            console.log(" konbo ");
        } else {
            console.log(" interwal ");
        }
        console.log("lista.getAt(i).isAgree.value " + lista.getAt(i).isAgree.value);
        console.log("lista.getAt(i).interval.value " + lista.getAt(i).interval.value);
        console.log("lista.getAt(i).selected.value " + lista.getAt(i).Selected.value);
        console.log("lista.getAt(i).SelectedStart.ID " + lista.getAt(i).SelectedStart.value);
    }
}

function Insert_Treatment() {
    lista_post = [];



    var dolzina = lista.length;
    var validation = CheckFields();
    if (dolzina == 0) {
        console.log("Vnesete tretman");
        myToast.toastIt("Please enter a treatment");
    }
    if (validation == false) {
        // Modal.showModal(
        //    "Message",
        //    "Please fulfill all fields in treatment", ["OK"],
        //    function(s) {
        //    });
        myToast.toastIt("Please complete all fields in treatment and enter valid values ");

    } else {
        visibility.value = "Visible";
        load.value = "Sending...";
        var rendering;
        for (var i = 0; i < lista.length; i++) {
            rendering = {};
            if (lista.getAt(i).name.value == "4") {
                rendering = {
                    "painlevelof": lista.getAt(i).painlevelof.value
                };
            } else if (lista.getAt(i).name.value == "5") {
                console.log("ova se prakja za vo baza medicinename: " + lista.getAt(i).medicinename.value);
                rendering = {
                    "medicinename": lista.getAt(i).medicinename.value,
                    "medicinecomment": lista.getAt(i).medicinecomment.value
                };
            } else if (lista.getAt(i).name.value == "6") {
                rendering = {
                    "sendimageof": lista.getAt(i).sendimageof.value
                };
            } else if (lista.getAt(i).name.value == "8") {
                rendering = {
                    "diet": lista.getAt(i).diet.value
                };
            } else if (lista.getAt(i).name.value == "10") {
                rendering = {
                    "hygiene": lista.getAt(i).hygiene.value
                };
            } else if (lista.getAt(i).name.value == "9") {
                rendering = {
                    "activity": lista.getAt(i).activity.value
                };
            } else if (lista.getAt(i).name.value == "11") {
                rendering = {
                    "otherinstruction": lista.getAt(i).otherinstruction.value
                };
            } else if (lista.getAt(i).name.value == "7") {
                rendering = {
                    "comparisionquestion": lista.getAt(i).comparisionquestion.value,
                    "comparisionurl": lista.getAt(i).comparisionurl.value,
                    "comparisionbase64": lista.getAt(i).comparisionbase64.value,
                    "comparisionflag": lista.getAt(i).comparisionflag.value,
                    "pateka": activeUrl.URL + "/curandusImages/"
                };
            }
            var interval_par;
            // if (lista.getAt(i).isAgree.value) {
            //     interval_par = lista.getAt(i).Selected.value;
            //     lista.getAt(i).interval.value = "";
            // } else {
            //     interval_par = lista.getAt(i).interval.value;
            //     lista.getAt(i).Selected.value = "";
            // }

            if ((NVL(lista.getAt(i).isAgree.value)).toString() == "true") {
                console.log("vleze vo isAgree true " + NVL(lista.getAt(i).isAgree.value));
                interval_par = NVL(lista.getAt(i).Selected.value);
                lista.getAt(i).interval.value = "";
            } else {
                interval_par = NVL(lista.getAt(i).interval.value);
                console.log("vleze vo isAgree false " + NVL(lista.getAt(i).isAgree.value));
                lista.getAt(i).Selected.value = "";
            }


            var pom = {
                "treatmentItemId": lista.getAt(i).treatmentitemid.value,
                "name": lista.getAt(i).name.value,
                "typeT": "ACK",
                "repeatT": lista.getAt(i).interval.value,
                "duration": lista.getAt(i).duration.value,
                "daytime": lista.getAt(i).isAgree.value.toString(),
                "starttime": lista.getAt(i).SelectedStart.value,
                "renderingInfo": JSON.stringify(rendering),
                "intervaldaytime": lista.getAt(i).Selected.value
            }

            lista_post.push(pom);


        }

        console.log("lista_post  " + JSON.stringify(lista_post));
        if (P_SubTreatmentID == 0 || prazno_ime != "") {
            api_call = activeUrl.URL + "/curandusproject/webapi/api/InsertActiveSubTreatment/activetreatmentid=0&providerid=" + providerId + "&patientid=" + p_patient_id + "&nametreatment=Prv&namesubtreatment=PrvS&securityToken=" + securityToken;
            show_string = "Treatment assigned to patient";
        } else {
            api_call = activeUrl.URL + "/curandusproject/webapi/api/UpdateActiveSubTreatment/subtreatmentid=" + P_SubTreatmentID + "&securityToken=" + securityToken;
            show_string = "Treatmetnt updated";
        }



        console.log("api_call " + api_call);


        fetch(api_call, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            dataType: 'json',
            body: JSON.stringify(lista_post)
        }).then(function(response) {
            status = response.status; // Get the HTTP status code
            console.log('status', status);
            response_ok = response.ok; // Is response.status in the 200-range?
            return response.json(); // This returns a promise

        }).then(function(responseObject) {

            visibility.value = "Visible";
            console.log("Success");

            console.log("parameter " + responseObject);
            var activetreatmentid = responseObject;

            // Modal.showModal(
            //     "Send Treatment ",
            //     show_string, ["OK"],
            //     function(s) {
            //         console.log("Param return " + JSON.stringify(responseObject));
            //         responseObject.num = Math.random();
            //         router.goto("main", {
            //             user: responseObject
            //         });
            //         // router.push("alert", activetreatmentid);
            //     });
            console.log("roomid.value " + roomid.value);
            console.log("show_string " + show_string);

            SendMessage.createSession(roomid.value, show_string);

            if (user_patient.value.notificationEnabled) {
                SendNotification.sendPushNotification(
                    userInfo.firstName + " " + userInfo.lastName,
                    show_string,
                    show_string,
                    "Curandus",
                    user_patient.value.regId,
                    roomid.value,
                    userInfo.firstName + " " + userInfo.lastName,
                    userInfo.chatId);
            }

            myToast.toastIt(show_string);
            responseObject.num = Math.random();
            responseObject.RoomId = roomid.value;
            responseObject.ChatId = chatid_p.value;
            console.log("JSON.stringify(responseObject) " + JSON.stringify(responseObject));
            visibility.value = "Collapsed";
            var name1 = namenovo.value;
            var name2 = namenovo2.value;
            router.goto("alert", {

                user: responseObject,
                newContact: responseObject,
                finalname: finalname.value,
                namenovo: name1,
                namenovo2: name2,
                comesfrom: "selectitems"
                    //userfullname: fullname.value
            });
            visibility.value = "Collapsed";
        }).catch(function(err) {
            console.log("Error", err.message);
            visibility.value = "Collapsed";
        });

    }
}

function toogleIsAgree(sender) {
    lista.getAt(sender.data.index.value).isAgree.value = !lista.getAt(sender.data.index.value).isAgree.value;
    console.log("subtreatmentdetail" + lista.getAt(sender.data.index.value).isAgree.value);
}

function Insert_Saved_Treatment() {

    lista_post = [];
    visibility.value = "Visible";
    load.value = "Saving..."
    console.log("Insert Save");
    var dolzina1 = lista.length;
    if (dolzina1 == 0) {
        console.log("Vnesete tretman");
        myToast.toastIt("Please enter a treatment");
    }
    var validation = CheckFields();
    if (NVL(stname.value) == "" && validation == false) {
        visibility.value = "Collapsed";
        console.log("VNESI IME I POLINJA");
        myToast.toastIt("Please enter a name and all fields");
    } else if (NVL(stname.value) == "") {
        visibility.value = "Collapsed";

        console.log("ENTER A NAME");
        myToast.toastIt("Please enter a name of the treatment");
    } else if (validation == false) {
        console.log("NE VRTI LOADIIIIIIINNNNGGGGGG !!!!!!!!!  " + providerId);
        visibility.value = "Collapsed";
        console.log("pppp  " + providerId);
        // Modal.showModal(
        //     "Message",
        //     "Please fulfill all fields in treatment", ["OK"],
        //     function(s) {});
        console.log("Please fulfill all fields in treatment and enter valid values (Repeat on days between 0-100)");
        myToast.toastIt("Please complete all fields in treatment and enter valid values (Repeat on days between 0-100)");
    } else {
        var rendering;
        for (var i = 0; i < lista.length; i++) {
            rendering = {};
            if (lista.getAt(i).name.value == "4") {
                rendering = {
                    "painlevelof": lista.getAt(i).painlevelof.value
                };
            } else if (lista.getAt(i).name.value == "5") {
                rendering = {
                    "medicinename": lista.getAt(i).medicinename.value,
                    "medicinecomment": lista.getAt(i).medicinecomment.value
                };
            } else if (lista.getAt(i).name.value == "6") {
                rendering = {
                    "sendimageof": lista.getAt(i).sendimageof.value
                };
            } else if (lista.getAt(i).name.value == "8") {
                rendering = {
                    "diet": lista.getAt(i).diet.value
                };
            } else if (lista.getAt(i).name.value == "10") {
                rendering = {
                    "hygiene": lista.getAt(i).hygiene.value
                };
            } else if (lista.getAt(i).name.value == "9") {
                rendering = {
                    "activity": lista.getAt(i).activity.value
                };
            } else if (lista.getAt(i).name.value == "11") {
                rendering = {
                    "otherinstruction": lista.getAt(i).otherinstruction.value
                };
            } else if (lista.getAt(i).name.value == "7") {
                rendering = {
                    "comparisionquestion": lista.getAt(i).comparisionquestion.value,
                    "comparisionurl": lista.getAt(i).comparisionurl.value,
                    "comparisionbase64": lista.getAt(i).comparisionbase64.value,
                    "comparisionflag": lista.getAt(i).comparisionflag.value,
                    "pateka": activeUrl.URL + "/curandusImages/"
                };
            }

            var interval_par;
            if (lista.getAt(i).isAgree.value) {
                interval_par = lista.getAt(i).Selected.value;
                lista.getAt(i).interval.value = "";
            } else {
                interval_par = lista.getAt(i).interval.value;
                lista.getAt(i).Selected.value = "";
            }

            var pom = {
                "name": lista.getAt(i).name.value,
                "typeT": "ACK",
                "repeatT": lista.getAt(i).interval.value,
                "duration": lista.getAt(i).duration.value,
                "daytime": lista.getAt(i).isAgree.value.toString(),
                "starttime": lista.getAt(i).SelectedStart.value,
                "renderingInfo": JSON.stringify(rendering),
                "intervaldaytime": lista.getAt(i).Selected.value
            }

            console.log("pom " + pom);
            lista_post.push(pom);
        }
        // if (P_SubTreatmentID==0){
        //  api_call="http://192.168.1.110:8080/curobjectandusproject/webapi/api/InsertActiveSubTreatment/activetreatmentid=0&providerid=2&patientid=1&nametreatment=Prv&namesubtreatment=PrvS&securityToken=" + securityToken;
        // }
        // else{
        //  api_call="http://192.168.1.110:8080/curandusproject/webapi/api/UpdateActiveSubTreatment";
        // }
        var userInfo = Storage.readSync("userInfo");

        var call_api = activeUrl.URL + "/curandusproject/webapi/api/insertsavedtreatment/providerid=" + providerId + "&nametreatment=" + encodeURIComponent(stname.value) + "&securityToken=" +
            securityToken;

        // console.log("nametreatment " + stname.value);

        //  console.log("nametreatment " + call_api);

        //  console.log("lista " + lista_post);

        //  console.log("lista " + JSON.stringify(lista_post));


        fetch(call_api, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            dataType: 'json',
            body: JSON.stringify(lista_post)
        }).then(function(response) {
            status = response.status; // Get the HTTP status code
            console.log('status', status);
            response_ok = response.ok; // Is response.status in the 200-range?
            return response.json(); // This returns a promise

        }).then(function(responseObject) {

            if (responseObject == 0) {
                console.log("Success");
                // Modal.showModal(
                //     "Save Treatment Template",
                //     "You save treatment succesfully", ["OK"],
                //     function(s) {
                //         goToSavedTreatments();
                //     });

                myToast.toastIt("Treatment saved");
                goToSavedTreatments();
            } else {
                console.log("klik");
                Modal.showModal(
                    "Save Treatment Template",
                    "Are you sure you want to overide this treatment?", ["Yes", "No"],
                    function(s) {
                        //debug_log("Got callback with " + s);
                        if (s == "Yes") {
                            visibility.value = "Visible";
                            fetch(activeUrl.URL + "/curandusproject/webapi/api/updatesavedtreatment/savedtreatmentid=" + responseObject + "&securityToken=" +
                                securityToken, {
                                    method: 'POST',
                                    headers: {
                                        "Content-type": "application/json"
                                    },
                                    dataType: 'json',
                                    body: JSON.stringify(lista_post)
                                }).then(function(response) {
                                status = response.status; // Get the HTTP status code
                                console.log('status', status);
                                response_ok = response.ok; // Is response.status in the 200-range?
                                return response.json(); // This returns a promise

                            }).then(function(responseObject) {
                                console.log("Success");
                                // Modal.showModal(
                                //     "Save Treatment Template",
                                //     "You save treatment succesfully", ["OK"],
                                //     function(s) {
                                //         goToSavedTreatments();
                                //     });
                                myToast.toastIt("Treatment saved");
                                goToSavedTreatments();
                                visibility.value = "Collapsed";
                            }).catch(function(err) {
                                console.log("Error", err.message);
                                visibility.value = "Collapsed";
                            });
                        }
                    });
            }
            visibility.value = "Collapsed";
        }).catch(function(err) {
            visibility.value = "Collapsed";
            console.log("Error", err.message);
        });
    }
}

module.exports = {
    lista: lista,
    itemsTwo: itemsTwo,
    whenStart: whenStart,
    toogleIsAgree: toogleIsAgree,
    Insert_Treatment1: Insert_Treatment1,
    roomid: roomid,
    NewItem: NewItem,
    Insert_Treatment: Insert_Treatment,
    lista_post: lista_post,
    AddNewItem: AddNewItem,
    ChekNameTreatment: ChekNameTreatment,
    stname: stname,
    Insert_Saved_Treatment: Insert_Saved_Treatment,
    CheckFields: CheckFields,
    p_enabled: p_enabled,
    goToSavedTreatments: goToSavedTreatments,
    NVL: NVL,
    user_patient: user_patient,
    ShowAlergies: ShowAlergies,
    WarningInfo: WarningInfo,
    flag: flag,
    selectImage: selectImage,
    takePicture: takePicture,
    RemoveItem: RemoveItem,

    imagePath: imagePath,
    takePictureShow: takePictureShow,
    selectImageShow: selectImageShow,
    imageName: imageName,
    imageSize: imageSize,
    visibility: visibility,
    autoComplete: autoComplete,
    machFound: machFound,
    medicinename: medicinename,
    matchData: matchData,
    optionSelected: optionSelected,
    setFlag: setFlag,
    load: load,
    patientname: patientname

};