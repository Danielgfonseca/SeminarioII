const API_AI_TOKEN = '576bd1b9354d43dc86d42ff748adf404';
const FACEBOOK_ACCESS_TOKEN = 'EAADdPjdXFFUBAP6UXJ1NguDIo6ZCPmdXRWzsFAlXMn2cN5DP8dZAarg9MIhr87caeubfZBgJLf8i1loqpM4Riw0RiWQ1HOMGXO9hUXiV00VuEqSbRSIBZA8ZC6L7Xrl8JPcYuQtrbEENR6CUvdo4pJwl7krBTPDnr2OzgUoy0LgZDZD';

const request = require('request');

const apiAiClient = require('apiai')(API_AI_TOKEN);

const sendImage = (senderId, imageUri) => {
    return request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
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
        url: 'https://graph.facebook.com/v2.6/me/messages',
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