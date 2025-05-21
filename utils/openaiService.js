import axios from 'axios';

export async function getAIRecommendations(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const message = response.data.choices[0].message.content;
    return message;
  } catch (err) {
    console.error('AI API Error:', err.response?.data || err.message);
    throw new Error('AI API request failed');
  }
}
