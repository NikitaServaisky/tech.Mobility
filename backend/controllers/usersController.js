//usersController
const User = require('../models/User');

// שליפת פרופיל משתמש
const profile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error('Profile error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const {id} = req.params;

    if (req.params.user.id !== id) {
      return res.status(403).json({message: 'Unauthorized action'});
    }
    
    const profileImage = req.file ? req.file.path.replace(/\\/g, '/') : null;

    if (!profileImage) {
      return res.status(400).json({ message: 'No image uploaded'});
    }

    const user = await User.findByIdAndUpdate(id, {profileImage}, {new: true});

    if (!user) {
      res.status(404).json({ message: 'User not found'});
    }

    res.status(200).json(200).json({message: 'Profile image updated', profileImage: user.profileImage});
  } catch (err) {
    console.error('Update profile image error:', err);
    res.status(500).json({message: 'Error updating image'});
  }
}

module.exports = { profile, updateProfileImage };
