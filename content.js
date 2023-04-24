function getFlightDetails() {
  // Get the flight details from the Google Flights page
  const origin = document.querySelector('input[name="origin"]').value;
  const destination = document.querySelector('input[name="destination"]').value;
  const departDate = document.querySelector('input[name="departureDate"]').value;
  const returnDate = document.querySelector('input[name="returnDate"]').value;
  const passengers = document.querySelector('div[aria-label="Passengers"]').innerText;

  // Send the flight details to the background script
  chrome.runtime.sendMessage({type: "flightDetails", origin, destination, departDate, returnDate, passengers});
}

// Listen for the "Get Car Rental" button click
document.addEventListener("click", function(event) {
  if (event.target.matches("#car-rental-btn")) {
    // Get the flight details and send them to the background script
    getFlightDetails();
  }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === "carRental") {
    // Display the car rental information on the Google Flights page
    const carRentalInfo = request.data;
    // Your code to display the car rental information on the page
  }
});
