const API_AI_TOKEN = '6990213fa7a5469e8fe8566845cf5814';
const FACEBOOK_ACCESS_TOKEN = 'EAAbyKQKYZCyMBALnZCQkf2p1K6pS3NngcwDZBEzKGK10xH0f1RvUvCcCInuMjmPh62EV7uCd1GvmsDdXEcvBbYbxyU9VLA5zL2KTTVPI8TBfyZBHA7lYy22c3tdYxpIBSRXYvuHb4Q3o0fxwiIJPhBVxXcsFXpdDPX7dwcO0VQZDZD';

const request = require('request');

const apiAiClient = require('apiai')(API_AI_TOKEN);

const sendImage = (senderId, imageUri) => {
    return request({
        url: 'https://graph.facebook.com/v2.9/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: imageUri }
                }
            }
        }
    });
};

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.9/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;

    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'botcube_co'});

    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;

        if (response.result.metadata.intentName === 'images.search') {
            sendImage(senderId, result);
        } else {
            sendTextMessage(senderId, result);
        }
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};
