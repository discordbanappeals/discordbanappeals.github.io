// Get the search input element from the HTML DOM
const searchInput = document.querySelector(".search-input");

// Add an event listener to the search input to listen for changes
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase().trim(); // Get the search value from the input and normalize it
  let numServersFound = 0; // Initialize the number of servers found to 0

  // Loop through each server and show/hide it based on whether it matches the search value
  document.querySelectorAll(".server").forEach((server) => {
    const name = server.querySelector(".server-name").textContent.toLowerCase(); // Get the server name and normalize it
    const description = server
      .querySelector(".server-description")
      .textContent.toLowerCase(); // Get the server description and normalize it

    if (name.includes(searchValue) || description.includes(searchValue)) {
      server.style.display = "flex"; // Show the server if it matches the search value
      numServersFound++; // Increment the number of servers found
    } else {
      server.style.display = "none"; // Hide the server if it doesn't match the search value
    }
  });

  // If no servers were found, create an element saying "No servers found"
  if (numServersFound === 0) {
    const noServersFound = document.createElement("p");
    noServersFound.classList.add("no-servers-found");
    noServersFound.textContent = "No servers found.";
    serverList.appendChild(noServersFound);
  } else {
    // Otherwise, remove the "No servers found" element if it exists
    const noServersFound = document.querySelector(".no-servers-found");
    if (noServersFound) {
      serverList.removeChild(noServersFound);
    }
  }
});

// Get the server list and loader elements from the HTML DOM
const serverList = document.querySelector(".server-list");
const loader = document.querySelector(".loader");

// Show the loader while loading the servers data
loader.style.display = "block";

// Fetch server data from the servers.json file
fetch("servers.json")
  .then((response) => response.json())
  .then((data) => {
    // Hide the loader when the servers data is loaded
    loader.style.display = "none";

    // Filter the premium servers
    const premiumServers = data.servers.filter((server) => server.premium);

    // Sort the premium servers by name
    premiumServers.sort((a, b) => (a.name > b.name ? 1 : -1));

    // Loop through each premium server and create a server listing
    premiumServers.forEach((server) => {
      const serverItem = createServerListing(server, true); // create a server listing with the premium class
      serverList.insertBefore(serverItem, serverList.firstChild); // add the premium server listing to the top of the server list
    });

    // Filter the standard servers
    const standardServers = data.servers.filter((server) => !server.premium);

    // Sort the standard servers by name
    standardServers.sort((a, b) => (a.name > b.name ? 1 : -1));

    // Loop through each standard server and create a server listing
    standardServers.forEach((server) => {
      const serverItem = createServerListing(server, false); // create a server listing without the premium class
      serverList.appendChild(serverItem); // add the standard server listing to the bottom of the server list
    });
  })
  .catch((error) => console.error(error));

// Function to create a server listing element with the given server data
function createServerListing(server, isPremium) {
  const serverItem = document.createElement("a"); // create an anchor element to wrap each server listing
  serverItem.href = server.appealUrl; // set the URL of the anchor element to the server's appeal URL
  serverItem.classList.add("server"); // add the "server" CSS class to the anchor element
  if (isPremium) {
    serverItem.classList.add("premium"); // add the "premium" CSS class to the anchor element if the server is premium
  }

  // Set the inner HTML of the anchor element to the server listing
  serverItem.innerHTML = `
    <div class="server-icon">
      <img src="${server.icon}" alt="Server Icon" />
    </div>
    <div class="server-details">
      <h2 class="server-name">${server.name}</h2>
      <p class="server-description">${server.description}</p>
    </div>
    <div class="server-action-box">
      <div class="server-action">
        <span class="server-action-label">Appeal</span>
      </div>
    </div>
  `;

  return serverItem;
}
