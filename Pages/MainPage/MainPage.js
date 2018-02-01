var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var Storage = require("FuseJS/Storage");
var Device = require('Device');
var securityToken = require('Pages/ActivationPage/ActivationPage.js');

var errorMessage = Observable();
var isLoading = Observable(false);
var activePage = Observable();
var activeTab = Observable();
var backing = Observable("1");
//activeTab.value = "page2";
//activePage.value = "page2Tab";
var push = require("FuseJS/Push");
var finalname = Observable();
var dSelected = Observable();
var userfullname = Observable();
push.on("registrationSucceeded", function(regID) {
    console.log("Reg Succeeded: " + regID);
});
var ComesFromDoctorChat = Observable(false);

// var itemsTwo = Observable({
//     name: "today"
// }, {
//     name: "1 day from now"
// }, {
//     name: "2 days from now"
// }, {
//     name: "3 days from now"
// }, {
//     name: "4 days from now"
// }, {
//     name: "5 days from now"
// }, {
//     name: "6 days from now"
// }, {
//     name: "7 days from now"
// }, {
//     name: "8 days from now"
// }, {
//     name: "9 days from now"
// }, {
//     name: "10 days from now"
// });
var itemsTwo = Observable({
    name: "Interval"
}, {
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
////////////// dodadeni promenlivi od ContactsView.js
var Modal = require("Modal");
var myToast = require("myToast");
var imagePath = Observable();
var visibility = Observable("Collapsed");
var phone = require("FuseJS/Phone");
var load = Observable("Loading...");
var UserInfo = JSON.parse(Storage.readSync("userInfo"));
var isDoctors = Observable(false);
var data = Observable();
var dataDoctors = Observable();
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var fullName = "";
var final = [];
var finalDoctors = [];
var userfullname = Observable();
var DoctorsTabColor = Observable("#727272");
var PatientsTabColor = Observable("#0097A7");
var isLoadingContacts = Observable(false);
var isLoadingDoctors = Observable(false);

searchString = Observable("");
searchString1 = Observable("");

/////////////// do tuka


this.onParameterChanged(function(param) {
    backing.value = "1";
    Storage.write("patientchatidpom", "patientchatidpom konecno");
    //setTimeout(function() {
    //console.log("vleze vo onParameterChanged ");
    //activeTab.value = "page2";
    //activePage.value = "page2Tab";
    console.log("PARAMETAR OD CHAT!!!!" + JSON.stringify(param));

    if (param.odwelcome) {
        reloadHandler();
        reloadHandlerDoctors();
        setPatients();
    }
    if (param.newContact) {
        console.log("param.newContact " + JSON.stringify(param.newContact));
        reloadHandler();
    } else if (param.newDoctor) {
        console.log("param.newDoctor " + JSON.stringify(param.newDoctor));
        reloadHandlerDoctors();
    }

    if (param.user) {
        // console.log("main " + param.user);
        var obj = {
            "num": Math.random()

        }

        router.push("alert", {
            user: param.user,
            obj: JSON.stringify(obj),
            finalname: finalname.value
                //userfullname: e.data.fullName 
        });
        // console.log("posle push " + param.user);
    }
    if (param.OdListaChat) {
        //setPatients();
        //console.log("main " + param.user);
        var obj = {
            "num": Math.random()
        }
        router.push("chat", {
            OdListaChat: param.OdListaChat
        });
    }

    // ako doagja od ChatDoktori...bitno za selekcija na tab doktori
    if (param.comesFromContactsDoctors) {
        activeTab.value = "page1";
        activePage.value = "page1Tab";
        setDoctors();
        reloadHandlerDoctors();
        isDoctors.value = true;
    }

    if (param.OdListaChatLista) {
        activeTab.value = "page2";
        activePage.value = "page2Tab";
        // setDoctors();
        reloadHandlerDoctors();
        // isDoctors.value = false;
    }
    // ako doagja od ChatDoktori...bitno za selekcija na tab doktori
    if (param.comesFromContactsPatients) {
        activeTab.value = "page1";
        activePage.value = "page1Tab";
        setPatients();
        //reloadHandler();
        reloadHandlerDoctors();
        isDoctors.value = false;
    }

    if (param.comesFromAlertPage) {
        activeTab.value = "page1";
        activePage.value = "page1Tab";
        setPatients();
        reloadHandlerDoctors();
        isDoctors.value = false;
    }

    if (param.comesFromChatPage) {

        setPatients();
        reloadHandlerDoctors();
        isDoctors.value = false;
    }

    if (param.comesFromEditPatient) {
        setPatients();
        reloadHandler();
        reloadHandlerDoctors();
        isDoctors.value = false;
    }
    //}, 500);
});


/////////////////////////////////////////////////// kod od ContactsView.js prenesen tuka
function reloadHandler() {
    isLoadingContacts.value = true;
    fetchData();
}

function reloadHandlerDoctors() {
    isLoadingDoctors.value = true;
    fetchDataDoctors();
    //setDoctors();
}



function editContact(e) {
    router.push("EditContact", {
        user: e.data,
        comesfrom: "patient"
    });
}

function editContactDoctor(e) {
    router.push("EditContact", {
        user: e.data,
        comesfrom: "provider"
    });
}

function stringContainsString(main, filter) {
    return main.toLowerCase().indexOf(filter.toLowerCase()) != -1;
}

function endLoadingContacts() {
    isLoadingContacts.value = false;
}

function endLoadingDoctors() {
    isLoadingDoctors.value = false;
    // setDoctors();
    //isDoctors.value=true;
}

function setDoctors() {
    isDoctors.value = true;
    DoctorsTabColor.value = "#0097A7";
    PatientsTabColor.value = "#727272"
        //var PatientsTabColor = Observable("#727272");
        //fetchDataDoctors();
        //  console.log("povikana funkcijaaaaaa set doctors");

    //console.log(imagePath.value);
}

function setPatients() {
    //console.log("POVIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIK");
    isDoctors.value = false;
    DoctorsTabColor.value = "#727272";
    PatientsTabColor.value = "#0097A7"
}

function fetchDataDoctors() {
    finalDoctors = [];
    dataDoctors.replaceAll([]);

    //finalDoctors.replaceAll([]);
    // ТРЕБА ДА СЕ СМЕНИ
    visibility.value = "Visible"; //OVDE VISIBILITY E COLLAPSED

    var urlProvider = activeUrl.URL + "/curandusproject/webapi/api/getprovidersdatabyprovider/ProviderProviderId=" + UserInfo.providerId + "&&securityToken=" + securityToken.value;
    //console.log(urlProvider);
    fetch(urlProvider, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json'
    }).then(function(response) {
        return response.json(); // This returns a promise
    }).then(function(contacts) {

        // LOADING E VISIBBLE
        var flag = false;

        for (var i = contacts.length - 1; i >= 0; i--) {
            //console.log("dsadasdasda", contacts[i].FirstName);
            if (contacts[i].FirstName != null && contacts[i].FirstName != "undefined") {
                contacts[i].firstLetter = contacts[i].FirstName.charAt(0).toUpperCase();
                contacts[i].fullName = SubstringName(contacts[i].FirstName + " " + contacts[i].LastName);
                //// dodadeno od moki go zemam full name za da go prikazham vo selekttype koga se odi kon selekttype od contacts
                fullName = contacts[i].fullName;
                contacts[i].isLetter = 0;
                contacts[i].typerow = 0;
                contacts[i].flag = 0;
                // console.log("pred uslovi kontakti "+JSON.stringify(contacts[i].ProfileUrl));
                if ('ProfileUrl' in contacts[i]) {
                    var image_num = contacts[i].ProfileUrl;
                    contacts[i].ProfileUrl = activeUrl.URL + "\/curandusImages" + "\/" + image_num + ".jpg";
                    console.log("imaa profile url: " + JSON.stringify(contacts[i].ProfileUrl));
                } else if (contacts[i].ProfileUrl == undefined) {
                    contacts[i].ProfileUrl = activeUrl.URL + "\/curandusImages\/Assets\/placeholder.jpg";
                    console.log("kontaktot nema profile url" + JSON.stringify(contacts[i]));
                }
            }
        }
        console.log("finalDoctors pred for" + JSON.stringify(finalDoctors));
        finalDoctors = [];
        dataDoctors.replaceAll([]);
        for (var i = 0; i < letters.length; i++) {
            flag = false;
            var tmp = {
                "FirstName": letters[i],
                "isLetter": 1
            }
            finalDoctors.push(tmp);
            for (var j = 0; j < contacts.length; j++) {
                if (letters[i] == contacts[j].firstLetter) {
                    finalDoctors.push(contacts[j]);
                    flag = true;
                } else {
                    continue;
                }
            }
            if (flag == false) {
                finalDoctors.pop();
            }
        }

        for (var j = 0; j < finalDoctors.length; j++) {
            finalDoctors[j].index = j;
            finalDoctors[j].flag = 0;
        }
        //console.log("finalDoctors posle for" + JSON.stringify(finalDoctors));
        dataDoctors.replaceAll(finalDoctors);
        //console.log("This isiiiiiii**********finalDoctors*************"+JSON.stringify(finalDoctors));
        //console.log("This isiiiiiii***************dataDoctors ********"+JSON.stringify(dataDoctors));
        endLoadingDoctors();
        visibility.value = "Collapsed";
        // isDoctors.value = false;
        console.log("dataDoctors ****************: " + JSON.stringify(dataDoctors));
    }).catch(function(err) {
        dataDoctors.replaceAll([]);
        visibility.value = "Collapsed";
        console.log("Fetch data error");
        console.log(err.message);
        // isDoctors.value = true;
        //visibility.value = "Visible"; //LOADING E VISIBLE AKO IMA GRESHKA
    });
}

function AddNewItemDoctor(sender) {
    // console.log("vleze vo addnewitem ");
    // console.log("vleze vo addnewitem " + data.length);
    if (dataDoctors.getAt(sender.data.index).flag == 0) {
        dataDoctors.getAt(sender.data.index).flag = 1;
        var row = sender.data;
        row.typerow = 1;
        dataDoctors.insertAt(sender.data.index + 1, (row));
        for (var i = 0; i < dataDoctors.length; i++) {
            dataDoctors.getAt(i).index = i;
        }
    } else {
        console.log("vleze vo minim");
        dataDoctors.removeAt(sender.data.index);
        for (var i = 0; i < dataDoctors.length; i++) {
            dataDoctors.getAt(i).index = i;
        }
        dataDoctors.getAt(sender.data.index).flag = 0;
    }
    console.log("data " + data.length);
}

function AddNewItem(sender) {
    console.log("vleze vo addnewitem patient ");
    //console.log("vleze vo addnewitem " + data.length);
    if (data.getAt(sender.data.index).flag == 0) {
        data.getAt(sender.data.index).flag = 1;
        var row = sender.data;
        row.typerow = 1;
        data.insertAt(sender.data.index + 1, (row));
        for (var i = 0; i < data.length; i++) {
            data.getAt(i).index = i;
        }
    } else {
        console.log("vleze vo minim");
        data.removeAt(sender.data.index);
        for (var i = 0; i < data.length; i++) {
            data.getAt(i).index = i;
        }
        data.getAt(sender.data.index).flag = 0;
    }

    console.log("data " + data.length);
}

// kod kontakti
function fetchData() {
    final = [];
    // ТРЕБА ДА СЕ СМЕНИ
    visibility.value = "Visible";

    console.log("pred api");
    var urlPatient = activeUrl.URL + "/curandusproject/webapi/api/patients/providerId=" + UserInfo.providerId + "&&securityToken=" + securityToken.value;
    console.log(urlPatient);
    fetch(urlPatient, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        },
        dataType: 'json'
    }).then(function(response) {

        return response.json(); // This returns a promise
    }).then(function(contacts) {

        var flag = false;

        for (var i = contacts.length - 1; i >= 0; i--) {
            contacts[i].firstLetter = contacts[i].firstName.charAt(0).toUpperCase();
            contacts[i].fullName = SubstringName(contacts[i].firstName + " " + contacts[i].lastName);
            contacts[i].isLetter = 0;
            contacts[i].typerow = 0;
            contacts[i].flag = 0;
        }
        // contacts[1].typerow = 1;
        final = [];
        //data = [];

        for (var i = 0; i < letters.length; i++) {
            flag = false;
            var tmp = {
                "firstName": letters[i],
                "isLetter": 1
            }
            final.push(tmp);
            for (var j = 0; j < contacts.length; j++) {
                if (letters[i] == contacts[j].firstLetter) {
                    final.push(contacts[j]);
                    flag = true;
                } else {
                    continue;
                }
            }
            if (flag == false) {
                final.pop();
            }
        }
        for (var j = 0; j < final.length; j++) {
            final[j].index = j;
            final[j].flag = 0;
        }

        data.replaceAll(final);
        endLoadingContacts();
        console.log("Success VO DATA!!!!!!!!!");
        visibility.value = "Collapsed";

    }).catch(function(err) {
        data.replaceAll([]);
        visibility.value = "Collapsed";
        console.log("Fetch data error");
        console.log(err.message);

        //visibility.value = "Visible";

    });
} // end function checkData

