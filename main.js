// v2 of ban appeals was made by 3kh0
// discord.gg/3kh0

// create a new script element
var script = document.createElement("script");

// set the src attribute to the arc.io widget URL
script.src = "https://arc.io/widget.min.js#K7LbCv6X";

// add the script
document.body.appendChild(script);

//Force Https Connections
if (location.protocol !== "https:") {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
