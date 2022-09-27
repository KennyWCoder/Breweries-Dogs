// Initialize city and state
var city = "";
var state = "";

// Search button
var searchBtn = document.getElementById("search-btn");

var breweryList = document.querySelectorAll(".brewery-name");

// Searches for breweries and displays dog photo when search button is clicked
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Gets the value of user input city
  city = document.getElementById("search-city").value;
  state = document.getElementById("search-state").value;
  console.log(city);
  console.log(state);
  fetchBreweries();
  fetchDogs();
});

var breweryName = document.getElementsByClassName("brewery-name");
var breweryAddress = document.getElementsByClassName("address");
var breweryCityStateZip = document.getElementsByClassName("city");
var breweryPhone = document.getElementsByClassName("phone");
var breweryWebsite = document.getElementsByClassName("website");

// Fetches breweries
function fetchBreweries() {
  // Brewery API URL
  var breweryAPIURL =
    "https://api.openbrewerydb.org/breweries?by_state=" +
    state +
    "&by_city=" +
    city +
    "&per_page=5";

  console.log(breweryAPIURL);
  fetch(breweryAPIURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (var i = 0; i < breweryList.length; i++) {
        console.log(data.name);
        breweryName[i].textContent = data[i].name;
        breweryAddress[i].textContent = data[i].street;
        breweryCityStateZip[i].textContent =
          data[i].city + ", " + data[i].state + ", " + data[i].postal_code;
        breweryPhone[i].textContent = data[i].phone;
        breweryWebsite[i].textContent = data[i].website_url;

        breweryWebsite[i].setAttribute("href", data[i].website_url);
      }
    });
  // .catch(function (error) {
  //   alert("Please enter a valid city name");
  //   return;
  // });
}

// Dog photo image section
var dogPhoto = document.getElementById("dog-photo");

// Fetches random dog photo
function fetchDogs() {
  // Random Dog photo API URL
  var dogAPIURL = "https://dog.ceo/api/breeds/image/random";

  fetch(dogAPIURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.message);
      dogPhoto.setAttribute("src", data.message);
      dogPhoto.setAttribute("alt", "cute dog photo");
    });

  // might not need this since there wont be errors
  // .catch(function (error) {
  //   alert("Please enter a valid city name");
  //   return;
  // });
}

// TODO: Add function for local storage to save city searches OR to save specific brewerires
// TODO: when saved searches are clicked, it goes to that search results
// TODO: add if statement so that user always has to enter a city because if no city is entered but search button is clicked, it'll still return some random data
// TODO: hide dog photo
