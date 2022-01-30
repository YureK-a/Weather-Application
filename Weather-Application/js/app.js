const cityForm = document.querySelector('[data-js="change-location"]')
const cardContainer = document.querySelector('[data-js="city-card"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document.querySelector('[data-js="city-temperature"]')

let timeImg = document.querySelector('[data-js="time"]')

const fetchWeatherInfo = async inputValue => {
  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon }] =
  await getWeatherData(Key)
  return { LocalizedName, WeatherIcon, WeatherText, Temperature, IsDayTime }
}

const setCityWeatherData = async inputValue => {
  const { LocalizedName, WeatherIcon, WeatherText, Temperature, IsDayTime } =
  await fetchWeatherInfo(inputValue)
  
  const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg"/>`
  
  timeImg.src = IsDayTime ? timeIcon.src = './src/day.svg' : timeIcon.src = './src/night.svg'
  timeIconContainer.innerHTML = timeIcon
  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value
  
  showCard()
}

const showCard = () => {
  const cardIsNotVisible = cardContainer.classList.contains('d-none')
  if (cardIsNotVisible) {
    cardContainer.classList.remove('d-none')
  }
}

const goToCard = () => {
  setTimeout(() => {
    scrollTo(0, 300)
  }, 100)
}

const showCityWeatherInfo = inputValue => {
  goToCard()
  setCityWeatherData(inputValue)
}

const showLocalStorageCity = () => {
  const city = localStorage.getItem('city')

  if (city) {
    showCityWeatherInfo(city)
  }
}

const handleCityForm = event => {
  event.preventDefault()

  const inputValue = event.target.city.value

  showCityWeatherInfo(inputValue)
  localStorage.setItem('city', inputValue)
  cityForm.reset()
}

cityForm.addEventListener('submit', handleCityForm)

showLocalStorageCity()
