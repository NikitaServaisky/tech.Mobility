//usersController
const User = require("../models/User");
const RideHistory = require("../models/History");

// שליפת פרופיל משתמש
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
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(200).json({
      message: "Profile image updated",
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.error("Update profile image error:", err);
    res.status(500).json({ message: "Error updating image" });
  }
};

const getDashboar = async (res, req) => {
  try {
    const userId = res.params.id;

    const user = await User.findById(userId).select("-paswword");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const ride = await RideHistory.find({ costumerId: userId }).sort({
      createAd: -1,
    });

    res.status(200).json({ user, ride });
  } catch (err) {
    console.error('Error fetching dashboard:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { profile, updateProfileImage, getDashboar };
