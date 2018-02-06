var Observable = require("FuseJS/Observable")
var Storage = require("FuseJS/Storage");
var activeUrl = require("Constants/SERVICE_URL.js");
var securityToken = Storage.readSync("securityToken");
var selektirani = Observable("");

var Modal = require("Modal");
var lista = [];
var savedTreatments = Observable();
var userInfo = JSON.stringify(Storage.readSync("userInfo")); //Storage.readSync("userInfo");
var name = Observable("");

var fullname2 = Observable();

var namenovo2 = Observable();

searchString2 = Observable("");
//var providerId = JSON.parse(userInfo.providerId);
function stringContainsString(main, filter) {
    console.log("MAIN " + main);
    return main.toLowerCase().indexOf(filter.toLowerCase()) != -1;
}
console.log("OVA E user info  yyyy: " + userInfo);
var providerId = JSON.stringify(userInfo.providerId);
console.log("OVA E PROVIDER ID yyyy: " + providerId);

//***************  GET NAME BY PATIENT 
name.value = JSON.stringify(Storage.readSync("nameLastname"));


/////////////////////// REMOVE TREATMENT TEMPLATE ////////////////////////////////////
function RemoveItem(sender) {
    console.log(JSON.stringify(sender.data.nameTreatment));
    Modal.showModal(
        "Delete Treatment",
        "Are you sure you want to delete " + sender.data.nameTreatment + " ?", ["Yes", "No"],
        function(s) {
            if (s == "Yes") {
                console.log("REMOVE TREATMENT TEMPLATE: " + sender.data.savedTreatmentTemplateId);
                var url = activeUrl.URL + "/curandusproject/webapi/api/DeleteSavedTemplate/" + sender.data.savedTreatmentTemplateId + "&&" + sender.data.savedTreatmentTemplateId + "&&" + securityToken
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
                    //remove template item from list --> sender
                    Remove(sender);
                    console.log("DELETED TEMPLATE: " + JSON.stringify(data));

                }).catch(function(err) {
                    console.log("Fetch data error");
                    console.log(err.message);
                });

            }
        });




}

/////////////// Remove template item from front end templatelist
function Remove(sender) {
    console.log("OVA E ITEMOT SHTO SE BRISHE : " + JSON.stringify(sender));
    savedTreatments.remove(sender.data);
    for (var i = 0; i < savedTreatments.length; i++) {
        savedTreatments.getAt(i).index.value = i;
    }
}



//////******  GET SAVED TREATMENT ITEMS BY SAVED TREATMENT ITEM ID ********
function fetchDataBySavedTreatment(id, templateName) {

    lista = [];
    var url = activeUrl.URL + "/curandusproject/webapi/api/gettreatmentitemssbytreatment/treatmentId=" + id + "&typetreatment=S&securityToken=" + securityToken;
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
        for (var i = 0; i < data.length; i++) {
            //selektirani.add(data[i].name);
            //lista[i] = data[i].name;
            ///////////
            var tmp = {
                "name": data[i].name,
                "duration": data[i].duration,
                "created": data[i].created,
                "modified": data[i].modified,
                "modifiedBy": data[i].modifiedBy,
                "typeT": data[i].typeT,
                "repeatT": data[i].repeatT,
                "renderingInfo": data[i].renderingInfo,
                "createdBy": data[i].createdBy,
                "treatmentItemId": data[i].treatmentItemId,
                "subtreatmentid": data[i].subtreatmentid,
                "daytime": data[i].daytime,
                "intervaldaytime": data[i].intervaldaytime,
                "starttime": data[i].starttime
            }
            lista[i] = tmp;
            ///////////
            console.log("FETCH DATA BY SAVED TREATMENTS: " + JSON.stringify(tmp));
            console.log("FETCH DATA BY SAVED TREATMENTS - SELEKTIRANI: " + JSON.stringify(selektirani));
        }
        goToSelectType(lista, id, templateName);

    }).catch(function(err) {
        console.log("Fetch data error");
        console.log(err.message);
    });
} // end function fetchDataBySavedTreatment


function getItemsForTemplate(item) {
    console.log("Data na klik na template: " + JSON.stringify(item.data));
    var id = item.data.savedTreatmentTemplateId;
    var templateName = item.data.nameTreatment;
    //console.log("Na klik na template: " + id); 
    fetchDataBySavedTreatment(id, templateName);
}


function goToSelectType(e, id, templateName) {
    //console.log("NAJBITNOOO ***",JSON.stringify(e)); 
    e.push({
        "num1": Math.random()
    });
    e.push({
        "id": id
    })
    e.push({
        "templateName": templateName
    })

    console.log("Data shto se prakja do SelectType", JSON.stringify(e));
    console.log("dolzhina na data shto se prakja do SelectType: -----> ", e.length);
    console.log("OVA E IMETO STIGNATO DO SELECT TYPE DO SAVED:" + name.value);
    router.push("SelectType", {
        savedTreatments: e,
        fullname2: fullname2.value,
        namenovo2: name.value


    });
}


this.onParameterChanged(function(param) {
    console.log("----------------- SAVED TREATMENTS ----------------");
    savedTreatments.clear();
    if (param.finalname != null) {
        name.value = param.finalname;
    }
    if (param.fullname1 != null) {
        name.value = param.fullname1;
        fullname2 = param.fullname1;
    }

    for (var i = 0; i < param.lista.length; i++) {
        if (param.lista[i].name) {

            name.value = param.lista[i].name;
            fullname2 = param.lista[i].name;

        } else {
            if (param.lista[i].nameTreatment != null) {
                savedTreatments.add(param.lista[i]);
                console.log("vo for stignato: " + param.lista[i].nameTreatment);
            }
        }
    }

});

var filteredItems = searchString2.flatMap(function(searchValue) {
    return savedTreatments.where(function(item) {
        return stringContainsString(item.nameTreatment, searchValue);
    });
});

// <--- CALL FUNCTION FOR DATA FETCH ABOUT SAVED TEMPLATE

module.exports = {

    getItemsForTemplate: getItemsForTemplate,
    goToSelectType: goToSelectType,
    fetchDataBySavedTreatment: fetchDataBySavedTreatment,
    savedTreatments: savedTreatments,
    name: name,
    RemoveItem: RemoveItem,
    filteredItems: filteredItems,
    searchString2: searchString2


}