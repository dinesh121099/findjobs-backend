export const buildPrompt = (profile, jobs) => {

  return `
User Profile:
Name: ${profile.name}
Location: ${profile.location}
Experience: ${profile.experience} years
Skills: ${profile.skills.join(', ')}
Preferred Job Type: ${profile.preferredJobType}

Jobs List:
${jobs.map(j => `- ${j.title} at ${j.company}, ${j.location} (Skills: ${j.skills.join(', ')})`).join('\n')}

Based on the profile and job listings above, return the top 3 most relevant job matches where the output is in single string without any escape character - raw JSON format and donot wrap it in tripple backticks.
`;
};
