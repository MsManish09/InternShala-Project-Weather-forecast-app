// fetching weather forecast data

// my api key, without which can't access the api
const API_KEY = 'cb77ef33b9e8ab659ebeef8529bc7e8b'
let CITY_NAME = 'Bengaluru' // Bengaluru would be the default city.


// storing weather icon address a object for dynamic use
let weather_icon= {
    Sun:{
        highlight: "images%20and%20resources/sunny_highlight.png",
        normal: 'images%20and%20resources/sunny.png'
    },
    
    Clouds: {
        normal:'images%20and%20resources/cloudy.png',
        highlight:'images%20and%20resources/cloudy64px.png'
    },

    Rain: {
        normal:  'images%20and%20resources/rainy-day.png',
        highlight: 'images%20and%20resources/rainy-high.png'
    },
    Thunderstrom:{
        normal: 'images%20and%20resources/thunderstorm.png',
        highlight: 'images%20and%20resources/thunderstorm.png'
    }, 
    Mist:{
        normal:'images%20and%20resources/mist.png',
        highlight:'images%20and%20resources/mist.png'
    },
    Smoke:{
        normal:'images%20and%20resources/Smoke.png',
        highlight:'images%20and%20resources/Smoke.png'
    },
    Haze:{
        normal:'images%20and%20resources/haze.png',
        highlight:'images%20and%20resources/haze.png'
    },
}

// standardizing main weather description for icon matching
function standard_main_weather(weather){
    if (weather === 'Clear'){
        return 'Sun'
    }

    if(weather === 'Drizzle'){
        return 'Rain'
    }
    return weather
}

// functions to fetch data for apis and update weather.

