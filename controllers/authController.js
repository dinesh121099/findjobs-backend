import User from '../models/User.js';
import pkg from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

const { sign } = pkg;
const createToken = (userId) => {
  return sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'User already exists' });

    const hashed = await hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    const token = createToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found, Sign Up please' });

    const match = await compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid password credential' });

    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
}
