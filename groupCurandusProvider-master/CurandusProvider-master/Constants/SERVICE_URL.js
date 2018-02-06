var Observable = require('FuseJS/Observable');

//var URL = "http://192.168.1.165:8081";
//var URL = "http://192.168.1.110:8080";
//var URL = "http://89.205.28.221";

var newFeatures = "0";
var bugFix = "2";
var version = "1";
//var appVersion = "1.0.1"
appVersion = +version + "." + newFeatures + "." + bugFix;
//var URL = "http://104.245.33.167:8090";
var URL = "http://192.168.1.190:8080";

//var URL = "http://192.168.0.104:8080";


module.exports = {
    URL: URL,
    appVersion: appVersion
};