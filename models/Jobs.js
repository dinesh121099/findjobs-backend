import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  skills: [String],
});

export default mongoose.model('Job', jobSchema);