// fetching current weather details -------------
async function fetch_current_weather_details() {

    // current weather api
    const current_weather_api = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`

    let response;
    let data
    try{
        response = await fetch(current_weather_api)

        // if fetch fails
        if(!response.ok){
            throw new Error('Error: Server did not respond')
        }

        data = await response.json()

        // if city does not exist 
        if(data.cod !== 200){
            throw new Error(data.message)
        }
    }

    catch(error){
        let message_block = document.querySelector('#app_message')
        message_block.classList.remove('hidden')
        let message = document.querySelector('#message')
        message.textContent = error

        // show the error message(if city name is invalid) or fetch fail and reload after 3sec
        async function reload_page() {
            await new Promise(resolve =>{
                setTimeout(() => {
                window.location.reload()
            }, 3000)
            })
        }
        reload_page()
    }
    
    console.log(data)

    let main_weather = standard_main_weather(data.weather[0].main)
    console.log(main_weather)

    // selecting elements to implemtn the data.
    // selecting city name ele and updating city name
    let location_name = document.querySelector('#city_location')
    location_name.textContent = `${data.name}, ${data.sys.country}`

    // selecting highlight temp ele and updating temp
    let city_temp = document.querySelector('#current_temp')
    city_temp.textContent = `${data.main.temp}`
    let city_weather_icon = document.querySelector('#today_weather_desc_logo')
    // city_weather_icon.setAttribute('src', weather_icon[main_weather]['normal'] )
    if (weather_icon[main_weather]) {
        city_weather_icon.setAttribute('src', weather_icon[main_weather]['normal']);
    } 

    // fallback, if main weather icon is not present.
    else {
        five_day_desc_icon[i].setAttribute('src', weather_icon.Mist.normal);
    }

    // selecting main current temp ele and feel like temp ele
    let current_temp = document.querySelector('#curr_temp_ele')
    current_temp.textContent = `${data.main.temp}`

    let feel_like_temp = document.querySelector('#feels_like_temp')
    feel_like_temp.textContent = `${data.main.feels_like}`

    // selecting current weather desc ele
    let weather_desc_image = document.querySelector('#weather_desc_icon')

    // selectig img ele and changing weather icon base on current weather
    // weather_desc_image.setAttribute('src', weather_icon[main_weather]['highlight']);
    if (weather_icon[main_weather]) {
        weather_desc_image.setAttribute('src', weather_icon[main_weather]['highlight']);
    } 
    // fallback, if main weather icon is not present.
    else {
        five_day_desc_icon[i].setAttribute('src', weather_icon.Mist.normal);
    }

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


// fetching 5day forecast data ----------------------------
async function fetch_5day_forecast() {

    // api provides weather data of next 5 days
    const api_5day_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric`

    const response = await fetch(api_5day_forecast)
    const data = await response.json()
    // console.log(data)

    // selecting array of next 6 hours elements
    let first_block = document.querySelector('#first_block')
    let second_block = document.querySelector('#second_block')
    let third_block = document.querySelector ('#third_block') 
    let blocks = [first_block, second_block, third_block]

    // selecting temp ele of forecast3 forecast with 6 hours gap) 
    let temp_eles = document.querySelectorAll('.temp')

    // selecting weather desc ele and img ele of forecast3 forecast with 6 hours gap) 
    let weather_desc = document.querySelectorAll('.weather_desc')

    // weather icon ele
    let weather_desc_icon = document.querySelectorAll('.forecast_weather_icon')

    // selecting rain ele of forecast3 forecast with 6 hours gap) 
    let rain_eles = document.querySelectorAll('.rain')

    // selecting rain ele of forecast3 forecast with 6 hours gap) 
    let wind_eles = document.querySelectorAll('.wind')

    // adding date and time of forecast(3 forecast with 6 hours gap)

    let count = 1 // want to ignore the [0] item, since its the current weather. which is already displayed
    // updating the entire forecast(for next 18 hours)
    for( let i = 0; i < 3; i++){
        // console.log(data.list[count])
        blocks[i].textContent = data.list[count].dt_txt
        blocks[i].style.backgroundColor = '#93c5fd';

        temp_eles[i].textContent = data.list[count].main.temp
        weather_desc[i].textContent = `${data.list[count].weather[0].description}`
        
        // finding the main weather
        let main_weather = standard_main_weather(data.list[count].weather[0].main)
        // weather_desc_icon[i].setAttribute('src', weather_icon[main_weather].normal )
        if (weather_icon[main_weather]) {
            weather_desc_icon[i].setAttribute('src', weather_icon[main_weather]['normal']);
        } 
        // fallback, if main weather icon is not present.
        else {
            weather_desc_icon[i].setAttribute('src', weather_icon.Mist.normal);
        }

        rain_eles[i].textContent = `3h: ${data.list[count].rain?.['3h'] ?? '0 '} mm`

        wind_eles[i].textContent = `${data.list[count].wind.speed} km/hr`

        count += 2 // we want use 1,3,5th items in the list to get data of forecast 6hours apart
    }

    // selecting five day forecast date and time blocks update
    let fiveday_forecast_count = 6
    let forecast_time_date_ele = document.querySelectorAll('.FDFC_date_time_ele')
    // console.log(forecast_time_date_ele)

    // select temperature elements 
    let five_day_fc_temp_ele = document.querySelectorAll('.five_day_temp')

    // selecting main weather desc ele and img
    let five_day_fc_weather_desc_ele = document.querySelectorAll('.five_day_weather_desc')

    let five_day_desc_icon = document.querySelectorAll('.five_day_weather_desc_icon')

    // seleting rain ele
        let five_day_rain_ele = document.querySelectorAll('.five_day_rain')

    // selecting wind ele
    let five_day_wind_ele = document.querySelectorAll('.five_day_wind')


    // updating 5day forecast elements
    for(let i = 0; i < 5; i++){
        // udpaing date time eles
        forecast_time_date_ele[i].textContent = data.list[fiveday_forecast_count].dt_txt
        forecast_time_date_ele[i].style.backgroundColor = 
        '#93c5fd'

        // updating temperature ele
        five_day_fc_temp_ele[i].textContent = data.list[fiveday_forecast_count].main.temp

        // updating weather desc ele and icon
        five_day_fc_weather_desc_ele[i].textContent = data.list[fiveday_forecast_count].weather[0].description

        let weather_main = data.list[fiveday_forecast_count].weather[0].main
        weather_main = standard_main_weather(weather_main)
        // five_day_desc_icon[i].setAttribute('src', weather_icon[weather_main]['normal'])
        if (weather_icon[weather_main]) {
            five_day_desc_icon[i].setAttribute('src', weather_icon[weather_main]['normal']);
        } 
        // fallback, if main weather icon is not present.
        else {
            five_day_desc_icon[i].setAttribute('src', weather_icon.Mist.normal);
        }
        // updating rain ele
        five_day_rain_ele[i].textContent = `3h: ${data.list[fiveday_forecast_count].rain?.['3h']  ?? '0'} mm`

        // updating wind ele
        five_day_wind_ele[i].textContent = `${data.list[fiveday_forecast_count].wind.speed} km/hr`

        // updating count for new day forecast
        fiveday_forecast_count += 8
    }
    
}

fetch_current_weather_details() 
fetch_5day_forecast()

// Event listner - getting city name form user
let city_search_btn = document.querySelector('#search_city')
city_search_btn.addEventListener('click', ()=>{
    let city_input = document.querySelector('#city_name').value
    // console.log(city_input)

    if(!city_input){
        alert('Enter city name')
        return
    }

    CITY_NAME = city_input
    fetch_current_weather_details()
    fetch_5day_forecast()

})