require("dotenv").config();
import request from "request";            //const { request } = require("express");

let postWebhook = (req, res) =>{
    //Parse the request body form the POST
    let body = req.body;

    //check the webhook event is from a page subscription
    if(body.object === 'page') {

        //Iterate over each entry - there may be multiple if batchet
        body.entry.forEach(function(entry) {

            //Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);


            //Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            //Check if the event is a message o postback and
            //pass the event to the appropiate handler function
            if(webhook_event.message){
                handleMessage(sender_psid, webhook_event.message);
            }else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }

        });

        //Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    }else{
        //Return a '404 not found' if event is not from a page subscription 
        res.sendStatus(404);
    }
};

let getWebhook = (req, res) =>{
    // your verify token
    let VERIFY_TOKEN = process.env.MY_VERIFY_FB_TOKEN;

    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
        // Respond with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
        } else {
        // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};




//Handles messages events
function handleMessage(sender_psid, received_message){
    let response;

    //Check if message contains text
    if(received_message.text) {

        //Create the payload for a basic text message
        response = {
            "text": `Tu enviaste el mensaje: "${received_message.text}". Now send me an image! ` 
        }
    }

    //send the response message
    callSendAPI(sender_psid, response);
}

//Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback){
    
}

//Send response messages via the send API
function callSendAPI(sender_psid, response){
    //Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    //Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": {"access_token": process.env.FB_PAGE_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if(!err) {
            console.log('mensaje enviado!');
            console.log(`Mi mensaje: ${response}`);
        }else{
            console.error('no se puede enviar el mensaje: ' + err);
        }
    });    
}

module.exports = {
    postWebhook: postWebhook,
    getWebhook: getWebhook,

};