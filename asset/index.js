// Brewery API
var breweryAPIURL = "https://api.openbrewerydb.org/breweries?by_city" + city "&per_page=5";

// Random Dog photo API
var dogAPIURL = "https://dog.ceo/api/breeds/image/random";

// Initialize city
var city="";

// TODO: Add event listener to run these two fetch requests when search button is clicked 

// Basic fetch request for Brewery API
fetch(breweryAPIURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
})
.catch(function (error) {
  alert("Please enter a valid city name");
  return; 
});

// Basic fetch request for Random Dog API
fetch(dogAPIURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
})
.catch(function (error) {
  alert("Please enter a valid city name");
  return;
});


// TODO: Add function for local storage to save city searches OR to save specific brewerires
// TODO: when saved searches are clicked, it goes to that search results