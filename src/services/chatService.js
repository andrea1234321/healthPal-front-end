// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/chat`

async function getResultsFromAPI(problem){
  try {
    const res = await fetch(`${BASE_URL}/results`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify ({
        message: `User's chief complaint is  ${problem.concern}. The location of the problem is ${problem.location}. The duration of the problem is ${problem.duration}. The problem feels like ${problem.quality}. The pain is ${problem.severity}.`
      }),
    })

    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

export {
  getResultsFromAPI,
}
