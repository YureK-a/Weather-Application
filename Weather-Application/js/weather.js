const APIKey = 'eW1HxUj9zyqW9Mpy0JkTPYgmLhHd3Dws'
const baseUrl = 'https://dataservice.accuweather.com/'

const getCityUrl = cityName => `
  ${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`
const getWeatherUrl = cityKey => `
  ${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`

const fetchData = async url => {
  try {
    const response = await fetch(url)
  
    if (!response.ok) {
      throw new Error('Algo deu errado. Tente novamente.')
    }

    return response.json()
  } catch ({ name, message }) {
    alert(`${name}, ${message}`)
  }
}

const getCityData = cityName => fetchData(getCityUrl(cityName))
const getWeatherData = cityKey => fetchData(getWeatherUrl(cityKey))