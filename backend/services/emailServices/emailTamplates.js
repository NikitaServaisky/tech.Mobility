

const welcomeEmailTemplate = (name) => {
  return {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "ברןך הבא לחברת טקמוביליטי",
    text: `  שלום ${user.displayName},

    ברוך הבא לשירות של טקמובילטי! אנחנו שמחים שבחרת להצטרף אלינו.

    אם יש לך שאלות, תמיד נשמח לעזור לך.

    בברכה,
    צוות טקמובילטי`,
  };
};

const beforRemoveEmail = (user) => {
  return {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "דרישה לסגית חשבון משתמש",
    text: `
  שלום ${user.displayName},

  קיבלנו את בקשתך למחוק את חשבונך לצמיתות ממאגרי החברה.
  
  אם ברצונך לעצור את תהליך המחיקה, אנא לחץ על הקישור הבא בתוך 7 ימים מיום קבלת המייל:
  [הוסף קישור אמיתי כאן]

  אם אינך מגיב למייל זה, אנו נמשיך בתהליך המחיקה ונמחק את כל המידע שלך ממאגרי החברה.

  בברכה,
  צוות טכמוביליטי`,
  };
};

module.exports = { welcomeEmailTemplate, beforRemoveEmail };
