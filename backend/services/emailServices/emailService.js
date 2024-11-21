const transporter = require('./transporter');
const { welcomeEmailTemplate } = require('./emailTamplates');

const sendRegistrationEmail = async (to, subject, name) => {
  const text = welcomeEmailTemplate(name);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendRegistrationEmail };
