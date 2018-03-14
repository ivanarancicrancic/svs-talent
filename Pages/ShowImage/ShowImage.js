var Observable = require("FuseJS/Observable");
var activeUrl = require("Constants/SERVICE_URL.js");
var Modal = require('Modal');
var response = Observable();
var item = Observable();
var imageUrl = Observable();
var visibility = Observable("Collapsed");

this.onParameterChanged(function(param) {
	visibility.value="Visible";
    console.log("param" + JSON.stringify(param));
    var parse = JSON.parse(param.treatmentitemlist.responseInfo);
    imageUrl.value =  activeUrl.URL + "/curandusImages/" + parse.imageUrl + ".jpg";
	console.log("This is the URL send image in ShowImagePage: "+imageUrl);
	visibility.value = "Collapsed";

});

console.log("slika1");
console.log("imageurl= " + imageUrl);

module.exports = {
    imageUrl: imageUrl,
    visibility: visibility
}