var Observable = require('FuseJS/Observable');
var activeUrl = require("Constants/SERVICE_URL.js");
var CameraRoll = require("FuseJS/CameraRoll");
var Camera = require("FuseJS/Camera");
var ImageTools = require("FuseJS/ImageTools");
var Storage = require("FuseJS/Storage");
var securityToken2 = Storage.readSync("securityToken2");
var myToast = require("myToast");
var imagePath = Observable("../../Assets/placeholder.png");
var imageName = Observable();
var imageSize = Observable();
var name = Observable();
var surname = Observable();
var chronicDiseases = Observable();
var allergies = Observable();
var medicationsThatRecieves = Observable();
var additionalInnfo = Observable();
var sendData = {};
var base64Code = {};
var flag = Observable("no_picture");
var part = Observable();
var SendMessage = require("Scripts/SendMessage.js");
var RoomId = Observable();
var visibility = Observable("Collapsed");
var load = Observable("Sending Image...");
imagePath.value = "../../Assets/placeholder.png";
var SendNotification = require('Scripts/SendNotification.js');
var RegId = Observable();
var Storage = require("FuseJS/Storage");
var item = Observable();
var User = {};

this.onParameterChanged(function(param) {

    Storage.read("patientInfo").then(function(content) {
        User = JSON.parse(content);
        console.log("JSON.stringify(User));  " + JSON.stringify(User));
    }, function(error) {});

    item = param.treatmentitemlist;
    var p = JSON.parse(JSON.parse(param.treatmentitemlist.renderingInfo));
    part.value = p.sendimageof;
    RoomId.value = param.treatmentitemlist.roomId;
    RegId.value = param.treatmentitemlist.regId;
    sendData.value = param.treatmentitemlist;
    //console.log("item objektot vo send image: " + JSON.stringify(param.treatmentitemlist)); 
    console.log("send data: " + JSON.stringify(sendData));

});


var displayImage = function(image) {
    imagePath.value = image.path;
    imageName.value = image.name;
    imageSize.value = image.width + "x" + image.height;
}


// dodadeno od moki samo za prikaz na slika bez da zapishuva vo baza (LOAD)
function selectImageShow() {
    flag.value = "load"
        // imagePath.value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSba28jhaQEIVyA53dkQLz_NKo9As4-KHa22fxaiRqyfv4C2zw_Kw";
    console.log("Vleze vo selectImageShow: ");
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

                            base64Code = {
                                "base64": image
                            };
                            //console.log("vleze vo selectImageShow i ova e kodot: "+base64Code.base64.substr(1, 100)); 
                        }).then(function(err) {
                            console.log(err);
                        });

                    displayImage(image);
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

function takePictureShow() {
    flag.value = "camera";
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

                            base64Code = {
                                "base64": image
                            };
                            //console.log("vleze vo takePictureShow i ova e kodot: "+base64Code.base64.substr(1, 100));
                        });

                    displayImage(image);
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

function goToMain() {
    var obj = {
        "num": Math.random()
    }
    router.goto("main", obj);
}

function updatePatient(brojSlika) {
    var sendimage = {
        "imageUrl": "" + brojSlika
    };
    console.log("Update patient called...with num picture: " + brojSlika);
    console.log("Update patient called...sendData: " + JSON.stringify(sendData.value.activetreatmentid));
    //var picture = activeUrl.URL + "/curandusImages/" + brojSlika + ".jpg";

    var data = {
        "createdBy": sendData.value.createdBy,
        "treatmentItemListId": sendData.value.treatmentItemListId,
        "status": "DONE",
        "responseInfo": JSON.stringify(sendimage),
        "created": sendData.value.created,
        // "modified": sendData.value.modified, 
        "modifiedBy": sendData.value.modifiedBy
    };

    console.log("so ova se povikuva update na sendData.treatmentItemListId: " + JSON.stringify(data));

    fetch(activeUrl.URL + "/curandusproject/webapi/api/updatetreatmenitemlist/TreatmentItemListId=" + sendData.value.treatmentItemListId, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            'securityToken2': securityToken2
        },
        dataType: 'json',
        body: JSON.stringify(data)
    }).then(function(response) {
        status = response.status; // Get the HTTP status code
        return response.json(); // This returns a promise

    }).then(function(responseObject) {
        console.log("this is the data returned from update: " + JSON.stringify(responseObject));
        myToast.toastIt("Picture have been sent.");
        flag.value = "no_picture";
        console.log("Success vo temperature : " + JSON.stringify(responseObject));
        SendMessage.createSession(RoomId.value, "Picture sent. ");

        if (item.notificationEnabled == 1) {
            SendNotification.sendPushNotification(
                User.FirstName + " " + User.LastName,
                "Picture sent. ",
                "Picture sent. ",
                "Curandus",
                RegId.value,
                RoomId.value,
                User.FirstName + " " + User.LastName,
                User.ChatId);
        }

        goToMain();

    }).catch(function(err) {
        console.log("tuka vo Error");
        console.log("Error", err.message);

    });



}




function SendImage() {
    if (flag.value == "load" || flag.value == "camera") {

        ///////// save picture to local server ///////////
        var tmp = {
            "name": "edit profile",
            "duration": "3",
            "status": "1",
            "createdBy": 0,
            "modifiedBy": 0,
            "created": null,
            "modified": null,
            "typeT": "ACK",
            "renderingInfo": JSON.stringify(base64Code),
            "repeatT": "5",
            "subtreatmentid": 18
        };
        visibility.value = "Visible";

        var url1 = activeUrl.URL + "/curandusproject/webapi/api/inserttreatmentitemimage";
        //var url1 = "http://192.168.0.110:8080/curandusproject/webapi/api/inserttreatmentitemimage";
        fetch(url1, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                'securityToken2': securityToken2
            },
            dataType: 'json',
            body: JSON.stringify(tmp)
        }).then(function(response) {
            status = response.status; // Get the HTTP status code 
            console.log('status', status);
            response_ok = response.ok; // Is response.status in the 200-range? 
            return response.json(); // This returns a promise 

        }).then(function(responseObject) {

            flag.value = "storage";
            console.log("broj na slika: " + responseObject);

            // zapishuvanje vo local storage broj na slika 
            if (responseObject != 0) {
                imagePath.value = activeUrl.URL + "\/curandusImages" + "\/" + responseObject + ".jpg";

                /// call update for writting picture url to responseInfo for this patient            
                updatePatient(responseObject);


            } else {
                console.log("ne pominuva update:");
            }
            visibility.value = "Collapsed";

        }).catch(function(err) {
            console.log("ova vo error", err.message);
            visibility.value = "Visible";
        });
    } //end if 
    else {
        console.log("there is no picture selected");
        visibility.value = "Collapsed";
    }

}


removePicture = function() {
    console.log("this is picture remove!");
    flag.value = "no_picture";
}



module.exports = {
    selectImageShow: selectImageShow,
    imagePath: imagePath,
    imageName: imageName,
    imageSize: imageSize,
    removePicture: removePicture,
    name: name,
    surname: surname,
    chronicDiseases: chronicDiseases,
    allergies: allergies,
    medicationsThatRecieves: medicationsThatRecieves,
    additionalInnfo: additionalInnfo,
    part: part,
    takePictureShow: takePictureShow,
    SendImage: SendImage,
    flag: flag,
    goToMain: goToMain,
    visibility: visibility,
    load: load
};