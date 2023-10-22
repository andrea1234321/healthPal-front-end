// services
import * as tokenService from './tokenService';
import * as profileService from './profileService';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/chat`;

async function stringifyProfileData() {
  try {
    const profile = await profileService.getProfile();
    const age = new Date().getFullYear() - profile.birthYear;
    const bmi = Math.round((profile.weight / (profile.height * profile.height)) * 703);
    return `The user is a ${age} year old ${profile.sex} with a ${bmi} BMI and a medical history of ${profile.medicalHx}.`;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error; // Propagate the error.
  }
}

function stringifyProblemData(problem) {
  const res = `
    Primary symptom: ${problem.concern}
    Location of symptom: ${problem.location}
    Duration of symptom: ${problem.duration} ${problem.unit}
    Feels like: ${problem.quality}
    Triggers of symptom: ${problem.trigger}
    Pain intensity: ${problem.severity}
    Alleviating factors: ${problem.alleviatingFactors}
    Exacerbating factors: ${problem.exacerbatingFactors}
    Accompanying symptoms: ${problem.otherSxs}
  `;
  return res;
}

  const instructions= `You are an AI medical assistant who can provide expert advice on self-diagnosis options in the case where an illness can be treated using a home remedy. The user input starts with demographics and medical history and then a list of history of primary symptom. Ignore all lines that end with 'n/a'. Generate a structured response to these headers: 
  
  TREATMENT: Based on the user's input, describe the best treatment option and what the user should do next.
  
  URGENT: If the best treatment option includes 'immediate medical attention', respond with 'Yes'. Otherwise, respond with 'No'.
  
  SYMPTOMS: List the symptoms that led to the treatment option.
  
  SCORE: How confident are you in your advice on a scale of 0 (not confident at all) to 100 (extremely confident)?
  
  REASON: What is your reasoning behind your score?`

  
async function getResultsFromAPI(problem) {
  try {
    const profileString = await stringifyProfileData();
    const problemString = stringifyProblemData(problem);
    const userInput = profileString + problemString;

    const res = await fetch(`${BASE_URL}/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify({
        // userInput,
        userContent: userInput,
        systemContent: instructions,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch results from the API: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error for better error handling in the calling code.
  }
}

export { getResultsFromAPI };
