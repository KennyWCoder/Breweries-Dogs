// Search button
var searchBtn = document.getElementById("search-btn");

// Clear search history button
var clearHistory = document.getElementById("clear-search");

// Displays previous searches
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

  // create an if statement where if input == null, then return

  // if (!city && state) {
  //   alert("error");
  // } else {
  fetchBreweries(city, state);
  fetchDogs();
  //set object

  // Adds search to search history
  searchHistory.push({ city: city, state: state });
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
});

// Clears search history when clear button is clicked
clearHistory.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  // searchUnique = [];
  renderSearchHistory();
});

//test


// Displays search history
function renderSearchHistory() {
  showHistory.innerHTML = "";

  //remove duplicate
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }
  const searchUnique = getUniqueListBy(searchHistory, "city");
  console.log(searchUnique);

  for (var i = 0; i < searchUnique.length; i++) {
    console.log(searchHistory[i]);
    console.log(searchHistory);

    const historyList = document.createElement("input");
    historyList.setAttribute("type", "text");
    //need css
    historyList.setAttribute("class", "waves-effect waves-teal btn-flat");
    //set array object city and state into attribute so we can get the direct city and state to use the function of fetchBreweries.
    historyList.setAttribute(
      "value",
      searchUnique[i].city + ", " + searchUnique[i].state
    );
    historyList.setAttribute("city", searchUnique[i].city);
    historyList.setAttribute("state", searchUnique[i].state);
    historyList.setAttribute("readonly", true);

    historyList.addEventListener("click", function (event) {
      fetchBreweries(
        historyList.getAttribute("city"),
        historyList.getAttribute("state")
      );
      fetchDogs();
    });
    showHistory.append(historyList);
  }
}

renderSearchHistory();

// Fetches brewery data
function fetchBreweries(city, state) {
  // Brewery API URL
  var breweryAPIURL =
    "https://api.openbrewerydb.org/breweries?by_state=" +
    state +
    "&by_city=" +
    city +
    "&per_page=5";

  console.log(city);
  console.log(state);
  console.log(breweryAPIURL);

  fetch(breweryAPIURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //for loop to create div
      console.log(data);
      document.getElementById("breweries").innerHTML = "";

      // If city or state
      // if (!city || state) {
      //   alert("no breweries");
      //   return;
      // }

      // Creates a card for each brewery and adds it to the brewery list
      for (var i = 0; i < data.length; i++) {
        var breweryList = document.createElement("div");
        breweryList.className = "brewery-container card";
        document.getElementById("breweries").appendChild(breweryList);

        // if (data.length == 0) {
        //   ("alert: no breweries in your city");
        // }
      }

      // Container for each brewery info card
      var breweryContainer = document.querySelectorAll(".brewery-container");

      // Inserts data for each brewery
      for (var i = 0; i < data.length; i++) {
        console.log(data.name);
        console.log(breweryList.length);

        breweryContainer[i].innerHTML = "";

        // Creates header for brewery name
        var breweryName = document.createElement("h4");
        breweryName.innerHTML = data[i].name;
        breweryContainer[i].append(breweryName);

        // Creates brewery address
        var breweryAddress = document.createElement("p");
        breweryAddress.innerHTML = data[i].street;
        breweryContainer[i].appendChild(breweryAddress);
        var breweryAddress2 = document.createElement("p");
        breweryAddress2.innerHTML =
          data[i].city + ", " + data[i].state + ", " + data[i].postal_code;
        breweryContainer[i].appendChild(breweryAddress2);

        // Creates and links to brewery phone number
        var breweryPhone = document.createElement("a");
        if(data[i].phone != null) {
          breweryPhone.innerHTML = "📞  " + data[i].phone;
        } else {
          breweryPhone.innerHTML = "";
        }
        breweryPhone.setAttribute("href", "tel:" + data[i].phone);
        breweryContainer[i].appendChild(breweryPhone);

        // Creates links to brewery website
        var breweryWebsite = document.createElement("a");
        if(data[i].website_url != null) {
          breweryWebsite.innerHTML = "🖥  " + data[i].website_url;
        }else {
          breweryWebsite.innerHTML = "";
        }
        
        breweryWebsite.setAttribute("href", data[i].website_url);
        breweryContainer[i].appendChild(breweryWebsite);
      }

      // Displays a message when no breweries are found
      if (!data.length) {
        var noBrewery = document.createElement("h5");
        noBrewery.innerHTML =
          "Sorry, no breweries were found. On the plus side, you can still enjoy a cute dog photo!";

        document.getElementById("breweries").appendChild(noBrewery);
        return;
      }

      // if (city && state == null) {
      //   alert("no city and state entered");
      //   return;
      // }
    });

  // TODO: this catch doesnt work
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
      // Unhides the dog photo image section
      dogPhoto.classList.remove("hide");
      // Adds alt attribute to images
      dogPhoto.setAttribute("alt", "cute dog photo");
    });
}

// TODO: add if statement so that user always has to enter a city because if no city is entered but search button is clicked, it'll still return some random data

// TODO: Add splice or filter so no duplicate searches added to the webpage

// TODO: if phone number or website is null, then hide it
