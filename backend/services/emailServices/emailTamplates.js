const welcomeEmailTemplate = (name) => {
  return `
    שלום ${name},

    ברוך הבא לשירות של טקמובילטי! אנחנו שמחים שבחרת להצטרף אלינו.

    אם יש לך שאלות, תמיד נשמח לעזור לך.

    בברכה,
    צוות טקמובילטי
  `;
};

module.exports = { welcomeEmailTemplate };
