const apiKey = "36aae90582723ed9c3894e15dddbb1ab";
const weatherKey = "cdc47ddac1ec469381f215204263003";

let appMode = "home";

let appState = {
  mood: null,
  genreId: null,
  searchQuery: ""
};

const moodToGenre = {
  happy: 35,
  bored: 99,
  energetic: 28,
  relaxed: 18
};

function setMode(mode) {
  appMode = mode;

  homeScreen.classList.add("hidden");
  appScreen.classList.remove("hidden");

  updateUI();
}

function goHome() {
  homeScreen.classList.remove("hidden");
  appScreen.classList.add("hidden");
}

function updateUI() {
  movieSection.classList.add("hidden");
  cookingSection.classList.add("hidden");
  weatherSection.classList.add("hidden");

  if (appMode === "movie") movieSection.classList.remove("hidden");
  if (appMode === "cooking") cookingSection.classList.remove("hidden");
  if (appMode === "weather") weatherSection.classList.remove("hidden");
}

// MOVIES
function renderMovies(movies) {
  movies_display.innerHTML = "";

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie";

    const img = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450";

    div.innerHTML = `
      <img src="${img}" />
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
    `;

    movies_display.appendChild(div);
  });
}

function fetchMovies() {
  let url = "";

  if (appState.searchQuery) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${appState.searchQuery}`;
  } else if (appState.genreId) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${appState.genreId}`;
  } else if (appState.mood) {
    const g = moodToGenre[appState.mood];
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${g}`;
  }

  if (!url) return;

  movies_display.innerHTML = "Loading...";

  fetch(url)
    .then(res => res.json())
    .then(data => renderMovies(data.results || []));
}

// EVENTS
function setMood(m) {
  appState.mood = m;
  appState.genreId = null;
  appState.searchQuery = "";
  searchInput.value = "";
  fetchMovies();
}

searchInput.addEventListener("input", e => {
  appState.searchQuery = e.target.value;
  appState.genreId = null;
  fetchMovies();
});

// GENRES
fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    data.genres.forEach(g => {
      let btn = document.createElement("button");
      btn.innerText = g.name;

      btn.onclick = () => {
        appState.genreId = g.id;
        appState.searchQuery = "";
        searchInput.value = "";
        fetchMovies();
      };

      genre_display.appendChild(btn);
    });
  });

// WEATHER
function getWeather() {
  const city = document.getElementById("cityInput").value;

  const url = `https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${city}`;

  weatherResult.innerHTML = "Loading...";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const condition = data.current.condition.text.toLowerCase();
      const temp = data.current.temp_c;
      const location = data.location.name;

      let suggestion = "";
      let action = "";

      if (condition.includes("rain")) {
        suggestion = "Perfect weather for movies 🎬";
        action = "movie";
      }

      else if (condition.includes("sun") || condition.includes("clear")) {
        suggestion = "Great time to go outside 🌳";
        action = "outdoor";
      }

      else if (condition.includes("cloud")) {
        suggestion = "Nice cozy weather for cooking 🍳";
        action = "cooking";
      }

      else {
        suggestion = "Try something relaxing 😊";
        action = "general";
      }

      weatherResult.innerHTML = `
        <h3>${location}</h3>
        <p>🌡️ ${temp}°C</p>
        <p>${data.current.condition.text}</p>
        <h3>${suggestion}</h3>
        <button onclick="handleWeatherAction('${action}')">
          Do this →
        </button>
      `;
    });
}

function handleWeatherAction(action) {
  if (action === "movie") {
    setMode("movie");
    appState.genreId = 35;
    fetchMovies();
  }

  else if (action === "cooking") {
    setMode("cooking");
  }

  // ☀️ Outdoor Ideas
  else if (action === "outdoor") {
    alert("Go outside! Walk, cycle, explore 🌳");
  }

  else {
    alert("Try something fun!");
  }
}