
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/chat`

async function getResultsFromAPI(options){
  try {
    const res = await fetch(`${BASE_URL}/results`, options)
    return res.json()
    // const data = await res.json()
    // return data
  } catch (error) {
    console.error(error)
  }
}

export {
  getResultsFromAPI,
}
