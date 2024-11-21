const client = require('./twilioClient');
const { verificationCodeTemplate } = require('./smsTemplates');

const sendRegistrationSMS = async (phone, code) => {
  try {
    const message = verificationCodeTemplate(code);
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // מספר השולח
      to: phone, // מספר הנמען
    });
    console.log('SMS sent successfully');
  } catch (err) {
    console.error('Error sending SMS:', err);
    throw err;
  }
};

module.exports = { sendRegistrationSMS };
