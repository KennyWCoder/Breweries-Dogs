
// Search button
var searchBtn = document.getElementById("search-btn");

var clearHistory = document.getElementById("clear-search");

var showHistory = document.getElementById("search-history");


// var breweryHeader = document.querySelector("#brewery-header");

var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// Searches for breweries and displays dog photo when search button is clicked
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  // Gets the value of user input city
  var city = document.getElementById("search-city").value;
  var state = document.getElementById("search-state").value;
  console.log(city);
  console.log(state);
  fetchBreweries(city, state);
  fetchDogs();
  //set object
  searchHistory.push({"city": city, "state": state});
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
});

clearHistory.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  renderSearchHistory();
})

function renderSearchHistory() {
  showHistory.innerHTML = "";
  for (var i = 0; i < searchHistory.length; i++) {
    var passObj = JSON.stringify(searchHistory[i]);
    console.log(searchHistory[i]);
      const historyList = document.createElement("input");
      historyList.setAttribute("type", "text");
      //need css
      historyList.setAttribute("class", "waves-effect waves-teal btn-flat");
      //set array object city and state into attribute so we can get the direct city and state to use the function of fetchBreweries.
      historyList.setAttribute("value", searchHistory[i].city + ", " + searchHistory[i].state);
      historyList.setAttribute("city",searchHistory[i].city);
      historyList.setAttribute("state",searchHistory[i].state);
      historyList.setAttribute("readonly", true);
      historyList.addEventListener("click", function(event) {
          fetchBreweries(historyList.getAttribute("city"), historyList.getAttribute("state"));
          fetchDogs();
      })
      showHistory.append(historyList);
  }
}


// Fetches breweries
function fetchBreweries(city, state) {
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
      //for loop to create div
      document.getElementById("breweries").innerHTML = "";
      for (var i = 0; i < data.length; i++) {
      var breweryList = document.createElement("div");
      breweryList.className = "brewery-container card";
      document.getElementById("breweries").appendChild(breweryList);
      }
      //select newly created container
      var breweryContainer = document.querySelectorAll(".brewery-container");
      //for loop to create element
      for (var i = 0; i < data.length; i++) {
        console.log(data.name);
        console.log(breweryList.length);

        breweryContainer[i].innerHTML= "";
        //create brewery name header
        var breweryName = document.createElement("h4");
        breweryName.innerHTML = data[i].name;
        breweryContainer[i].append(breweryName);
        //create brewery address
        var breweryAddress = document.createElement("p");
        breweryAddress.innerHTML = data[i].street;
        breweryContainer[i].appendChild(breweryAddress);
        var breweryAddress2 = document.createElement("p");
        breweryAddress2.innerHTML = data[i].city + ", " + data[i].state + ", " + data[i].postal_code;
        breweryContainer[i].appendChild(breweryAddress2);
        //create brewery phone contact
        var breweryPhone = document.createElement("a");
        breweryPhone.innerHTML = "📞  " + data[i].phone;
        breweryPhone.setAttribute("href", "tel:" + data[i].phone);
        breweryContainer[i].appendChild(breweryPhone);
        var breweryWebsite = document.createElement("a");
        breweryWebsite.innerHTML = "🖥  " + data[i].website_url;
        breweryWebsite.setAttribute("href", data[i].website_url);
        breweryContainer[i].appendChild(breweryWebsite);
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
      dogPhoto.classList.remove("hide");
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
