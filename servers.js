// Get the server list and loader elements from the HTML DOM
const serverList = document.querySelector(".server-list");
const loader = document.querySelector(".loader");

// Show the loader while loading the servers data
loader.style.display = "block";

// Fetch server data from the servers.json file
fetch("servers.json")
  .then(response => response.json())
  .then(data => {
    // Hide the loader when the servers data is loaded
    loader.style.display = "none";

    // Loop through each server in the server data and create a server listing
    data.servers.forEach(server => {
      const serverItem = document.createElement("a"); // create an anchor element to wrap each server listing
      serverItem.href = server.appealUrl; // set the URL of the anchor element to the server's appeal URL
      serverItem.classList.add("server"); // add the "server" CSS class to the anchor element

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

      // Add the server listing to the server list
      serverList.appendChild(serverItem);
    });
  })
  .catch(error => console.error(error));