//These lines of code retrieve references to various HTML elements using their respective IDs.
const displayCity = document.getElementById("City");
const displayWeathericon = document.getElementById("currentinfo"); 
const displayTemp = document.getElementById("temperature");
const displayPressure = document.getElementById("pressure");
const displayHumidity = document.getElementById("humidity");
const displayWind = document.getElementById("wind-speed");
const displayweatherdescrip = document.getElementById("checkdescription")
const datevar = document.getElementById("date");
const dayvar = document.getElementById("day");

// This event listener prevents the default form submission behavior when the form with ID "formDiv" is submitted.
document.getElementById("formDiv").addEventListener("submit",(e)=>{
    e.preventDefault();
    
});

//When the window is loaded, it call the function displaydefaultweatherinfo(), which is responsible for displaying the default weather information on page load.
window.addEventListener("load",displaydefaultweatherinfo);


//This Asynchronous function is used to fetch the weather data of default city which is redcar in metric units.
async function displaydefaultweatherinfo(){
    try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=redcar&units=metric&appid=e02d1cd9b32f99953630a3142806d7e4`);
    const data = await response.json();
    console.log(data);
    
    //Extract the weather information from response data and display it.
    displayCity.innerHTML = `${data.name}`;
    displayTemp.innerHTML = `${data.main.temp}°C`;
    displayPressure.innerHTML = `${data.main.pressure}`;
    displayHumidity.innerHTML = `${data.main.humidity}%`;
    displayWind.innerHTML = `${data.wind.speed} Km/H`;
    displayweatherdescrip.innerHTML = `${data.weather[0].description}`
    const icon = data.weather[0].icon;
    displayWeathericon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;




    var timestamp = data.dt;

    //getting date info

    var date = new Date(timestamp * 1000);
    var formattedDate = date.toLocaleString('en-us', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    var formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    datevar.innerHTML = formattedDate;  //Display formatted date
    dayvar.innerHTML = formattedTime;  // Display formatted time
    
    }catch{
        console.log(error);
        alert(error);
    }


}

//This Asynchronous function is used to fetch the weather data of user input and display it in metric units.
async function displayweatherinfo(){
    try{
        const inputCity = document.getElementById("search").value;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=e02d1cd9b32f99953630a3142806d7e4`);
    const data = await response.json();
    console.log(data);

    // if the API response the 404 status then its show the alert message as "City not Found !!!"
    if(data.cod == 404){
        alert ("City not Found !!!")
        return;
    }

    displayCity.innerHTML = `${data.name}`;
    displayTemp.innerHTML = `${data.main.temp}°C`;
    displayPressure.innerHTML = `${data.main.pressure}`;
    displayHumidity.innerHTML = `${data.main.humidity}%`;
    displayWind.innerHTML = `${data.wind.speed} Km/H`;
    displayweatherdescrip.innerHTML = `${data.weather[0].description}`
    const icon = data.weather[0].icon;
    displayWeathericon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;  // Display the Weather icon



    //getting date, day and time info

    var timestamp = data.dt;  // Get the timestamp from response data
    var date = new Date(timestamp * 1000);
    var formattedDate = date.toLocaleString('en-us', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    var formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    datevar.innerHTML = formattedDate;
    dayvar.innerHTML = formattedTime;
    
    }catch{
        console.log(error);
        alert(error);
    }


}

