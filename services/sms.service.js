const twilio = require('twilio');

const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID} = require("../config/config");

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {
    sendSms: async (phone, body) => {
        try {
            const info = await client.messages.create({
                body,
                // from: // using for one sender only
                messagingServiceSid: TWILIO_SERVICE_SID, //using for many senders (telephone numbers)
                to: phone,
            });
            console.log(`message ${info.status}, text:${body}`)
        }catch (e) {
            console.log(e)
        }

    }


}
// client.messages
//     .create({
//         body: 'hello world) test message',
//         messagingServiceSid: TWILIO_SERVICE_SID,
//         to: '+380979559776'
//     })
//     .then(message => console.log(message.sid))
//     .done();