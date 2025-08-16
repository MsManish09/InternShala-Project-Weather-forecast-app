// fetching weather forecast data

// my api key, without which can't access the api
const API_KEY = 'cb77ef33b9e8ab659ebeef8529bc7e8b'
let CITY_NAME = 'Bengaluru'

// current weather api
const  current_weather_api = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`

// api provides weather data of next 5 days
const api_5day_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric
`

// storing weather icon address a object for dynamic use
let weather_icon= {
    Sun:{
        highlight: "images%20and%20resources/sunny_highlight.png",
        normal: 'images%20and%20resources/sunny.png',
    },
    Clouds: {
        normal:'images%20and%20resources/cloudy 2.png',
        cloudy_highlight: 'images%20and%20resources/cloudy64px.png',
    },
    Rain: {
        normal:  'images%20and%20resources/rainy-day.png',
        highlight: 'images%20and%20resources/rainy-high.png'
    }
}

async function fetch_current_weather_details() {
    let repsonse = await fetch(current_weather_api)
    let data = await repsonse.json()
    console.log('current weather forecast')
    console.log(data)

    let main_weather = data.weather[0].main
    // if main  = 'Clear' change it to Sun, make easy to select icon
    if(main_weather == 'Clear'){
        main_weather = 'Sun'
    }

    if(main_weather == "Drizzle" || main_weather == "Thunderstorm"){
        main_weather = 'Rain'
    }

    // selecting elements to implemtn the data.

    // selecting city name ele and applying city name
    let location_name = document.querySelector('#city_location')
    // console.log(location_name)
    location_name.textContent = `${data.name}, ${data.sys.country}`

    // selecting highlight temp ele and applying temp
    let city_temp = document.querySelector('#current_temp')
    city_temp.textContent = `${data.main.temp}`
    let city_weather_icon = document.querySelector('#today_weather_desc_logo')
    city_weather_icon.setAttribute('src', weather_icon[main_weather]['normal'] )

    // selecting main current temp ele and feel like temp ele
    let current_temp = document.querySelector('#curr_temp_ele')
    current_temp.textContent = `${data.main.temp}`

    let feel_like_temp = document.querySelector('#feels_like_temp')
    feel_like_temp.textContent = `${data.main.feels_like}`


    // selecting current weather desc ele
    let weather_desc_image = document.querySelector('#weather_desc_icon')

    // selectig img ele and changing base on current weather

    weather_desc_image.setAttribute('src', weather_icon[main_weather]['highlight']);

    let weather_desc_ele = document.querySelector('#weather_desc_text')
    let text = data.weather[0].description
    text = text.replace(text[0], text[0].toUpperCase()) // capitalizing the 1st letter
    weather_desc_ele.textContent = text

    // selecting humidity ele and updating
    let humidity_ele = document.querySelector('#humidity')
    humidity_ele.textContent = `${data.main.humidity}`

    // selecting max and min temp eles and updating
    let max_temp = document.querySelector('#temp_max')
    let min_temp = document.querySelector('#temp_min')
    max_temp.textContent = `${data.main.temp_max} °C`
    min_temp.textContent = `${data.main.temp_min} °C`

    // selecting cloud cover ele
    let cloud_cover_ele = document.querySelector('#cloud_cover')
    cloud_cover_ele.textContent = data.clouds.all
}

fetch_current_weather_details()

// fetching 5day forecast data
async function fetch_5day_forecast() {
    let repsonse = await fetch(api_5day_forecast)
    let data = await repsonse.json()
    console.log(data)

    // selecting array of next 6 hours elements
    let first_block = document.querySelector('#first_block')
    let second_block = document.querySelector('#second_block')
    let third_block = document.querySelector('#third_block')
    let blocks = [first_block, second_block, third_block]

    // selecting temp ele of forecast3 forecast with 6 hours gap) 
    let temp_eles = document.querySelectorAll('.temp')
    console.log(temp_eles)


    // selecting weather desc ele and img ele of forecast3 forecast with 6 hours gap) 
    let weather_desc = document.querySelectorAll('.weather_desc')
    console.log(weather_desc)
    // img ele
    let weather_desc_icon = document.querySelectorAll('.forecast_weather_icon')
    console.log(weather_desc_icon)

    // selecting rain ele of forecast3 forecast with 6 hours gap) 
    let rain_eles = document.querySelectorAll('.rain')
    console.log(rain_eles)

    // selecting rain ele of forecast3 forecast with 6 hours gap) 
    let wind_eles = document.querySelectorAll('.wind')
    console.log(wind_eles)
 

    // adding date and time of forecast(3 forecast with 6 hours gap)
    // let count = 1 // want to ignore the [0] item, since its the current weather. which is already displayed
    // for(let block of blocks){
    //     block.textContent = data.list[count].dt_txt
    //     count += 2
    // }

    let count = 1 // want to ignore the [0] item, since its the current weather. which is already displayed
    // updating the entire forecast(for next 18 hours)
    for( let i = 0; i < 3; i++){
        blocks[i].textContent = data.list[count].dt_txt
        blocks[i].style.backgroundColor = '#93c5fd';

        temp_eles[i].textContent = data.list[count].main.temp
        weather_desc[i].textContent = `${data.list[count].weather[0].description}`
        
        // finding the main weather
        let main_weather = data.list[count].weather[0].main
        weather_desc_icon[i].setAttribute('src', weather_icon[main_weather]['normal'] )

        rain_eles[i].textContent = data.list[count].rain['3h'] ?? '0 mm';

        wind_eles[i].textContent = `${data.list[count].wind.speed} km/hr`

        count += 2
    }
    
}
fetch_5day_forecast()


