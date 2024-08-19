const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

// Register a new user
const register = async (req, res) => {
  const { name, password, role } = req.body;

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ name, password: hashedPassword, role });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login a user
const login = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ where: { name } });

  if (!user) return res.status(400).send('User does not exist');

  // Validate password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  // Generate JWT
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.header('Authorization', token).send({ token });
};

module.exports = { register, login };
