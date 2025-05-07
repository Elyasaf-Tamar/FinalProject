// API Constants
const API_KEY = "api_key=70852a6662a3cc3876a7e3722d14d804";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

let genreMap = {};

async function loadGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?${API_KEY}&language=en-US`);
  const data = await res.json();
  data.genres.forEach(genre => {
    genreMap[genre.id] = genre.name;
  });
}


window.onload = async function () {
  await loadGenres(); // ודא שז'אנרים נטענו קודם
  await getMovies(API_URL); // ואז טען סרטים לכרטיסים
  const res = await fetch(API_URL); // טען שוב לסליידר
  const data = await res.json();
  createSlideshow(data.results);
};


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
// כפתור המבורגר
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("navBar");

if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
        nav.classList.toggle("show");
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
  const { title, poster_path, vote_average, overview, release_date, genre_ids } = movie;

  const genres = genre_ids.map(id => genreMap[id]).filter(Boolean).join(", ");

  const movieEl = document.createElement("div");
  movieEl.classList.add("movie", "card");

  movieEl.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${poster_path ? IMG_URL + poster_path : "placeholder.jpg"}" alt="${title}">
      </div>
      <div class="card-back">
        <div class="card-content">
          <h2 class="card-title">${title}</h2>
          <p>${overview}</p>
          <p><strong>Rating:</strong> ${vote_average}</p>
          <p><strong>Release Date:</strong> ${release_date}</p>
          <p><strong>Genres:</strong> ${genres}</p>
        </div>
      </div>
    </div>
  `;
  movieEl.querySelector(".card-back").style.direction = "ltr";
  movieEl.querySelector(".card-back").style.textAlign = "left";

  movieEl.addEventListener("click", () => {
    const inner = movieEl.querySelector(".card-inner");
    inner.classList.toggle("flipped");
  });

  return movieEl;
}



const slideshowContainer = document.getElementById("movies-slideshow");



function createSlideshow(movies) {
  const container = document.createElement("div");
  container.classList.add("SlideShow-continar");

  // Only use the first 5 movies for the slideshow
  const slideshowMovies = movies.slice(0, 5);

  slideshowMovies.forEach((movie, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    if (index === 0) slide.style.opacity = "1";

    const img = document.createElement("img");
    img.src = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : "";
    img.alt = movie.title;
    img.loading = "lazy";

    const titleOverlay = document.createElement("div");
    titleOverlay.classList.add("slide-title");
    titleOverlay.textContent = movie.title;

    slide.appendChild(img);
    slide.appendChild(titleOverlay);
    container.appendChild(slide);
  });

  if (slideshowContainer) {
    slideshowContainer.innerHTML = "";
    slideshowContainer.appendChild(container);
    startSlideshow(container.children);
  }
}

function startSlideshow(slides) {
  let current = 0;
  const total = slides.length;

  setInterval(() => {
    slides[current].style.opacity = "0";
    current = (current + 1) % total;
    slides[current].style.opacity = "1";
  }, 4000); // Increased to 4 seconds per slide for better readability
}
document.getElementById("genre-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
    .map(el => el.value);

  const userId = "user123"; // בעתיד תחליף את זה למזהה אמיתי

  const res = await fetch(`http://localhost:3000/preferences/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ genres: selectedGenres })
  });

  const data = await res.json();
  alert(data.message);
});
const GENRE_API_URL = "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=70852a6662a3cc3876a7e3722d14d804";
const userId = "user123"; // בהמשך תוכל לשים מזהה אמיתי מההרשמה

async function loadGenresAndPreferences() {
  const res = await fetch(GENRE_API_URL);
  const genreData = await res.json();

  // הבא את ההעדפות שכבר שמורות ל־user הזה
  const savedPrefsRes = await fetch(`http://localhost:3000/preferences/${userId}`);
  const savedGenres = await savedPrefsRes.json(); // array of genre IDs

  const checkboxContainer = document.getElementById("genre-checkboxes");
  checkboxContainer.innerHTML = "";

  genreData.genres.forEach((genre) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "genre";
    checkbox.value = genre.id;

    // סמן אם כבר שמור למשתמש
    if (savedGenres.includes(genre.id)) {
      checkbox.checked = true;
    }

    const label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${genre.name}`));
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
  });
}

// שלח את הבחירה לשרת
document.getElementById("genre-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const selectedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'))
    .map(el => Number(el.value)); // וודא שהמספרים נשארים מספרים

  await fetch(`http://localhost:3000/preferences/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ genres: selectedGenres })
  });

  alert("ההעדפות נשמרו בהצלחה!");
});
// טען ז'אנרים והעדפות שמורות
async function loadGenresAndPreferences() {
  try {
    const res = await fetch(GENRE_API_URL);
    const genreData = await res.json();

    const savedPrefsRes = await fetch(`http://localhost:3000/preferences/${userId}`);
    const savedGenres = await savedPrefsRes.json();

    createGenreCheckboxes(genreData.genres, savedGenres);
  } catch (err) {
    console.error("Error loading genres or preferences:", err);
  }
}

// צור צ'קבוקסים + פיצול ל-3 עמודות
function createGenreCheckboxes(genres, savedGenres = []) {
  const container = document.getElementById("genre-checkboxes");
  container.innerHTML = "";

  const chunkSize = Math.ceil(genres.length / 3);
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("div");
    row.classList.add("genre-column");

    const chunk = genres.slice(i * chunkSize, (i + 1) * chunkSize);
    chunk.forEach(genre => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.marginBottom = "6px";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "genre";
      checkbox.value = genre.id;

      if (savedGenres.includes(genre.id)) {
        checkbox.checked = true;
      }

      label.appendChild(checkbox);
      label.append(" " + genre.name);
      row.appendChild(label);
    });

    container.appendChild(row);
  }
}

// שלח העדפות לשרת
document.getElementById("genre-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const selectedGenres = Array.from(
    document.querySelectorAll('input[name="genre"]:checked')
  ).map(el => Number(el.value));

  try {
    const res = await fetch(`http://localhost:3000/preferences/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ genres: selectedGenres })
    });

    const data = await res.json();
    alert(data.message || "Preferences saved successfully!");
  } catch (err) {
    console.error("Error saving preferences:", err);
    alert("Error saving preferences");
  }
});

// טען בהתחלה
window.addEventListener("DOMContentLoaded", loadGenresAndPreferences);
