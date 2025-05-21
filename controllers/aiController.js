import { buildPrompt } from '../utils/aiPromptBuilder.js';
import { getAIRecommendations } from '../utils/openaiService.js';
import User from '../models/User.js';
import Job from '../models/Jobs.js';

export async function getJobMatches(req, res) {
  try {
    const user = await User.findById(req.user.id);
    const jobs = await Job.find();

    const prompt = buildPrompt(user, jobs);
    const aiResponse = await getAIRecommendations(prompt);

    res.json({ recommendations: aiResponse });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get AI recommendations' });
  }
}

export default getJobMatches;