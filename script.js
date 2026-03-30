let mood = "happy";

function setMood(m) {
  mood = m;
}

const timeRange = document.getElementById("timeRange");
const timeLabel = document.getElementById("timeLabel");

timeRange.addEventListener("input", () => {
  timeLabel.innerText = timeRange.value + " min";
});

function getSuggestion() {
  const time = timeRange.value;
  const city = document.getElementById("city").value;

  let title = "";
  let desc = "";

  if (mood === "bored" && time < 60) {
    title = "Watch a Movie 🎬";
    desc = "Try something entertaining indoors";
  } 
  else if (mood === "energetic") {
    title = "Workout 🏋️";
    desc = "Burn that energy!";
  } 
  else if (mood === "relaxed") {
    title = "Go for a Walk 🌳";
    desc = "Enjoy some calm outdoor time";
  } 
  else {
    title = "Try Something New 🎯";
    desc = "Explore a random activity";
  }

  document.getElementById("title").innerText = title;
  document.getElementById("desc").innerText =
    desc + (city ? ` in ${city}` : "");
}