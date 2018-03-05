var Storage = require("FuseJS/Storage");
var Environment = require('FuseJS/Environment');
var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var QConfig = require('Scripts/quickbloxConfig.js');
var myToast = require("myToast");
var p_patientID = "";
var isAgree = Observable(false);
var p_reg_id = Observable();
//var phone_obj = Observable();
//var send_data = Observable();
var User = "";
var Lifecycle = require('FuseJS/Lifecycle');
var push = require("FuseJS/Push");
var vibration = require('FuseJS/Vibration');
var load = Observable("Loading");
var hasNotification = Observable(false);
var visibility = Observable("Collapsed");
//var apn = require('apn');

Storage.write("notification", "welcome");

function diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

}

Date.prototype.addHours = function(h) {
    this.setHours(this.getHours() + h);
    return this;
}

console.log("Environment " + Environment.preview);
Lifecycle.on("enteringForeground", function() {
    //stateApp.value = "background";
});

Lifecycle.on("enteringInteractive", function() {
    console.log("on enteringInteractive");
    console.log("on enteringForeground so kreiranje na token ");

    var urlGenerateToken1 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken1";
    var send_data = {
        "appID": QConfig.appId,
        "auth_key": QConfig.authKey,
        "user": "Admin",
        "password": "hsadjkvlhs8FhgasG62h1tlasdnhlsdfk"

    }
    var currentdate = new Date();

    Storage.read("expiryDate").then(function(content) {

        if (JSON.parse(Storage.readSync("expiryDate")).getTime() < currentdate.getTime()) {
            console.log("BEFORE CALL generateSecurityToken 1!");
            fetch(urlGenerateToken1, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                dataType: 'json',
                body: JSON.stringify(send_data)

            }).then(function(response) {
                console.log("Vleze vo console log");
                status = response.status; // Get the HTTP status code
                response_ok = response.ok; // Is response.status in the 200-range?
                return response.json(); // This returns a promise
            }).then(function(data) {
                console.log("FIRST SECURITY TOKEN IS GENERATED!");
                console.log("responseObject data: " + data);
                var tokenInfo = Observable();
                tokenInfo.value = data;
                var currentdate7 = new Date().addHours(1);
                Storage.write("securityToken1", JSON.stringify(data));
                Storage.write("expiryDate", JSON.stringify(currentdate7));
                console.log("FIRST SECURITY TOKEN GENERATED AND VALUE AND EXPIRYDATE SAVED IN STORAGE!");

                Storage.read("userInfo").then(function(content) {
                    User = JSON.parse(content);
                    console.log("User " + JSON.stringify(User));
                    console.log("content vo welcome " + content);
                    // p_patientID = Storage.readSync("patientInfo");
                    //p_patientID = User.PatientId;
                    // //debug_log("Registered");
                    //console.log("procitaj od storage " + JSON.stringify(p_patientID));
                    var urlGenerateToken2 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken2";
                    var phone_obj = {
                        "phone": User.phone,
                        "userType": "provider"
                    }

                    console.log("BEFORE CALL generateSecurityToken2!");
                    fetch(urlGenerateToken2, {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json",
                            'securityToken1': Storage.readSync("securityToken1")
                        },
                        dataType: 'json',
                        body: JSON.stringify(phone_obj)

                    }).then(function(response) {
                        console.log("Vleze vo console log");
                        status = response.status; // Get the HTTP status code
                        response_ok = response.ok; // Is response.status in the 200-range?
                        return response.json(); // This returns a promise
                    }).then(function(data) {
                        console.log("SECOND SECURITY TOKEN GENERATED AND NEW VALUE SAVED IN WELCOME PAGE!");
                        console.log("responseObject data: " + data);
                        console.log("Before STORING IN tokenInfo!");
                        var tokenInfo = Observable();
                        tokenInfo.value = data;
                        Storage.write("securityToken2", JSON.stringify(data));

                        setTimeout(function() {
                            Storage.read("notification_previous").then(function(content) {
                                if (hasNotification.value == false) {
                                    console.log("notification vo enteringInteractive : " + content);
                                    Storage.write("notification", content);
                                } else {
                                    hasNotification.value = false;
                                }
                                // Storage.write("notification_previous", "welcome");
                                // console.log("notification_previous", "welcome");
                            }, function(error) {
                                console.log("error vo citanje od storage");
                            });

                        }, 1000);

                    }).catch(function(err) {
                        console.log("Fetch data error");
                        console.log(err.message);
                    });
                }, function(error) {
                    // //debug_log("Not Registered");
                    // goToLogin();
                });

                // Storage.write("securityToken", securityToken));
            }).catch(function(err) {
                console.log("Fetch data error");
                console.log(err.message);
            });
        } else {
            var urlUpdateToken1 = activeUrl.URL + "/curandusproject/webapi/api/updateSecurityToken1";
            if (diff_minutes(JSON.parse(Storage.readSync("expiryDate")), currentdate) < 10) {
                console.log("BEFORE CALL updateSecurityToken 1!");
                fetch(urlUpdateToken1, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        'securityToken1': Storage.readSync("securityToken1")
                    },
                    dataType: 'json',
                    body: JSON.stringify(send_data)

                }).then(function(response) {
                    console.log("Vleze vo console log");
                    status = response.status; // Get the HTTP status code
                    response_ok = response.ok; // Is response.status in the 200-range?
                    return response.json(); // This returns a promise
                }).then(function(data) {
                    console.log("FIRST SECURITY TOKEN IS UPDATED!");
                    console.log("responseObject data: " + data);
                    var tokenInfo = Observable();
                    tokenInfo.value = data;
                    var currentdate1 = new Date().addHours(1);
                    Storage.write("securityToken1", JSON.stringify(data));
                    Storage.write("expiryDate", JSON.stringify(currentdate1));
                    console.log("FIRST SECURITY TOKEN UPDATED AND NEW VALUE AND EXPIRY DATETIME SAVED IN STORAGE!");

                    Storage.read("userInfo").then(function(content) {
                        User = JSON.parse(content);
                        console.log("User " + JSON.stringify(User));
                        console.log("content vo welcome " + content);
                        // p_patientID = Storage.readSync("patientInfo");
                        //p_patientID = User.PatientId;
                        // //debug_log("Registered");
                        //console.log("procitaj od storage " + JSON.stringify(p_patientID));
                        var urlUpdateToken2 = activeUrl.URL + "/curandusproject/webapi/api/updateSecurityToken2";
                        var phone_obj = {
                            "phone": User.phone,
                            "userType": "provider"
                        }

                        console.log("BEFORE CALL updateSecurityToken2!");
                        fetch(urlUpdateToken2, {
                            method: 'POST',
                            headers: {
                                "Content-type": "application/json",
                                'securityToken1': Storage.readSync("securityToken1"),
                                'securityToken2': Storage.readSync("securityToken2")
                            },
                            dataType: 'json',
                            body: JSON.stringify(phone_obj)

                        }).then(function(response) {
                            console.log("Vleze vo console log");
                            status = response.status; // Get the HTTP status code
                            response_ok = response.ok; // Is response.status in the 200-range?
                            return response.json(); // This returns a promise
                        }).then(function(data) {
                            console.log("SECOND SECURITY TOKEN UPDATED AND SAVED IN WELCOME PAGE!");
                            console.log("responseObject data: " + data);
                            console.log("Before STORING IN tokenInfo!");
                            var tokenInfo = Observable();
                            tokenInfo.value = data;
                            Storage.write("securityToken2", JSON.stringify(data));

                            setTimeout(function() {
                                Storage.read("notification_previous").then(function(content) {
                                    if (hasNotification.value == false) {
                                        console.log("notification vo enteringInteractive : " + content);
                                        Storage.write("notification", content);
                                    } else {
                                        hasNotification.value = false;
                                    }
                                    // Storage.write("notification_previous", "welcome");
                                    // console.log("notification_previous", "welcome");
                                }, function(error) {
                                    console.log("error vo citanje od storage");
                                });

                            }, 1000);

                        }).catch(function(err) {
                            console.log("Fetch data error");
                            console.log(err.message);
                        });

                    }, function(error) {
                        // //debug_log("Not Registered");
                        // goToLogin();
                    });

                    // Storage.write("securityToken", securityToken));
                }).catch(function(err) {
                    console.log("Fetch data error");
                    console.log(err.message);
                });

            } else {
                setTimeout(function() {
                    Storage.read("notification_previous").then(function(content) {
                        if (hasNotification.value == false) {
                            console.log("notification vo enteringInteractive : " + content);
                            Storage.write("notification", content);
                        } else {
                            hasNotification.value = false;
                        }
                        // Storage.write("notification_previous", "welcome");
                        // console.log("notification_previous", "welcome");
                    }, function(error) {
                        console.log("error vo citanje od storage");
                    });
                }, 1000);

            }

        }

    }, function(error) {
        console.log("error vo citanje od storage");
        console.log("BEFORE CALL generateSecurityToken 1!");
        fetch(urlGenerateToken1, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            dataType: 'json',
            body: JSON.stringify(send_data)

        }).then(function(response) {
            console.log("Vleze vo console log");
            status = response.status; // Get the HTTP status code
            response_ok = response.ok; // Is response.status in the 200-range?
            return response.json(); // This returns a promise
        }).then(function(data) {
            console.log("FIRST SECURITY TOKEN IS GENERATED!");
            console.log("responseObject data: " + data);
            var tokenInfo = Observable();
            tokenInfo.value = data;
            var currentdate7 = new Date().addHours(1);
            Storage.write("securityToken1", JSON.stringify(data));
            Storage.write("expiryDate", JSON.stringify(currentdate7));
            console.log("FIRST SECURITY TOKEN GENERATED AND VALUE AND EXPIRYDATE SAVED IN STORAGE!");

            Storage.read("userInfo").then(function(content) {
                User = JSON.parse(content);
                console.log("User " + JSON.stringify(User));
                console.log("content vo welcome " + content);
                // p_patientID = Storage.readSync("patientInfo");
                //p_patientID = User.PatientId;
                // //debug_log("Registered");
                //console.log("procitaj od storage " + JSON.stringify(p_patientID));
                var urlGenerateToken2 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken2";
                var phone_obj = {
                    "phone": User.phone,
                    "userType": "provider"
                }

                console.log("BEFORE CALL generateSecurityToken2!");
                fetch(urlGenerateToken2, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        'securityToken1': Storage.readSync("securityToken1")
                    },
                    dataType: 'json',
                    body: JSON.stringify(phone_obj)

                }).then(function(response) {
                    console.log("Vleze vo console log");
                    status = response.status; // Get the HTTP status code
                    response_ok = response.ok; // Is response.status in the 200-range?
                    return response.json(); // This returns a promise
                }).then(function(data) {
                    console.log("SECOND SECURITY TOKEN GENERATED AND NEW VALUE SAVED IN WELCOME PAGE!");
                    console.log("responseObject data: " + data);
                    console.log("Before STORING IN tokenInfo!");
                    var tokenInfo = Observable();
                    tokenInfo.value = data;
                    Storage.write("securityToken2", JSON.stringify(data));

                    setTimeout(function() {
                        Storage.read("notification_previous").then(function(content) {
                            if (hasNotification.value == false) {
                                console.log("notification vo enteringInteractive : " + content);
                                Storage.write("notification", content);
                            } else {
                                hasNotification.value = false;
                            }
                            // Storage.write("notification_previous", "welcome");
                            // console.log("notification_previous", "welcome");
                        }, function(error) {
                            console.log("error vo citanje od storage");
                        });

                    }, 1000);

                }).catch(function(err) {
                    console.log("Fetch data error");
                    console.log(err.message);
                });

            }, function(error) {
                // //debug_log("Not Registered");
                // goToLogin();
            });

            // Storage.write("securityToken", securityToken));
        }).catch(function(err) {
            console.log("Fetch data error");
            console.log(err.message);
        });

    });



    // if ((JSON.parse(Storage.readSync("expiryDate"))) ||
    //     (JSON.parse(Storage.readSync("expiryDate")).getTime() < currentdate.getTime())) {
    // your code here.


});

