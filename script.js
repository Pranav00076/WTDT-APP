let genre_display = document.getElementById("genre_display")
let movies_display = document.getElementById("movies_display")

const apiKey = "36aae90582723ed9c3894e15dddbb1ab";
const genreurl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;


function renderMovies(data = []) {
    data.forEach((movie, idx) => {
        let movieCard = document.createElement("div")
        movieCard.className = "MovieCard"

        let srNo = document.createElement("div")
        srNo.id = idx
        srNo.innerHTML = `<h2>${idx + 1}</h2>`
        movieCard.appendChild(srNo)

        let Poster = document.createElement("div")
        Poster.className = "Image"
        Poster.innerHTML = `<img src=https://image.tmdb.org/t/p/w500${movie.poster_path} alt=${movie.title} />`
        movieCard.appendChild(Poster)
        
        let rating = document.createElement("div")
        rating.className = "rating"
        rating.innerHTML = `<p id="rate">Rating - ${movie.vote_average} (${movie.vote_count})</p>`
        movieCard.appendChild(rating)

        let title = document.createElement("h2")
        title.id = "title"
        title.innerText = movie.title
        movieCard.appendChild(title)

        let releaseDate = document.createElement("p")
        releaseDate.id = "releaseDate"
        releaseDate.innerText = movie.release_date
        movieCard.append(releaseDate)

        movies_display.appendChild(movieCard)
    })
}

function renderGenre(data = []){
    
    let genreList = document.createElement("div")
    data.forEach(genre => {
        let genreCard = document.createElement("button")
        genreCard.innerText = genre.name
        genreCard.setAttribute('value' , genre.id)
        genreCard.setAttribute('class' , "genre-class")

        genreCard.addEventListener("click" , (e) => {
            let genreId = e.target.value
            const moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
            fetch(moviesUrl)
            .then(data => data.json())
            .then(data => data.results)
            .then(data => {
                movies_display.innerHTML = "";
                renderMovies(data)
            })
        })

        genreList.appendChild(genreCard)
    })
    genre_display.appendChild(genreList)
}



fetch(genreurl)
.then(x=>x.json())
.then(data=>data.genres)
.then(data=>{
    renderGenre(data)
})

document.querySelectorAll('.my-button-class').forEach(btn => {
  btn.addEventListener('click', function() {
    // Logs the value attribute of the clicked button
    console.log(this.value); 
    
    // Alternatively, logs the text content inside the button
    // console.log(this.innerText);
  });
});   