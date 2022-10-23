const input = document.querySelector(".search");
const form = document.querySelector(".locationInput");
const temperature = document.querySelector(".tempreture");
const cityName = document.querySelector(".name");
const icon = document.querySelector(".icon");
const condition = document.querySelector(".condition");
const dateAndTime = document.querySelector(".dateNtime");
const app = document.querySelector(".weather-app");
const cloudy = document.querySelector(".cloudy");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind");
const longitude = document.querySelector(".longitude");
const latitude = document.querySelector(".latitude");
const feelsLike = document.querySelector(".feels-like");
const maxTemp = document.querySelector(".max-temp");
const minTemp = document.querySelector(".min-temp");
const Sunrise = document.querySelector(".sunrise");
const Sunset = document.querySelector(".sunset");
const cityTime = document.querySelector(".cityTime");
const darkMode = document.querySelector("#darkmode");
const appBody = document.querySelector("body");
const titles = document.querySelectorAll("h4");
const panel = document.querySelector(".panel");
const circles = document.querySelectorAll(".circles-background-light");
const logo = document.querySelector(".logo-light");




darkMode.addEventListener("click",()=>{
    appBody.classList.toggle("bg-darkmode");
    appBody.classList.toggle("white-out");
    form.classList.toggle("border-bottom-light");
    panel.classList.toggle("border-left-light");
    input.classList.toggle("txt-lightmode");
    for (const title of titles) {
        title.classList.toggle("border-bottom-light");
    }
    for (const circle of circles) {
        circle.classList.toggle("circles-background-dark");
    }
    logo.classList.toggle("logo-light");
    logo.classList.toggle("logo-dark");
    darkMode.classList.toggle("lightmode");
    icon.classList.toggle("icon-dark");
})



//Api info
const apiKey = "c72953bdd6c68102669c37f699712a3a";
const googleApiKey = "AIzaSyDWWBu0MgD6ydaS9BSuk7YzGCpwinxORx8";



let options = {
    types: ['(cities)']
}

let autocomplete = new google.maps.places.Autocomplete(input,options)

// Adding a "0" to the left if number is under 2 digits
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

    form.addEventListener("submit",(e)=>{
        e.preventDefault();
    
    
        const loadWeather = async (input) => {
            try{
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=c72953bdd6c68102669c37f699712a3a&units=metric`);
            const data = await res.json();
            console.log(data);
                
            let dayCondition = data.weather[0].main;
            console.log(dayCondition);
    
             const dateObject = new Date(data.dt * 1000);
             const humanDateFormat = dateObject.toLocaleString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
    
            cityName.innerHTML = `${data.name}`;
            temperature.innerHTML = `${data.main.temp.toFixed(0)}&#176;`;
            feelsLike.innerHTML =`${data.main.feels_like.toFixed(0)}&#176;`;
    
            maxTemp.innerHTML =`${data.main.temp_max.toFixed(0)}&#176;`;
            minTemp.innerHTML =`${data.main.temp_min.toFixed(0)}&#176;`;
    
            const sunrise = new Date(data.sys.sunrise * 1000);
            const sunset = new Date(data.sys.sunset * 1000);
            const timeInCity = new Date(data.dt* 1000);
    
            const riseHours = sunrise.getHours();
            const riseMinutes = sunrise.getMinutes();
            const riseSeconds = sunrise.getSeconds();    
            
            const setHours = sunset.getHours();
            const setMinutes = sunset.getMinutes();
            const setSeconds = sunset.getSeconds();
    
            const timeInHours = timeInCity.getHours();
            const timeInMinutes = timeInCity.getMinutes();
            const timeInSeconds = timeInCity.getSeconds(); //incase I want to add seconds to the time
    
            Sunrise.innerHTML= `${padTo2Digits(riseHours)}:${padTo2Digits(riseMinutes)}:${padTo2Digits(riseSeconds)}`;
            Sunset.innerHTML=  `${padTo2Digits(setHours)}:${padTo2Digits(setMinutes)}:${padTo2Digits(setSeconds)}`;
            cityTime.innerHTML=  `${padTo2Digits(timeInHours)}:${padTo2Digits(timeInMinutes)}`;
            dateAndTime.innerHTML = `${humanDateFormat}`;
    
            condition.innerHTML = `${data.weather[0].main}`;

            icon.setAttribute('src',`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`);

            cloudy.innerHTML = `${data.clouds.all}%`;
            humidity.innerHTML = `${data.main.humidity}%`;
            windSpeed.innerHTML = `${data.wind.speed}km/h`;

            latitude.innerHTML = `${data.coord.lat}&#176; N`;
            longitude.innerHTML = `${data.coord.lon}&#176; E`;
            }
            catch(e){
                console.log(e);
            }
        }
    
        let city = input.value;
        
        loadWeather(city);
    
        input.value = "";
    
    })

