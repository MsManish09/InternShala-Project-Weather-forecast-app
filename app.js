// my api key, without which can't access the api
const API_KEY = 'cb77ef33b9e8ab659ebeef8529bc7e8b'
let CITY_NAME = 'Bengaluru'


// current weather api
const  current_weather_api = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`


// api provides weather data of next 5 days
const api_5day_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric
`

async function fetch_weather_details() {
    let repsonse = await fetch(current_weather_api)
    let data = await repsonse.json()
    console.log('5day weather forecast')
    console.log(data)
}

fetch_weather_details()