// fetching weather forecast data

// my api key, without which can't access the api
const API_KEY = 'cb77ef33b9e8ab659ebeef8529bc7e8b'
let CITY_NAME = 'Bengaluru' // Bengaluru would be the default city.

// creating a localStorage to add recently viewed cities
if(!localStorage.getItem('recent_cities')){
    localStorage.setItem('recent_cities', JSON.stringify([]))
}

// function to add cities to localStorage
function add_cities_to_recent_city_list(city){
    let city_list = JSON.parse(localStorage.getItem('recent_cities')) || []; // if list is empty, create a empty array

    // only add city ot list if it doesnot already exist in the localStorage
    if(!city_list.includes(city)){
        city_list.unshift(city)  // add at the 0th index
    }
    
    // keep the list to only 5 cities
    if(city_list.length > 5){
        city_list =  city_list.slice(0, 5) // keep only latest cities
    }
    // save the new list
    localStorage.setItem('recent_cities', JSON.stringify(city_list))
}

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

    // current weather api(using city name )
    const using_city_name = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=metric`

    try{
        let response = await fetch(using_city_name)
        // if fetch fails
        if(!response.ok){
            throw new Error('Error: Server did not respond')
        }
        let data = await response.json()

        if(data.cod != 200){
            throw new Error(data.message)
        }

        
        // store the city in localStorage(to show in recent search list) by pushing them into the array
        add_cities_to_recent_city_list(CITY_NAME)

        // call to update weather
        current_weather_DOM(data)

    }

    catch(error){
        let message_block = document.querySelector('#app_message')
        message_block.classList.remove('hidden')
        let message = document.querySelector('#message')
        message.textContent = error.message
        // show the error message(if city name is invalid) or fetch fail and reload after 3sec
        async function reload_page() {
             new Promise(resolve =>{
                setTimeout(() => {
                    message_block.classList.add('hidden')
                    window.location.reload()
            }, 3000)
            })
        }
        await reload_page()
    } 
}

function current_weather_DOM(data){
        // DOM -------
        let main_weather = standard_main_weather(data.weather[0].main)
        // console.log(main_weather)
    
        // Changing background color of the page based on the current weather
        // let body= document.querySelector('body')
        let display_ele = document.querySelector('#today_weather')
        if(main_weather == 'Clear' || main_weather == 'Haze' || main_weather == 'Sun'){
            // body.style.backgroundColor = '#facc15'
            display_ele.style.backgroundColor = 'rgba(254, 249, 195, 0.5)'
        }
        // turn light grey on cloudy days
        if(main_weather == 'Clouds' || main_weather == 'Smoke'){
            // body.style.backgroundColor = '#d1d5db'
            display_ele.style.backgroundColor = '#c4cad1'
        }
        // turn slighty dark grey on rainy da
        if(main_weather == 'Rain' || main_weather == 'Thunderstrom' || main_weather == 'Drizzle'){
            // body.style.backgroundColor = '#9ca3af'
            display_ele.style.backgroundColor = '#6b7280'
        }

        // selecting elements to implemtn the data.
        // seleting the updating date and time
        let date_time_ele = document.querySelector('#today_date')
        let date_time = Number(data.dt) // making sure the value is interger
        date_time = new Date(date_time * 1000) // convert into milliseconds -> gets converted into date object

        // convert date object into string to extract only date and time
        date_time = date_time.toString().split(' ')
        // console.log(date_time)
        let cite_date = date_time[2] + ' ' + date_time[1]
        let city_time = date_time[4]
        // updating date and time of the city
        date_time_ele.textContent = `${cite_date}  ${city_time}`

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
        current_temp.textContent = data.main.temp
        // if the temperature is 40 are more, change the backgorund color to red(signifing its to hot)
        if( Number(data.main.temp) >= 40){
            current_temp.style.backgroundColor = '#fb7185'
            alert('Warning: Temperature is 40°C or above. Its extremely hot!')
        }


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
    console.log(data)

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

// fetches and displays default city weather data
fetch_current_weather_details() 
fetch_5day_forecast()

// Event listner - getting city name form user
let city_search_btn = document.querySelector('#search_city')
city_search_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    let city_input = document.querySelector('#city_name').value
    // console.log(city_input)

    if(!city_input){
        alert('Enter City Name')
        return
    }

    CITY_NAME = city_input
    
    fetch_current_weather_details()
    fetch_5day_forecast()

})

// Event Listener: Getting weather forecast using user location.
let current_user_location_btn = document.querySelector('#use_user_location')
// console.log(current_user_location_btn)

current_user_location_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    let lat
    let lon
    // get location using browser web api
    navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude  
        lon = position.coords.longitude

        // console.log(`lat: ${lat}.  lon: ${lon}`)

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

        async function fetch_data() {
            try{
                let response = await fetch(api)
                // if fetch fails
                if(!response.ok){
                    throw new Error('Error: Server did not respond')
                }

                let data = await response.json()

                // if city data not available, throw a error
                if(data.cod != 200){
                    throw new Error(data.message)
                }

                // call to update weather
                current_weather_DOM(data)

                // updating city name (from lat and lon)before display 5 day forecast data
                CITY_NAME = data.name
                fetch_5day_forecast()

             }

             // catch error and display error details
            catch(error){
                let message_block = document.querySelector('#app_message')
                message_block.classList.remove('hidden')
                let message = document.querySelector('#message')
                message.textContent = error.message

                // show the error message(if city name is invalid) or fetch fail and reload after 3sec
                async function reload_page() {
                new Promise(resolve =>{
                    setTimeout(() => {
                        message_block.classList.add('hidden')
                        window.location.reload()
                    }, 3000)
                })
                }
                await reload_page()
            }
        }
        fetch_data()
    })
 
})

function show_recent_cities(){
    let city_input = document.querySelector('#city_name')
    let recent_cities_list = document.querySelector('#previous_cities')

    recent_cities_list.innerHTML = ''

    let cities = JSON.parse(localStorage.getItem('recent_cities'))

    for(let i = 0; i <= 4; i++){
        let li = document.createElement('li')
        li.textContent = cities[i]
        li.addEventListener('click', ()=>{
            city_input.value = cities[i]
            recent_cities_list.innerHTML = ''
        })
        //add recent list to ul
        recent_cities_list.appendChild(li)
    }
}
