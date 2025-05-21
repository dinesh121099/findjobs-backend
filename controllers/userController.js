import User from '../models/User.js';

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

export async function updateProfile(req, res) {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Failed to update profile' });
  }
}
