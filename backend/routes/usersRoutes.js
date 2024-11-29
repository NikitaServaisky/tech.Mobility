//usersRoutes
const express = require("express");
const {
  profile,
  updateProfileImage,
  deactivateAccount,
  reactivateAccount,
  deleteAccount,
} = require("../controllers/usersController");
const authMiddleware = require("../middlewars/authMiddleware");
const upload = require("../middlewars/multerMiddleware");
const router = express.Router();

router.get("/profile/:id", authMiddleware , profile);
router.post(
  "/profile/:id/image",
  authMiddleware ,
  upload.single("profileImge"),
  updateProfileImage
);
router.delete("/:id", authMiddleware , deleteAccount);
router.put("/deactivate/:id", authMiddleware , deactivateAccount);
router.put('/reactivate/:id/:token', reactivateAccount);
module.exports = router;
