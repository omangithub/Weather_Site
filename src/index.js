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

async function londonWeather (location) {
    const response = fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Tokyo,Japan?key=BWMQYXAY8TAW5VKZ9DGNDN9GT')
      .then ((response) => response.json())  
      .then((data)=>{console.log(data)})  
}

console.log(londonWeather());