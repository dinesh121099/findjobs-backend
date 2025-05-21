import Job from '../models/Jobs.js';

export async function getJobs(req, res) {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
}

export default getJobs;