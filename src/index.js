import "./styles.css"

async function londonWeather (url) {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=BWMQYXAY8TAW5VKZ9DGNDN9GT')
    
    const data = await response.json();
    console.log(data);
}

londonWeather();