# 🌤️ TempTrack - Weather Forecast App

    Temptrack is a simple weather forecast web app that provide current weather forecast, weather forecast of next 18 hours (Split 6hours apart), and forecast of next 5 day.

## Interface:

    - Desktop UI:

        ![Desktop view screenshot](README_imgs\desptop_UI.png)

    - Ipad mini UI:

        - potrait view:
            ![ipad mini potrait view screenshot](README_imgs\ipad_mini_Potrait_UI.png)

        - Landscape view:
            ![ipad mini landscape view screenshot](README_imgs\ipad_mini_landscae_UI.png)

    - Iphone 14 pro view:

        ![iphone 14 view screenshot](README_imgs\iphone_14_pro_UI.png)

## 🛠️ Features :

    - ⛅ Current weathear details (temperature, main weather, humidity, wind, rain, cloud coverage, local time and date and current city) with dynamically changing icons.

        ![Current weather display panel](README_imgs\Current_weather_panel.png)

        - If the current temperature of a city is high(40 or more), the app throw a alert(warning), saying its to hot.
            ![HIGH Temp alert screenshot](README_imgs\high_temp_alert.png)

        The current temp element background changes to red.
            ![Current temp ele turn red screenshot](README_imgs\current_weather_ele_red.png)

    - 🔍 Search weather by city name.
        - I am using 'Bengaluru' as default city to get weather forecast.
            ![default city code](README_imgs\default_city_code.png)

        - Users can enter the city name in the search bar to get forecast details.
            ![forecast_by_city_name_screenshot](README_imgs\search_by_city_name.png)

    - 📍 Search weather by User location.
        - using web api geolocation, get current position(latitude and longitude) of the user.

        - later pass the latitude and longitude to api that used lat and lon to fetch weather forecast data.

<<<<<<< HEAD
        ![geolocation_code_screenshot](src\README_imgs\geolocation_code_screenshot.png)

        - When click on the location icon in the search bar, the user current location is extracted and the forecast is displayed.
            ![forecast by user location screenshot](README_imgs\search_by_city_name.png)

    - ⛅⛈️🌡 Next 18 Hour weather forecast - icons:

            The panel displays the weather forecast for the next 18 hours, divided into three blocks of 6 hours each. For each time block, the following information is shown:

                - Temperature
                - Main weather description with a dynamically changing icon that reflects the weather condition (e.g., ☁️ for cloudy, 🌧 for rain, ⛈️ for thunderstorms)
                - Wind speed
                - Rainfall (per 3hour in mm)

                ![18 hour forecast panel](README_imgs\18_hour_forecast_panel.png)


    - 🌤️ 5-Day forecast with icons:

            The 5-day forecast panel displays a summary for each of the next five days (one block per day). For each day, the following information is shown:

            - Day temperature
            - Main weather description with a dynamically changing icon based ont he weather
            - Wind speed
            - Daily rainfall amount (per 3hour in mm)

            ![5 day forecast panel screenshot](README_imgs\five_day_forecast_panel.png)


    - 🌇 Previous search cities list:

        ![Recent city list](README_imgs\recent_city_list.png)

        - Previously searched cities are stored in the localStorage, so that the user can accees it accross session

            ![localStorage code](README_imgs\localStorage_logic_code.png)

        - This list is limited to latest 5 cities for better UI and accessibility

        - The list is only accessible when the input field is clicked (uses addEventListner())
             ![recent_city_list_display_code](README_imgs\recent_city_list_display_code.png)


    - ⚠️ Error handling for invalid cityname or fetch failure and alert of city search with no city name.

        -  If the user click the search icon withoout entering a city name, the app throw a alert, asking the input city name.

            ![empty city name alert screenshot](README_imgs\empty_input_alert.png)

            ![empty city name alert code](README_imgs\empty_city_name_alert_code.png)

        - The fetch handling errors is handled using try-catch block, if the use enters a invalid city name, a panel is displayed to show error and the window is refreshed after 3sec.


            ![ fetch_try_block_code](README_imgs\fetch_try_block_code.png)

            ![fetch error message display](README_imgs\fetch_error_message_display.png)

            ![fetch error message and reload code ](README_imgs\fetch_error_code.png)


    - 🟦 Current weather panel background changes backgournd based on current weather.

        ![backgournd color change logic screenshot](README_imgs\bg_color_change_code.png)

        - the background color dynamically changes based on the current weather.
            - light yellow for sunny or clear sky weather
                ![sunny day current weather panel screenshot](README_imgs\sunny_clear_weaather.png)

            - light grey for cloudy or mist weather
                ![cloudy or mist current weather panel screenshot](README_imgs\cloudy_weather_screenshot.png)

            - darker gery for rainy, thunderstrom or drizzle weather
                ![rainy or thunderstorm current weather panel screenshot](README_imgs\rainy_thunderstrom_weather_screenshot.png)

## Tech Stack/ Built with:

## Usage Instruction:

## Credits / Acknowledgments:
=======
        ![geolocation_code_screenshot](https://github.com/MsManish09/InternShala-Project-Weather-forecast-app/blob/6a367ed18525dd4888df3c48baa28ff2e7b9e945/README_imgs/geolocation_code_screenshot.png)
        ![screen shorts](Screenshot%202025-08-18%20143927.png)
        
        

>>>>>>> b7508644145f84815296383f11e2a3e88d05f8ea
