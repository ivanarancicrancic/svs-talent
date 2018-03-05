var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var Storage = require("FuseJS/Storage");
var securityToken2 = Storage.readSync("securityToken2");
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
// DoctorsTabColor.value = "#0097A7";
// PatientsTabColor.value = "#727272";
//#0097A7
this.onParameterChanged(function(param) {
    //if (param.newContact) {
    reloadHandler();
    // } else if (param.newDoctor) {
    reloadHandlerDoctors();
    // }
    console.log("IS DOCTOR PARAMETRAROOOOOOOOOOOOT!!!!!!" + param.isDoctors);

});

var isLoadingContacts = Observable(false);
var isLoadingDoctors = Observable(false);

searchString = Observable("");
searchString1 = Observable("");

function stringContainsString(main, filter) {
    return main.toLowerCase().indexOf(filter.toLowerCase()) != -1;
}

function reloadHandler() {
    isLoadingContacts.value = true;
    fetchData();
}

function reloadHandlerDoctors() {
    isLoadingDoctors.value = true;

    fetchDataDoctors();
    setPatients();
}

function endLoadingContacts() {
    isLoadingContacts.value = false;
}

function endLoadingDoctors() {
    isLoadingDoctors.value = false;
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
    console.log("POVIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIK");
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
    console.log("Before calling api /curandusproject/webapi/api/getprovidersdatabyprovider/ProviderProviderId=...  from ContactsView.js ");
    var urlProvider = activeUrl.URL + "/curandusproject/webapi/api/getprovidersdatabyprovider/ProviderProviderId=" + UserInfo.providerId;
    //console.log(urlProvider);
    fetch(urlProvider, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'securityToken2': securityToken2
        },
        dataType: 'json'
    }).then(function(response) {
        console.log("After calling api /curandusproject/webapi/api/getprovidersdatabyprovider/ProviderProviderId=...  from ContactsView.js");
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
        //console.log("finalDoctors posle for" + JSON.stringify(finalDoctors));

        dataDoctors.replaceAll(finalDoctors);
        //console.log("This isiiiiiii**********finalDoctors*************"+JSON.stringify(finalDoctors));
        //console.log("This isiiiiiii***************dataDoctors ********"+JSON.stringify(dataDoctors));
        endLoadingDoctors();
        visibility.value = "Collapsed";
        isDoctors.value = false;
        console.log("dataDoctors ****************: " + JSON.stringify(dataDoctors));
    }).catch(function(err) {
        dataDoctors.replaceAll([]);
        visibility.value = "Collapsed";
        console.log("Fetch data error");
        console.log(err.message);
        isDoctors.value = true;
        //visibility.value = "Visible"; //LOADING E VISIBLE AKO IMA GRESHKA
    });
}
// kod kontakti
function fetchData() {
    final = [];
    // ТРЕБА ДА СЕ СМЕНИ
    visibility.value = "Visible";

    console.log("pred api");
    console.log("Before calling api /curandusproject/webapi/api/patients/providerId from ContactsView.js");
    var urlPatient = activeUrl.URL + "/curandusproject/webapi/api/patients/providerId=" + UserInfo.providerId;
    console.log(urlPatient);
    fetch(urlPatient, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            'securityToken2': securityToken2
        },
        dataType: 'json'
    }).then(function(response) {
        console.log("After calling api /curandusproject/webapi/api/patients/providerId from ContactsView.js");
        console.log("Respose (patients): " + response);
        return response.json(); // This returns a promise
    }).then(function(contacts) {

        var flag = false;

        for (var i = contacts.length - 1; i >= 0; i--) {
            contacts[i].firstLetter = contacts[i].firstName.charAt(0).toUpperCase();
            contacts[i].fullName = SubstringName(contacts[i].firstName + " " + contacts[i].lastName);
            contacts[i].isLetter = 0;
        }

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
fetchDataDoctors();

function goToSelectType(e) {
    e.data.num = Math.random();
    Storage.write("nameLastname", JSON.stringify(fullName));
    //console.log("od tuka se prakja kon SelectType" + JSON.stringify(e.data));

    router.push("SelectType", {
        user: e.data
    });
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
                    console.log("Calling api /curandusproject/webapi/api/deleteProviderPatient");
                    fetch(activeUrl.URL + "/curandusproject/webapi/api/deleteProviderPatient/" + UserInfo.providerId + "&&" + patientId, {
                        method: 'GET',
                        headers: {
                            "Content-type": "application/json",
                            'securityToken2': securityToken2
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
                console.log("Calling api curandusproject/webapi/api/deleteProviderProvider");
                fetch(activeUrl.URL + "/curandusproject/webapi/api/deleteProviderProvider/" + UserInfo.providerId + "&&" + providerContactId, {
                    method: 'GET',
                    headers: {
                        "Content-type": "application/json",
                        'securityToken2': securityToken2
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
    var obj = {
        "num": Math.random(),
    }
    console.log("PARAMETAR!!!!!!!!1" + JSON.stringify(data));
    router.push("alert", {
        user: e.data,
        objjj: JSON.stringify(obj),
        userfullname: e.data.fullName
    });
}

function goToAddContact() {
    router.push("addContact", {});
}

function goToAddDoctors() {
    router.push("addDoctor", {});
}

function goToChat(e) {

    router.push("chat", {
        user: e.data,

    });
}

function makeCall(e) {
    console.log("makeCall");
    phone.call("+1" + e.data.phone);
}


function goToDoctorChat(e) {
    console.log("VLEGUVA VO DOCTOR PREKU PANEL!!!!!!!!!!");


    router.goto("chat", {
        doctorChatRoomId: e.data,
        comesFromContacts: true

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

module.exports = {
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
    goToDoctorChat: goToDoctorChat,
    deleteDoctor: deleteDoctor,
    deleteContact: deleteContact,
    filteredItems1: filteredItems1,
    imagePath: imagePath,
    visibility: visibility,
    makeCall: makeCall,
    load: load,
    DoctorsTabColor: DoctorsTabColor,
    PatientsTabColor: PatientsTabColor
};