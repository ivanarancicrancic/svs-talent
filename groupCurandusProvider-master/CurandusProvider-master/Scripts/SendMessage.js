var Observable = require('FuseJS/Observable');

var activeUrl = require("Constants/SERVICE_URL.js");
var QConfig = require('Scripts/quickbloxConfig.js');
var Storage = require("FuseJS/Storage");

var User = JSON.parse(Storage.readSync("userInfo"));
var user = Observable();
var fullname = Observable();
var sessionObj;
var userObj;

var dateLastMessage = Observable();
var dateFirstMessage = Observable();

var skipped = Observable();

var RoomId = "";
var ChatId = "";

var fromChat = false;

function createSession(p_roomId, p_message) {
    console.log("p_roomId " + p_roomId);
    var data = {
        'application_id': QConfig.appId,
        'auth_key': QConfig.authKey,
        'nonce': Math.floor(Math.random() * 1000),
        'timestamp': new Date().getTime() / 1000
    }

    var signData = QConfig.getSignedData(data);

    //console.log(JSON.stringify(signData));

    fetch('https://api.quickblox.com/session.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'QuickBlox-REST-API-Version': "0.1.0"
            },
            body: JSON.stringify(signData)
        })
        .then(function(resp) {
            console.log("Session Created");
            return resp.json();
        })
        .then(function(json) {
            console.log(JSON.stringify(json));
            sessionObj = json.session;
            console.log(JSON.stringify(sessionObj));

            signIn(p_roomId, p_message);

        })
        .catch(function(err) {
            console.log('Error');
            console.log(err);
        });
}

function signIn(p_roomId, p_message) {
    var data = {
        "login": "001111111",
        "password": QConfig.password
    }

    //console.log(JSON.stringify(data));

    fetch('https://api.quickblox.com/login.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'QuickBlox-REST-API-Version': "0.1.0",
                'QB-Token': sessionObj.token
            },
            body: JSON.stringify(data)
        })
        .then(function(resp) {
            return resp.json();
            //console.log(JSON.stringify(resp));
        })
        .then(function(json) {
            userObj = json.user;

            addMesageToChat(p_roomId, p_message);
            //console.log(JSON.stringify("USER", userObj));

        })
        .catch(function(err) {
            console.log('Error');
            console.log(JSON.stringify(err));
        });
}

function addMesageToChat(p_roomId, p_message) {

    var data = {
        "chat_dialog_id": p_roomId,
        "message": p_message
    };

    fetch('https://api.quickblox.com/chat/Message.json', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'QB-Token': sessionObj.token
            },
            body: JSON.stringify(data)
        })
        .then(function(resp) {
            console.log('Statussssss' + JSON.stringify(resp));
            return resp.json();
        })
        .then(function(json) {
            console.log('JSON porakaaaa:' + JSON.stringify(json));
        })
        .catch(function(err) {
            console.log('Error');
            console.log(JSON.stringify(err));
        });
}



module.exports = {
    user: user,
    fullname: fullname,
    signIn: signIn,
    createSession: createSession,
    addMesageToChat: addMesageToChat
};