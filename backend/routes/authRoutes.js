const express = require("express");
const passport = require("passport");
const {
  registerNewUser,
  userLogin /*verificationUser*/,
} = require("../controllers/authController");

const router = express.Router();

router.post("/registration", registerNewUser);
router.post("/login", userLogin);
//router.post('/verification', verificationUser);
//facebook routes
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

//google routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
