// Search button
var searchBtn = document.getElementById("search-btn");

// Clear search history button
var clearHistory = document.getElementById("clear-search");

// Displays previous searches
var showHistory = document.getElementById("search-history");

// Search History
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

// Dog photo image section
var dogPhoto = document.getElementById("dog-photo");

// Searches for breweries and displays dog photo when search button is clicked
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Gets the value of user inputted city and state
  var city = document.getElementById("search-city").value;
  var state = document.getElementById("search-state").value;
  console.log(city);
  console.log(state);

  fetchBreweries(city, state);
  fetchDogs();

  // Adds search to search history
  searchHistory.push({ city: city, state: state });
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
});

// Clears search history when clear button is clicked
clearHistory.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  renderSearchHistory();
});

// Displays search history
function renderSearchHistory() {
  showHistory.innerHTML = "";

  // Removes duplicate searches from appearing under the search history
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }
  const searchUnique = getUniqueListBy(searchHistory, "city");
  console.log(searchUnique);

  for (var i = 0; i < searchUnique.length; i++) {
    console.log(searchHistory[i]);
    console.log(searchHistory);

    const historyList = document.createElement("input");
    historyList.setAttribute("type", "text");
    historyList.setAttribute(
      "class",
      "waves-effect waves-teal btn-flat flow-text"
    );

    // set array object city and state into attribute so we can get the direct city and state to use the function of fetchBreweries.
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

      // Creates a card for each brewery and adds it to the brewery list
      for (var i = 0; i < data.length; i++) {
        var breweryList = document.createElement("div");
        breweryList.className = "brewery-container card";
        document.getElementById("breweries").appendChild(breweryList);
      }

      // Container for each brewery info card
      var breweryContainer = document.querySelectorAll(".brewery-container");

      // Inserts data for each brewery
      for (var i = 0; i < data.length; i++) {
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

        // Creates links to brewery phone number
        var breweryPhone = document.createElement("a");
        if (data[i].phone != null) {
          breweryPhone.innerHTML = "📞  " + data[i].phone;
        } else {
          breweryPhone.innerHTML = "";
        }
        breweryPhone.setAttribute("href", "tel:" + data[i].phone);
        breweryPhone.setAttribute("target", "_blank");
        breweryContainer[i].appendChild(breweryPhone);

        // Creates links to brewery website
        var breweryWebsite = document.createElement("a");
        if (data[i].website_url != null) {
          breweryWebsite.innerHTML = "🖥  " + data[i].website_url;
        } else {
          breweryWebsite.innerHTML = "";
        }
        breweryWebsite.setAttribute("href", data[i].website_url);
        breweryWebsite.setAttribute("target", "_blank");
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
    });
}

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