fetchData();
//fetchDataDoctors();

function goToSelectType(e) {
    backing.value = "0";
    if (e.data.activetreatmenId == 0) {
        e.data.num = Math.random();
        Storage.write("nameLastname", JSON.stringify(fullName));
        //console.log("od tuka se prakja kon SelectType" + JSON.stringify(e.data));

        router.push("SelectType", {
            user: e.data
        });
    } else {
        goToTreatment(e);
    }
}

function deleteContact(e) {
    var patientId = e.data.patientId;
    if (e.data.activetreatmenId != 0) {
        myToast.toastIt("You cannot delete this contact because it has active treatment!");
    } else {
        // console.log(JSON.stringify(e.data.patientId));
        Modal.showModal(
            "Delete Contact",
            "Are you sure you want to delete " + e.data.fullName + "?", ["Yes", "No"],
            function(s) {
                if (s == "Yes") {
                    fetch(activeUrl.URL + "/curandusproject/webapi/api/deleteProviderPatient/" + UserInfo.providerId + "&&" + patientId + "&&securityToken=" + securityToken.value, {
                        method: 'GET',
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(function(response) {
                        return response.json(); // This returns a promise
                    }).then(function(responseObject) {
                        console.log("Success Delete Contact");
                        reloadHandler();
                    }).catch(function(err) {
                        console.log("Error", err.message);
                    });
                }
            });
    }

}

function deleteDoctor(e) {
    var providerContactId = e.data.ProviderDetail2l;
    Modal.showModal(
        "Delete Contact",
        "Are you sure you want to delete " + e.data.fullName + "?", ["Yes", "No"],
        function(s) {
            if (s == "Yes") {
                console.log("SECURITY TOKEN: " + securityToken.value);
                fetch(activeUrl.URL + "/curandusproject/webapi/api/deleteProviderProvider/" + UserInfo.providerId + "&&" + providerContactId + "&&securityToken=" +
                    securityToken.value, {
                        method: 'GET',
                        headers: {
                            "Content-type": "application/json"
                        }
                    }).then(function(response) {
                    return response.json(); // This returns a promise
                }).then(function(responseObject) {
                    console.log("Success Delete Contact");
                    reloadHandlerDoctors();
                }).catch(function(err) {
                    console.log("Error", err.message);
                });
            }
        });
}

function goToTreatment(e) {
    backing.value = "0";
    var obj = {
        "num": Math.random(),
    }
    console.log("PARAMETAR!!!!!!!!1" + JSON.stringify(data));
    router.push("alert", {
        user: e.data,
        objjj: JSON.stringify(obj),
        userfullname: e.data.fullName,
        comesfrom: "main"
    });
}

function goToAddContact() {
    // console.log("vleze vo addnewitem " + dSelected.value);
    backing.value = "0";
    router.push("addContact", {});
}

function goToAddDoctors() {
    backing.value = "0";
    router.push("addDoctor", {});
}

function goToChat(e) {
    backing.value = "0";
    router.push("chat", {
        user: e.data,

    });
}

function makeCall(e) {
    //console.log("backing " + backing.value);

    //console.log("makeCall");

    phone.call("+1" + e.data.phone);
}

function makeCallDoctor(e) {
    var dphone = e.data.ModifiedBy;
    while (dphone.length != 10) {
        dphone = "0" + dphone;
    }
    phone.call("+1" + dphone);

}


function goToDoctorChatDoctor(e) {
    backing.value = "0";
    router.goto("chat", {
        doctorChatRoomId: e.data,
        comesFromContactsDoctors: true,
        tmp: Math.random()

    });

    console.log(JSON.stringify(e));
}

function goToDoctorChatPatient(e) {
    backing.value = "0";
    router.push("chat", {
        doctorChatRoomId: e.data,
        comesFromContactsPatient: true,
        tmp: Math.random()

    });

    console.log(JSON.stringify(e));
}

var filteredItems = searchString.flatMap(function(searchValue) {
    return data.where(function(item) {
        return stringContainsString(item.firstName, searchValue);
    });
});



var filteredItems1 = searchString1.flatMap(function(searchValue) {
    return dataDoctors.where(function(item) {
        return stringContainsString(item.FirstName, searchValue);
    });
});

function SubstringName(str) {
    var ret;
    if (str.length > 20) {
        ret = str.substring(1, 17) + "...";
    } else {
        ret = str;
    }
    return ret;
}

/////////////////////////////////////////////////////////////////// do tuka kod od ContactsView.js

//activeTab.value = "page2";
//activePage.value = "page2Tab";0097A7
// var push = require("FuseJS/Push");

// push.on("registrationSucceeded", function(regID) {
//     var push_token = {
//                     "environment": "development",
//                     "client_identification_sequence": regID
//                     };

//     var device = {
//                     "platform":"android",
//                     "udid":Device.UUID
//                     };

//     console.log("Reg Succeeded: " + regID);


// });

// push.on("registrationSucceeded", function(regID) {
//     console.log("Reg Succeeded: " + regID);
// });
// push.on("error", function(reason) {
//     console.log("Reg Failed: " + reason);
// });
// push.on("receivedMessage", function(payload) {
//     console.log("Recieved Push Notification: " + payload);
// });


function endLoading() {
    isLoading.value = false;
}

function myTimeOutSetTab() {
    setTimeout(function() {
        console.log("time out");
        activeTab.value = "page2";
        activePage.value = "page2Tab";
    }, 500);
}

function NavigateBar() {
    activeTab.value = "page2";
    activePage.value = "page2Tab";
}

function NavigateBarContacts() {
    activeTab.value = "page1";
    activePage.value = "page1Tab";
    setPatients();
}

function toolbarSearch() {
    console.log('da');
}

// FOR TESTING ONLY
function deleteStorage() {
    var success = Storage.deleteSync("userInfo");
    if (success) {
        console.log("Deleted file");
    } else {
        console.log("An error occured!");
    }
}



module.exports = {
    errorMessage: errorMessage,
    backing: backing,
    dSelected: dSelected,
    itemsTwo: itemsTwo,
    AddNewItem: AddNewItem,
    AddNewItemDoctor: AddNewItemDoctor,
    editContact: editContact,
    editContactDoctor: editContactDoctor,
    activeTab: activeTab,
    NavigateBar: NavigateBar,
    NavigateBarContacts: NavigateBarContacts,
    isLoading: isLoading,
    activePage: activePage,
    deleteStorage: deleteStorage,
    toolbarSearch: toolbarSearch,
    ////////////// ContactsView.js //////////////////
    fetchData: fetchData,
    fetchDataDoctors: fetchDataDoctors,
    data: data,
    SubstringName: SubstringName,
    dataDoctors: dataDoctors,
    isDoctors: isDoctors,
    goToSelectType: goToSelectType,
    goToAddContact: goToAddContact,
    goToAddDoctors: goToAddDoctors,
    setDoctors: setDoctors,
    setPatients: setPatients,
    goToTreatment: goToTreatment,
    isLoadingContacts: isLoadingContacts,
    reloadHandler: reloadHandler,
    reloadHandlerDoctors: reloadHandlerDoctors,
    isLoadingDoctors: isLoadingDoctors,
    goToChat: goToChat,
    filteredItems: filteredItems,
    searchString: searchString,
    searchString1: searchString1,
    goToDoctorChatDoctor: goToDoctorChatDoctor,
    goToDoctorChatPatient: goToDoctorChatPatient,
    deleteDoctor: deleteDoctor,
    deleteContact: deleteContact,
    filteredItems1: filteredItems1,
    imagePath: imagePath,
    visibility: visibility,
    makeCall: makeCall,
    load: load,
    DoctorsTabColor: DoctorsTabColor,
    PatientsTabColor: PatientsTabColor,
    makeCallDoctor: makeCallDoctor
        ////////////////////////////////
};