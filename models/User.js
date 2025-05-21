import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  location: String,
  experience: Number,
  skills: [String],
  preferredJobType: {
    type: String,
    enum: ['remote', 'onsite', 'any'],
  },
});

export default mongoose.model('User', userSchema);
