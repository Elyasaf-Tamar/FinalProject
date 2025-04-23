// API Constants
const API_KEY = "api_key=70852a6662a3cc3876a7e3722d14d804";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// DOM Elements
const navbar = document.getElementById("navBar");
const moviesContainer = document.getElementById("movies-container");
const submitButton = document.getElementById("submit");

// Navbar scroll effect
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 0);
  });
}

// Form submission handling
if (submitButton) {
  submitButton.onclick = function (event) {
    event.preventDefault();
    const formData = {
      userName: document.getElementById("userName").value,
      password: document.getElementById("pass").value,
      phoneNumber: document.getElementById("pN").value,
    };

    // Save to localStorage
    Object.entries(formData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    console.log("המידע נשמר בהצלחה!");
  };
}

// Load user data on page load
window.onload = function () {
//   const userData = ["userName", "password", "phoneNumber"].map((key) => ({
//     key,
//     value: localStorage.getItem(key),
//   }));

//   if (userData.every((item) => item.value)) {
//     userData.forEach((item) => console.log(`${item.key}: ${item.value}`));
//   } else {
//     console.log("No data found in Local Storage.");
//   }

  // Fetch movies on page load
  getMovies(API_URL);
};

// Navigation function
function goToHome() {
  window.location.href = "p.html";
}

// Movie fetching and display functions
async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function showMovies(movies) {
  if (!moviesContainer) return;

  moviesContainer.innerHTML = ""; // Clear existing content

  for (let i = 0; i < movies.length; i += 3) {
    const row = document.createElement("div");
    row.classList.add("movie-row");

    const rowMovies = movies.slice(i, i + 3);
    rowMovies.forEach((movie) => {
      const card = createMovieCard(movie);
      row.appendChild(card);
    });

    moviesContainer.appendChild(row);
  }
}

function createMovieCard(movie) {
    const { title, poster_path, vote_average, overview, release_date } = movie;
  
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie", "card"); // הוספתי את class="card"
  
    movieEl.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${poster_path ? IMG_URL + poster_path : "placeholder.jpg"}" alt="${title}">
        </div>
        <div class="card-back">
          <div class="card-content">
            <h2 class="card-title">${title}</h2>
            <p>${overview}</p>
            <p><strong>דירוג צופים:</strong> ${vote_average}</p>
            <p><strong>תאריך בכורה:</strong> ${release_date}</p>
          </div>
        </div>
      </div>
    `;
  
    // אירוע שמסובב את הכרטיס
    movieEl.addEventListener("click", () => {
      const inner = movieEl.querySelector(".card-inner");
      inner.classList.toggle("flipped");
    });
  
    return movieEl;
  }
  