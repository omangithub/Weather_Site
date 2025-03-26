import "./styles.css"

/* two different ways of accessing the weather api with asynchronous coding

async function londonWeather (url) {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=BWMQYXAY8TAW5VKZ9DGNDN9GT')
    
    const data = await response.json();
    console.log(data);
}

async function londonWeather2 (url) {
    const response = fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=BWMQYXAY8TAW5VKZ9DGNDN9GT')
      .then ((response) => response.json())  
      .then((data)=>{console.log(data)})  
}

console.log(londonWeather());
console.log(londonWeather2());

*/

let currentLocation = "Tokyo";
let currentWeather = "Weather";

const submitBut = document.getElementById("location-button");

submitBut.addEventListener("click", (event)=>{
    event.preventDefault();
    const locationInput = document.getElementById("location");
    currentLocation=locationInput.value;
    updateWeather();
})

async function updateImage () {
    const img = document.querySelector('img');

    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=OTwP7M8Z3HLGRPTwGTA7zHKZo17UtrKm&s=${currentWeather}`, {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        img.src = response.data.images.original.url;
      })
}


async function updateWeather () {
    const loading = document.getElementById("green-bar");
    const errorRed = document.getElementById("red-bar");
    const completedText = document.getElementById("progress-text");
    let newErrorText = document.getElementById("error-text");
    newErrorText.classList.add("hidden");
    completedText.classList.add("hidden");
    loading.style.width="0%"
    errorRed.classList.add("hidden");

    let parsedData = [];
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${currentLocation},Japan?key=BWMQYXAY8TAW5VKZ9DGNDN9GT`, {mode: 'cors'})
      .then ((response) => response.json())  
      .then((data)=>{
        loadingBar()
        currentWeather = data.currentConditions.conditions;

        let newWeatherText = document.getElementById("current-weather")
        newWeatherText.innerText= currentWeather;
        let newLocationText = document.getElementById("current-location")
        newLocationText.innerText= currentLocation;

        changeBackground()

        let descriptionData= data.description;
        let newDescriptionText = document.getElementById("description") 
        newDescriptionText.innerText=descriptionData;   
        console.log(descriptionData)    
    })
      .then(updateImage(parsedData.weather))
      .catch((err)=> {
        completedText.classList.toggle("hidden");
        loading.classList.toggle("hidden")
        errorRed.classList.toggle("hidden");
        newErrorText.classList.toggle("hidden");       
      })
}

function changeBackground () {
    let backgroundColor = document.querySelector("body");
    if(currentWeather==="Partially cloudy") {
        backgroundColor.style.backgroundColor="grey";
    } else if (currentWeather==="Sunny") {
        backgroundColor.style.backgroundColor="yellow";        
    } else if (currentWeather==="Overcast") {
        backgroundColor.style.backgroundColor="rgb(188, 188, 253)"
    } else if (currentWeather==="Clear") {
        backgroundColor.style.backgroundColor="white"; 
}}

async function loadingBar () {
    const loading = document.getElementById("green-bar");
    loading.classList.remove("hidden")

    function waitforme () {return new Promise(resolve => setTimeout(resolve, 1.74))};


    for (let i=0;i<101;i++) {
        await waitforme();
        loading.style.width=`${i}%`
    }
    let completedText = document.getElementById("progress-text");
    completedText.classList.toggle("hidden");
    completedText.innerText="Loading complete"; 

    //loading time 2.9min
}

updateWeather();