Lifecycle.on("exitedInteractive", function() {
    Storage.read("notification").then(function(content) {
        console.log("notification_previous exitedInteractive: " + content);
        Storage.write("notification_previous", content);
        Storage.write("notification", "welcome");
        console.log("on exitedInteractive");
    }, function(error) {
        console.log("error vo citanje od storage");
    });
});

Lifecycle.on("enteringBackground", function() {
    console.log("on enteringBackground");
});
Lifecycle.on("stateChanged", function(newState) {
    console.log("on stateChanged " + newState);
});
// var continueFlag = Observable();
push.on("registrationSucceeded", function(regID) {
    console.log("regID " + regID);
    p_reg_id.value = regID;
});

push.on("error", function(reason) {
    console.log("Reg Failed: " + reason);
});

push.on("receivedMessage", function(payload, fromNotificationBar) {
    if (fromNotificationBar == true) {
        var currentdate = new Date();
        Storage.read("expiryDate").then(function(content) {
            if (JSON.parse(Storage.readSync("expiryDate")).getTime() < currentdate.getTime()) {

                //if (1 == 0) {
                var urlGenerateToken1 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken1";
                var send_data = {
                    "appID": QConfig.appId,
                    "auth_key": QConfig.authKey,
                    "user": "Admin",
                    "password": "hsadjkvlhs8FhgasG62h1tlasdnhlsdfk"

                }

                console.log("BEFORE CALL generateSecurityToken 1!");
                fetch(urlGenerateToken1, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    dataType: 'json',
                    body: JSON.stringify(send_data)

                }).then(function(response) {
                    console.log("Vleze vo console log");
                    status = response.status; // Get the HTTP status code
                    response_ok = response.ok; // Is response.status in the 200-range?
                    return response.json(); // This returns a promise
                }).then(function(data) {
                    console.log("FIRST SECURITY TOKEN IS GENERATED!");
                    console.log("responseObject data: " + data);
                    var tokenInfo = Observable();
                    tokenInfo.value = data;

                    var currentdate8 = new Date().addHours(1);
                    Storage.write("securityToken1", JSON.stringify(data));
                    Storage.write("expiryDate", JSON.stringify(currentdate8));
                    console.log("FIRST SECURITY TOKEN GENERATED AND VALUE AND EXPIRY DATETIME SAVED IN STORAGE!");

                    Storage.read("userInfo").then(function(content) {
                        User = JSON.parse(content);
                        console.log("User " + JSON.stringify(User));
                        console.log("content vo welcome " + content);
                        // p_patientID = Storage.readSync("patientInfo");
                        //p_patientID = User.PatientId;
                        // //debug_log("Registered");
                        //console.log("procitaj od storage " + JSON.stringify(p_patientID));
                        var urlGenerateToken2 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken2";
                        var phone_obj = {
                            "phone": User.phone,
                            "userType": "provider"
                        }

                        console.log("BEFORE CALL generateSecurityToken2!");
                        fetch(urlGenerateToken2, {
                            method: 'POST',
                            headers: {
                                "Content-type": "application/json",
                                'securityToken1': Storage.readSync("securityToken1")
                            },
                            dataType: 'json',
                            body: JSON.stringify(phone_obj)

                        }).then(function(response) {
                            console.log("Vleze vo console log");
                            status = response.status; // Get the HTTP status code
                            response_ok = response.ok; // Is response.status in the 200-range?
                            return response.json(); // This returns a promise
                        }).then(function(data) {
                            console.log("SECOND SECURITY TOKEN GENERATED AND SAVED IN WELCOME PAGE!");
                            console.log("responseObject data: " + data);
                            console.log("Before STORING IN tokenInfo!");
                            var tokenInfo = Observable();
                            tokenInfo.value = data;
                            Storage.write("securityToken2", JSON.stringify(data));

                            push.clearAllNotifications();
                            hasNotification.value = true;
                            //myToast.toastIt("Stigna vo welcome page ");
                            //vibration.vibrate(0.8);
                            console.log("Recieved Push NotificaNotificationtion vo welcome page: " + payload);
                            Storage.write("notification_previous", "welcome");
                            Storage.write("notification", "chat");
                            router.push("chat", {
                                odwelcome: JSON.parse((JSON.parse(payload)).notification).alert
                            });

                        }).catch(function(err) {
                            console.log("Fetch data error");
                            console.log(err.message);
                        });


                    }, function(error) {
                        // //debug_log("Not Registered");
                        // goToLogin();
                    });



                }).catch(function(err) {
                    console.log("Fetch data error");
                    console.log(err.message);
                });


            } else {

                var urlUpdateToken1 = activeUrl.URL + "/curandusproject/webapi/api/updateSecurityToken1";

                if (diff_minutes(JSON.parse(Storage.readSync("expiryDate")), currentdate) < 10) {
                    console.log("BEFORE CALL updateSecurityToken 1!");
                    fetch(urlUpdateToken1, {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json",
                            'securityToken1': Storage.readSync("securityToken1")
                        },
                        dataType: 'json',
                        body: JSON.stringify(send_data)

                    }).then(function(response) {
                        console.log("Vleze vo console log");
                        status = response.status; // Get the HTTP status code
                        response_ok = response.ok; // Is response.status in the 200-range?
                        return response.json(); // This returns a promise
                    }).then(function(data) {
                        console.log("FIRST SECURITY TOKEN IS UPDATED!");
                        console.log("responseObject data: " + data);
                        var tokenInfo = Observable();
                        tokenInfo.value = data;
                        var currentdate1 = new Date().addHours(1);
                        Storage.write("securityToken1", JSON.stringify(data));
                        Storage.write("expiryDate", JSON.stringify(currentdate1));
                        console.log("FIRST SECURITY TOKEN UPDATED AND NEW VALUE AND EXPIRY DATETIME SAVED IN STORAGE!");

                        Storage.read("userInfo").then(function(content) {
                            User = JSON.parse(content);
                            console.log("User " + JSON.stringify(User));
                            console.log("content vo welcome " + content);
                            // p_patientID = Storage.readSync("patientInfo");
                            //p_patientID = User.PatientId;
                            // //debug_log("Registered");
                            //console.log("procitaj od storage " + JSON.stringify(p_patientID));
                            var urlUpdateToken2 = activeUrl.URL + "/curandusproject/webapi/api/updateSecurityToken2";
                            var phone_obj = {
                                "phone": User.phone,
                                "userType": "provider"
                            }

                            console.log("BEFORE CALL updateSecurityToken2!");
                            fetch(urlUpdateToken2, {
                                method: 'POST',
                                headers: {
                                    "Content-type": "application/json",
                                    'securityToken1': Storage.readSync("securityToken1"),
                                    'securityToken2': Storage.readSync("securityToken2")
                                },
                                dataType: 'json',
                                body: JSON.stringify(phone_obj)

                            }).then(function(response) {
                                console.log("Vleze vo console log");
                                status = response.status; // Get the HTTP status code
                                response_ok = response.ok; // Is response.status in the 200-range?
                                return response.json(); // This returns a promise
                            }).then(function(data) {
                                console.log("SECOND SECURITY TOKEN UPDATED AND SAVED IN WELCOME PAGE!");
                                console.log("responseObject data: " + data);
                                console.log("Before STORING IN tokenInfo!");
                                var tokenInfo = Observable();
                                tokenInfo.value = data;
                                Storage.write("securityToken2", JSON.stringify(data));

                                push.clearAllNotifications();
                                hasNotification.value = true;
                                //myToast.toastIt("Stigna vo welcome page ");
                                //vibration.vibrate(0.8);
                                console.log("Recieved Push NotificaNotificationtion vo welcome page: " + payload);
                                Storage.write("notification_previous", "welcome");
                                Storage.write("notification", "chat");
                                router.push("chat", {
                                    odwelcome: JSON.parse((JSON.parse(payload)).notification).alert
                                });


                            }).catch(function(err) {
                                console.log("Fetch data error");
                                console.log(err.message);
                            });

                        }, function(error) {
                            // //debug_log("Not Registered");
                            // goToLogin();
                        });

                        // Storage.write("securityToken", securityToken));
                    }).catch(function(err) {
                        console.log("Fetch data error");
                        console.log(err.message);
                    });

                } else {
                    Storage.read("userInfo").then(function(content) {

                        push.clearAllNotifications();
                        hasNotification.value = true;
                        //myToast.toastIt("Stigna vo welcome page ");
                        //vibration.vibrate(0.8);
                        console.log("Recieved Push NotificaNotificationtion vo welcome page: " + payload);
                        Storage.write("notification_previous", "welcome");
                        Storage.write("notification", "chat");
                        router.push("chat", {
                            odwelcome: JSON.parse((JSON.parse(payload)).notification).alert;
                        });


                    }, function(error) {

                    });

                }

            }


        }, function(error) {
            console.log("Token not defined.");

            //if (1 == 0) {
            var urlGenerateToken1 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken1";
            var send_data = {
                "appID": QConfig.appId,
                "auth_key": QConfig.authKey,
                "user": "Admin",
                "password": "hsadjkvlhs8FhgasG62h1tlasdnhlsdfk"

            }

            console.log("BEFORE CALL generateSecurityToken 1!");
            fetch(urlGenerateToken1, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                dataType: 'json',
                body: JSON.stringify(send_data)

            }).then(function(response) {
                console.log("Vleze vo console log");
                status = response.status; // Get the HTTP status code
                response_ok = response.ok; // Is response.status in the 200-range?
                return response.json(); // This returns a promise
            }).then(function(data) {
                console.log("FIRST SECURITY TOKEN IS GENERATED!");
                console.log("responseObject data: " + data);
                var tokenInfo = Observable();
                tokenInfo.value = data;

                var currentdate8 = new Date().addHours(1);
                Storage.write("securityToken1", JSON.stringify(data));
                Storage.write("expiryDate", JSON.stringify(currentdate8));
                console.log("FIRST SECURITY TOKEN GENERATED AND VALUE AND EXPIRY DATETIME SAVED IN STORAGE!");

                Storage.read("userInfo").then(function(content) {
                    User = JSON.parse(content);
                    console.log("User " + JSON.stringify(User));
                    console.log("content vo welcome " + content);
                    // p_patientID = Storage.readSync("patientInfo");
                    //p_patientID = User.PatientId;
                    // //debug_log("Registered");
                    //console.log("procitaj od storage " + JSON.stringify(p_patientID));
                    var urlGenerateToken2 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken2";
                    var phone_obj = {
                        "phone": User.phone,
                        "userType": "provider"
                    }

                    console.log("BEFORE CALL generateSecurityToken2!");
                    fetch(urlGenerateToken2, {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json",
                            'securityToken1': Storage.readSync("securityToken1")
                        },
                        dataType: 'json',
                        body: JSON.stringify(phone_obj)

                    }).then(function(response) {
                        console.log("Vleze vo console log");
                        status = response.status; // Get the HTTP status code
                        response_ok = response.ok; // Is response.status in the 200-range?
                        return response.json(); // This returns a promise
                    }).then(function(data) {
                        console.log("SECOND SECURITY TOKEN GENERATED AND SAVED IN WELCOME PAGE!");
                        console.log("responseObject data: " + data);
                        console.log("Before STORING IN tokenInfo!");
                        var tokenInfo = Observable();
                        tokenInfo.value = data;
                        Storage.write("securityToken2", JSON.stringify(data));

                        push.clearAllNotifications();
                        hasNotification.value = true;
                        //myToast.toastIt("Stigna vo welcome page ");
                        //vibration.vibrate(0.8);
                        console.log("Recieved Push NotificaNotificationtion vo welcome page: " + payload);
                        Storage.write("notification_previous", "welcome");
                        Storage.write("notification", "chat");
                        router.push("chat", {
                            odwelcome: JSON.parse((JSON.parse(payload)).notification).alert
                        });

                    }).catch(function(err) {
                        console.log("Fetch data error");
                        console.log(err.message);
                    });

                }, function(error) {
                    // //debug_log("Not Registered");
                    // goToLogin();
                });


            }).catch(function(err) {
                console.log("Fetch data error");
                console.log(err.message);
            });

        });
    }
});

