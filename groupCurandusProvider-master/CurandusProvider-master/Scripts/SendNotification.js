var Observable = require('FuseJS/Observable');
var firebase_id = "key=AAAA9iVp_wM:APA91bFJy4BdDZDaF1XlPPnMy_-I_TW-1gptQ0f3OrECep-RuI3zYnjh4KdEA77eA1YP-8KvGQCMhxunQ5DeKeixYBQRIwqRujjC1hrFJJjoOEXcTeQdad18ZrRMntc8Xln2zqSGOcyY";

function sendPushNotification(p_title, p_body, p_message, p_from, p_to, p_room_id, p_from_name, p_from_chatid) {
    console.log("Vleze vo push ");
    //console.log("length(p_to) " + p_to.length);
    // if (!(p_to == null) {
    if (!(p_to == null)) {
        var alert = {
            "title": p_title,
            "body": p_body,
            "sound": "default",
            "from": p_from,
            "_id": p_room_id,
            "namenovo": p_from_name,
            "fromchatid": p_from_chatid
        };

        var notification = {
            "alert": alert
        };

        var data = {
            "notification": notification,
            "message": p_message
        };

        var senddata = {
            "data": data,
            "to": p_to
        };

        fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': firebase_id
                },
                body: JSON.stringify(senddata)
            })
            .then(function(resp) {
                console.log("Se prati porakata");
                return resp.json();
            })
            .then(function(json) {
                console.log(JSON.stringify(json));
            })
            .catch(function(err) {
                console.log('Error vo prakanje notifikacija');
                console.log(err.message);
            });
    }
}

module.exports = {
    sendPushNotification: sendPushNotification
};