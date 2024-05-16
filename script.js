const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&api_key=6e2c23f73f331e740e2891db063a9a9d&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=6e2c23f73f331e740e2891db063a9a9d&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

function fetchMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            data.results.forEach(movie => {
                const divCard = document.createElement("div");
                divCard.setAttribute("class", "card");

                const image = document.createElement("img");
                image.setAttribute("class", "thumbnail");
                image.src = IMG_PATH + movie.poster_path;

                const title = document.createElement("h3");
                title.textContent = movie.title;

                const center = document.createElement("center");
                center.appendChild(image);

                divCard.appendChild(center);
                divCard.appendChild(title);

                const divRow = document.createElement("div");
                divRow.setAttribute("class", "row");
                const divColumn = document.createElement("div");
                divColumn.setAttribute("class", "column");
                divColumn.appendChild(divCard);

                divRow.appendChild(divColumn);
                main.appendChild(divRow);
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}

// Fetch latest movies when the page loads
window.addEventListener('load', () => {
    fetchMovies(APILINK);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value.trim();

    if (searchItem) {
        fetchMovies(SEARCHAPI + searchItem);
        search.value = "";
    } else {
        // If search input is empty, fetch latest movies again
        fetchMovies(APILINK);
    }
});

function fetchMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            data.results.forEach(movie => {
                // Check if movie has a poster path
                if (movie.poster_path) {
                    const divCard = document.createElement("div");
                    divCard.setAttribute("class", "card");

                    const image = document.createElement("img");
                    image.setAttribute("class", "thumbnail");
                    image.src = IMG_PATH + movie.poster_path;

                    const title = document.createElement("h3");
                    title.textContent = movie.title;

                    const center = document.createElement("center");
                    center.appendChild(image);

                    divCard.appendChild(center);
                    divCard.appendChild(title);

                    const divRow = document.createElement("div");
                    divRow.setAttribute("class", "row");
                    const divColumn = document.createElement("div");
                    divColumn.setAttribute("class", "column");
                    divColumn.appendChild(divCard);

                    divRow.appendChild(divColumn);
                    main.appendChild(divRow);
                }
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}
