const verificationCodeTemplate = (code) => {
  return `Your verification code is: ${code}`;
};

const passwordResetCodeTemplate = (code) => {
  return `Your password reset code is: ${code}. Please use this code within 10 minutes.`;
};

module.exports = { verificationCodeTemplate, passwordResetCodeTemplate };
