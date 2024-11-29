//usersController
const User = require("../models/User");
const transporter = require("../services/emailServices/transporter");
const {
  beforRemoveEmail,
} = require("../services/emailServices/emailTamplates");
const jwt = require("jsonwebtoken");

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      // תיקון ההשוואה
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const profileImage = req.file ? req.file.path.replace(/\\/g, "/") : null;

    if (!profileImage) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { profileImage },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile image updated",
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.error("Update profile image error:", err);
    res.status(500).json({ message: "Error updating image" });
  }
};

const deactivateAccount = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.id !== id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET_WORD, {
      expiresIn: "7d",
    });

    const user = await User.findByIdAndUpdate(
      id,
      { isVerified: false, role: "deactivated" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const link = `http://localhost:3000/rectivate/${id}/${token}`;

    const emailContent = await beforRemoveEmail(user, link);
    await transporter.sendMail(emailContent);

    return res
      .status(200)
      .json({ message: "User account deactivated successfully", user });
  } catch (err) {
    console.error("Error deactivating account:", err);
    res.status(500).json({ message: "Error deactivating account" });
  }
};

const reactivateAccount = async (req, res) => {
  const { id, token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD);
    if (decoded.userId !== id) {
      return res.status(400).json({ message: "invalid token ot user ID" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { isVerified: true, role: "user", reactivatationToken: null },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Account rectivated successfuly", user });
  } catch (err) {
    console.error("Error reactivating account", err);
    if (err.name === 'TokenExpiredError') {
      return res.status(400).json({message: 'Token expired'})
    }
    res.status(500).json({ message: "Error reactivating account" });
  }
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.id !== id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ message: "Error deleting account" });
  }
};
module.exports = {
  profile,
  updateProfileImage,
  deactivateAccount,
  reactivateAccount,
  deleteAccount,
};
