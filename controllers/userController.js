const User = require('../models/userModel');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User();
    await newUser.save();
    res.status(201).json({ user_id: newUser._id });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Error creating user');
  }
};
