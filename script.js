const API_KEY = "a5d3b8253e88b3e7ef24f2ba95c4cc2b";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a5d3b8253e88b3e7ef24f2ba95c4cc2b";

const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=a5d3b8253e88b3e7ef24f2ba95c4cc2b&query=";

//this is the base url, https://developers.themoviedb.org/3/getting-started/images
const IMGPATH = "http://image.tmdb.org/t/p/w185";

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.getElementById("search");

//get initial movies
GetMovies(API_URL);

async function GetMovies(url) {
  const response = await fetch(url);
  const responseData = await response.json();

  ShowMovies(responseData.results);

  return responseData;
}

function ShowMovies(moviedata) {
  main.innerHTML = "";
  for (let i = 0; i < moviedata.length; i++) {
    //if poster doesn't exist dont create it
    if (moviedata[i].poster_path) {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");

      console.log(moviedata[i]);

      movieEl.innerHTML = `
            <img
              src="http://image.tmdb.org/t/p/w1280/${moviedata[i].poster_path}"
              alt=""
            />
            <div class="movie-info">
              <h3>${moviedata[i].original_title}</h3>
              <span class="${CheckRating(moviedata[i].vote_average)}">${
        moviedata[i].vote_average
      }</span>
            </div>
            <div class="overview">${moviedata[i].overview}</div>
            `;

      main.appendChild(movieEl);
    }
  }
}

function CheckRating(rating) {
  //   console.log(rating);
  if (rating >= 8.0) {
    return "green";
  } else if (rating >= 5.0) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchInput = search.value;

  if (searchInput) {
    GetMovies(API_SEARCH + searchInput);
  }
});