// continueFlag.value="gray";
isLogged();


function toogleIsAgree() {
    isAgree.value = !isAgree.value;

    // if(isAgree.value=="false"){
    //     continueFlag.value="gray";
    // }
    // else{
    //     continueFlag.value="primary";
    // }
}

function isLogged() {
    visibility.value = "Visible";
    console.log("is logged povikana: " + Storage.readSync("userInfo"));

    Storage.read("userInfo").then(function(content) {
        if (JSON.parse(Storage.readSync("expiryDate")).getTime() < currentdate.getTime()) {

            User = JSON.parse(content);
            console.log("User " + JSON.stringify(User));
            console.log("content vo welcome " + content);
            var url1 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken1";
            var send_data = {
                "appID": QConfig.appId,
                "auth_key": QConfig.authKey,
                "user": "Admin",
                "password": "hsadjkvlhs8FhgasG62h1tlasdnhlsdfk"
            }
            console.log("BEFORE CALL generateSecurityToken!");
            fetch(url1, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                dataType: 'json',
                body: JSON.stringify(send_data)
            }).then(function(response) {
                console.log("Vleze vo console log");
                status = response.status; // Get the HTTP status code
                response_ok = response.ok; // Is response.status in the 200-range?
                return response.json(); // This returns a promise
            }).then(function(data) {
                console.log("SECURITY TOKEN IS GENERATED!");
                console.log("responseObject data: " + data);
                var tokenInfo = Observable();
                tokenInfo.value = data;
                var currentdate22 = new Date().addHours(1);
                Storage.write("expiryDate", JSON.stringify(currentdate22));
                Storage.write("securityToken1", JSON.stringify(data));


                console.log("SECURITY TOKEN GENERATED AND SAVED IN STORAGE! " + tokenInfo.value);
                var url2 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken2";
                var phone_obj = {
                    "phone": User.phone,
                    "userType": "provider"
                }
                console.log("BEFORE CALL generateSecurityToken2!");
                fetch(url2, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        'securityToken1': Storage.readSync("securityToken1")
                    },
                    dataType: 'json',
                    body: JSON.stringify(phone_obj)
                }).then(function(response) {
                    console.log("Vleze vo console log " + response.status);
                    status = response.status; // Get the HTTP status code
                    response_ok = response.ok; // Is response.status in the 200-range?
                    return response.json(); // This returns a promise
                }).then(function(data2) {
                    console.log("SECOND SECURITY TOKEN GENERATED AND SAVED IN WELCOME PAGE!");
                    console.log("responseObject data: " + data2);
                    console.log("Before STORING IN tokenInfo!");
                    var tokenInfo2 = Observable();
                    tokenInfo2.value = data2;
                    Storage.write("securityToken2", JSON.stringify(data2));
                    console.log("Before main");
                    visibility.value = "Collapsed";
                    goToMain();
                    // Storage.write("securityToken", securityToken));
                }).catch(function(err) {
                    console.log("Fetch data error");
                    console.log(err.message);
                });
                // Storage.write("securityToken", securityToken));
            }).catch(function(err) {
                console.log("Fetch data error");
                console.log(err.message);
            });

        } else {
            if (diff_minutes(JSON.parse(Storage.readSync("expiryDate")), currentdate) < 10) {
                User = JSON.parse(content);
                console.log("User " + JSON.stringify(User));
                console.log("content vo welcome " + content);
                var url1 = activeUrl.URL + "/curandusproject/webapi/api/updateSecurityToken1";
                var send_data = {
                    "appID": QConfig.appId,
                    "auth_key": QConfig.authKey,
                    "user": "Admin",
                    "password": "hsadjkvlhs8FhgasG62h1tlasdnhlsdfk"
                }
                console.log("BEFORE CALL updateSecurityToken!");
                fetch(url1, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        'securityToken1': Storage.readSync("securityToken1")
                    },
                    dataType: 'json',
                    body: JSON.stringify(send_data)
                }).then(function(response) {
                    console.log("Vleze vo console log");
                    status = response.status; // Get the HTTP status code
                    response_ok = response.ok; // Is response.status in the 200-range?
                    return response.json(); // This returns a promise
                }).then(function(data) {
                    console.log("SECURITY TOKEN 1 IS UPDATED!");
                    console.log("responseObject data: " + data);
                    var tokenInfo = Observable();
                    tokenInfo.value = data;
                    var currentdate19 = new Date().addHours(1);
                    Storage.write("expiryDate", JSON.stringify(currentdate19));
                    Storage.write("securityToken1", JSON.stringify(data));
                    console.log("SECURITY TOKEN UPDATED AND SAVED IN STORAGE! " + tokenInfo.value);
                    var url2 = activeUrl.URL + "/curandusproject/webapi/api/updateSecurityToken2";
                    var phone_obj = {
                        "phone": User.phone,
                        "userType": "provider"
                    }
                    console.log("BEFORE CALL updateSecurityToken2!");
                    fetch(url2, {
                        method: 'POST',
                        headers: {
                            "Content-type": "application/json",
                            'securityToken1': Storage.readSync("securityToken1"),
                            'securityToken2': Storage.readSync("securityToken2")
                        },
                        dataType: 'json',
                        body: JSON.stringify(phone_obj)
                    }).then(function(response) {
                        console.log("Vleze vo console log " + response.status);
                        status = response.status; // Get the HTTP status code
                        response_ok = response.ok; // Is response.status in the 200-range?
                        return response.json(); // This returns a promise
                    }).then(function(data2) {
                        console.log("SECOND SECURITY TOKEN UPDATED AND SAVED IN WELCOME PAGE!");
                        console.log("responseObject data: " + data2);
                        console.log("Before STORING IN tokenInfo!");
                        var tokenInfo2 = Observable();
                        tokenInfo2.value = data2;
                        Storage.write("securityToken2", JSON.stringify(data2));
                        console.log("Before main");
                        visibility.value = "Collapsed";
                        goToMain();
                        // Storage.write("securityToken", securityToken));
                    }).catch(function(err) {
                        console.log("Fetch data error");
                        console.log(err.message);
                    });
                    // Storage.write("securityToken", securityToken));
                }).catch(function(err) {
                    console.log("Fetch data error");
                    console.log(err.message);
                });
            } else {
                console.log("Before main");
                visibility.value = "Collapsed";
                goToMain();
            }
        }

    }, function(error) {
        ///tuka da ne se gleda
        // //debug_log("Not Registered");
        // goToLogin();
        visibility.value = "Collapsed";
        if (JSON.parse(Storage.readSync("expiryDate")).getTime() < currentdate.getTime()) {
            var url1 = activeUrl.URL + "/curandusproject/webapi/api/generateSecurityToken1";
            var send_data = {
                "appID": QConfig.appId,
                "auth_key": QConfig.authKey,
                "user": "Admin",
                "password": "hsadjkvlhs8FhgasG62h1tlasdnhlsdfk"
            }

            console.log("BEFORE CALL generateSecurityToken!");
            fetch(url1, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                dataType: 'json',
                body: JSON.stringify(send_data)

            }).then(function(response) {
                console.log("Vleze vo console log");
                status = response.status; // Get the HTTP status code
                response_ok = response.ok; // Is response.status in the 200-range?
                return response.json(); // This returns a promise
            }).then(function(data) {
                console.log("SECURITY TOKEN IS GENERATED!");
                console.log("responseObject data: " + data);
                var tokenInfo = Observable();
                tokenInfo.value = data;
                Storage.write("securityToken1", JSON.stringify(data));
                var currentdate1 = new Date().addHours(1);
                Storage.write("expiryDate", JSON.stringify(currentdate1));
                console.log("SECURITY TOKEN GENERATED AND SAVED IN STORAGE! " + tokenInfo.value);
                // Storage.write("securityToken", securityToken));

            }).catch(function(err) {
                console.log("Fetch data error");
                console.log(err.message);
            });

        } else {
            var urlUpdateToken1 = activeUrl.URL + "/curandusproject/webapi/api/updateSecurityToken1";
            if (diff_minutes(JSON.parse(Storage.readSync("expiryDate")), currentdate) < 10) {
                console.log("BEFORE CALL updateSecurityToken 1!");
                fetch(urlUpdateToken1, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                        'securityToken1': Storage.readSync("securityToken1")
                    },
                    dataType: 'json',
                    body: JSON.stringify(send_data)
                }).then(function(response) {
                    console.log("Vleze vo console log");
                    status = response.status; // Get the HTTP status code
                    response_ok = response.ok; // Is response.status in the 200-range?
                    return response.json(); // This returns a promise
                }).then(function(data) {
                    console.log("FIRST SECURITY TOKEN IS UPDATED!");
                    console.log("responseObject data: " + data);
                    var tokenInfo = Observable();
                    tokenInfo.value = data;
                    var currentdate1 = new Date().addHours(1);
                    Storage.write("securityToken1", JSON.stringify(data));
                    Storage.write("expiryDate", JSON.stringify(currentdate1));
                    console.log("FIRST SECURITY TOKEN UPDATED AND NEW VALUE AND EXPIRY DATETIME SAVED IN STORAGE!");
                    // Storage.write("securityToken", securityToken));
                }).catch(function(err) {
                    console.log("Fetch data error");
                    console.log(err.message);
                });
            }
        }
    });

}

function Continue() {
    console.log(isAgree.value);
    if (isAgree.value == true) {
        // isLogged();
        router.goto("login", {
            "regid": p_reg_id.value
        });
    } else
    if (isAgree.value == false) {
        myToast.toastIt("You must agree with the Terms and Conditions")
    }
}

function goToLogin() {
    router.goto("login", {
        "regid": p_reg_id.value
    });
}

function goToTerms() {
    router.push("Terms");
}

function goToMain() {
    var tmp = {
        "num": Math.random()
    };
    router.goto("main", {
        odwelcome: tmp
    });
}

module.exports = {
    toogleIsAgree: toogleIsAgree,
    isAgree: isAgree,
    goToTerms: goToTerms,
    Continue: Continue,
    load: load,
    visibility: visibility
        // continueFlag:continueFlag

};