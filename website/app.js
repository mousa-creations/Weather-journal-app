/* Global Variables */
let zipCode = document.getElementById("zip");
const btn = document.getElementById("generate");
let fling = document.getElementById("feelings");
let tmp = document.getElementById("temp");

// Personal API Key for OpenWeatherMap API
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=26876077cb4a2b9a1b8d0fc2775f3dd0&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = +d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

/* Function called by event listener */
btn.addEventListener("click", (generate) => {
  if (!zipCode.value) {
    alert("Please,enter a zip code"); // if a user enters a non-value in the zip code
  } else {
    // if a user enters a value in the zip code
    getData(baseURL, zipCode, apiKey).then((tmp) => {
      // calling 3 functions chained by .then() method
      postData("/add", {
        temp: tmp,
        date: newDate,
        feelings: feelings.value,
      }).then((data) => {
        updateUI();
      });
    });
  }
});

/* Function to GET Web API Data*/
const getData = async (baseURL, zipCode, apiKey) => {
  // Use async get
  // Use await fetch to get temperature data from OpenWeatherMap API
  const resp = await fetch(baseURL + zipCode.value + apiKey);
  try {
    // Convert the data stored in request constant from JSON format to javascript
    const data = await resp.json();
    //console.log(data);
    return data.main.temp;
  } catch (error) {
    //console.log("Error, server is down", error);
    alert(("Error, Server Is Down", error));
  }
};

/* Function to POST data */
// User input post data function
const postData = async (url = "", data = {}) => {
  // Use async post
  let response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    // Convert the data stored in request constant from JSON format to javascript
    const nwData = await response.json();
    return nwData;
  } catch (error) {
    console.log("error, data non response", error);
  }
};

// Use updateUI Function to get the data from the server
const updateUI = async () => {
  // Use async updateUI
  let req = await fetch("/all");
  try {
    // Convert the data stored in request constant from JSON format to javascript
    const nData = await req.json();
    // Update the UI HTML elements via innerHTML property
    document.getElementById("date").innerHTML = nData.date;
    document.getElementById("temp").innerHTML = nData.temp;
    document.getElementById("content").innerHTML = nData.content;
  } catch (error) {
    console.log("error", error);
  }
};
