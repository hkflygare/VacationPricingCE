const API_KEY = 'YOUR_EXPEDIA_API_KEY';

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "flightDetails") {
    // Send the flight details to the Expedia API to get the car rental information
    const { origin, destination, departDate, returnDate, passengers } = request;
    const apiUrl = `https://api.expediapartnercentral.com/carrental/search/v3/cars?pickupLocation=${origin}&pickupDateTime=${departDate}&dropoffLocation=${destination}&dropoffDateTime=${returnDate}&sort=PRICE_ASCENDING&pageSize=1&currencyCode=USD&travelerInfo=1,${passengers}`;
    const headers = {
      'Authorization': `expedia-apikey ${API_KEY}`,
      'Accept': 'application/vnd.exp-carrental.v3+json'
    };
    fetch(apiUrl, { headers })
      .then(response => response.json())
      .then(data => {
        // Send the car rental information back to the content script
        const carRentalInfo = data.searchResults.results[0];
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { type: "carRental", data: carRentalInfo });
        });
      })
      .catch(error => console.error(error));
  }
});
