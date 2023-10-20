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

// const systemContent={

// }
async function getResultsFromAPI(problem) {
  try {
    const profileString = await stringifyProfileData();
    const problemString = stringifyProblemData(problem);
    const userInput = profileString + problemString;

    console.log("MESSAGE STRING:", userInput)

    const res = await fetch(`${BASE_URL}/results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify({
        userInput,
                // userMessage: userInput,
        // systemMessage: 
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
