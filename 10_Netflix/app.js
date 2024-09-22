const movieData = [
    {
        title: "Inception",
        year: "2010",
        poster: "images/Inception.jpg",
        backgroundPoster: "images/Inception-poster.jpeg",
        rating: "8.8",
        description: "A thief who enters the dreams of others to steal secrets from their subconscious."
    },
    {
        title: "The Shawshank Redemption",
        year: "1994",
        poster: "images/The-Shawshank-Redemption-poster-300x450.jpg",
        backgroundPoster: "images/The_Shawshank_Redemption-poster.jpg",
        rating: "9.3",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
        title: "The Dark Knight",
        year: "2008",
        poster: "images/theDarkKnight.jpg",
        backgroundPoster: "images/the-dark-knight_1280x720.jpg",
        rating: "9.0",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
        title: "Pulp Fiction",
        year: "1994",
        poster: "images/pulp_fiction-small.jpg",
        backgroundPoster: "images/Pulp_Fiction.jpg",
        rating: "8.9",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
        title: "Forrest Gump",
        year: "1994",
        poster: "images/Forrest-Gump-poster-300x450.jpeg",
        backgroundPoster: "images/Forrest Gump-poster.jpg",
        rating: "8.8",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75."
    },
    {
        title: "The Matrix",
        year: "1999",
        poster: "images/matrix_300x450.jpg",
        backgroundPoster: "images/matrix-movie_1280x720.jpg",
        rating: "8.7",
        description: "A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity."
    },
    {
        title: "Goodfellas",
        year: "1990",
        poster: "images/Goodfellas.jpg",
        backgroundPoster: "images/Goodfellas_poster.jpg",
        rating: "8.7",
        description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito."
    },
    {
        title: "The Silence of the Lambs",
        year: "1991",
        poster: "images/thesilenceof.jpg",
        backgroundPoster: "images/The_Silence_of_the_Lambs-poster.jpg",
        rating: "8.6",
        description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer."
    },
    {
        title: "Schindler's List",
        year: "1993",
        poster: "images/schindlers-list-1993-2jh12t4.jpg",
        backgroundPoster: "images/schindlers-list-banner-01.jpg",
        rating: "8.9",
        description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis."
    },
    {
        title: "The Lord of the Rings: The Return of the King",
        year: "2003",
        poster: "images/lord.jpeg",
        backgroundPoster: "images/lordofring.jpg",
        rating: "8.9",
        description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring."
    },


    {
        title: "Inception",
        year: "2010",
        poster: "images/bahubali.jpg",
        backgroundPoster: "https://via.placeholder.com/1280x720?text=Inception+Background",
        rating: "8.8",
        description: "A thief who enters the dreams of others to steal secrets from their subconscious."
    },
    {
        title: "The Shawshank Redemption",
        year: "1994",
        poster: "images/dangal.jpg",
        backgroundPoster: "https://via.placeholder.com/1280x720?text=Shawshank+Redemption+Background",
        rating: "9.3",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
        title: "The Dark Knight",
        year: "2008",
        poster: "images/jawan.jpeg",
        backgroundPoster: "https://via.placeholder.com/1280x720?text=The+Dark+Knight+Background",
        rating: "9.0",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
        title: "Pulp Fiction",
        year: "1994",
        poster: "images/KALKI.jpg",
        backgroundPoster: "https://via.placeholder.com/1280x720?text=Pulp+Fiction+Background",
        rating: "8.9",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
        title: "Forrest Gump",
        year: "1994",
        poster: "images/kfg2.jpg",
        backgroundPoster: "https://via.placeholder.com/1280x720?text=Forrest+Gump+Background",
        rating: "8.8",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75."
    },
    {
        title: "The Matrix",
        year: "1999",
        poster: "images/RRR-4.jpg",
        backgroundPoster: "https://via.placeholder.com/1280x720?text=The+Matrix+Background",
        rating: "8.7",
        description: "A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity."
    },
    {
        title: "Goodfellas",
        year: "1990",
        poster: "images/2567.thumb.jpg.3e301820915063abe109747d528d8c43.jpg",
        backgroundPoster: "https://via.placeholder.com/1280x720?text=Goodfellas+Background",
        rating: "8.7",
        description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito."
    },
    {
        title: "The Silence of the Lambs",
        year: "1991",
        poster: "images/6585.jpg",
        backgroundPoster: "https://via.placeholder.com/1280x720?text=Silence+of+the+Lambs+Background",
        rating: "8.6",
        description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer."
    },
    {
        title: "Schindler's List",
        year: "1993",
        poster: "images/zwzWCmH72OSC9NA0ipoqw5Zjya8.jpg",
        backgroundPoster: "https://via.placeholder.com/1280x720?text=Schindler's+List+Background",
        rating: "8.9",
        description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis."
    },
    {
        title: "The Lord of the Rings: The Return of the King",
        year: "2003",
        poster: "images/godfather.jpg",
        backgroundPoster: "https://via.placeholder.com/1280x720?text=LOTR:+Return+of+the+King+Background",
        rating: "8.9",
        description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring."
    },
];

function updateFeaturedContent(movie) {
    const featuredContent = document.getElementById('featured-content');
    featuredContent.style.backgroundImage = `url(${movie.backgroundPoster})`;
    const featuredInfo = document.querySelector('.featured-info');
    featuredInfo.querySelector('h2').textContent = movie.title;
    featuredInfo.querySelector('.year-rating').textContent = `${movie.year} | Rating: ${movie.rating}`;
}

function createMovieCard(movie) {
    const card = document.createElement('movie-card');
    card.dataset.title = movie.title;
    card.dataset.year = movie.year;
    card.dataset.poster = movie.poster;
    card.dataset.rating = movie.rating;
    card.dataset.description = movie.description;
    card.dataset.backgroundPoster = movie.backgroundPoster;
    return card;
}

function populateMovies() {
    const containers = document.querySelector('.movie-row');
    movieData.forEach((movie) => {
        const card = createMovieCard(movie);
        containers.appendChild(card);
    });
    if (movieData.length) {
        updateFeaturedContent(movieData[0])
    }
}

document.addEventListener("DOMContentLoaded", function () {
    populateMovies();

    const modal = document.querySelector('movie-modal');

    document.addEventListener('movie-selected', (event) => {
        updateFeaturedContent(event.detail);
    })

    document.getElementById('detail-button').addEventListener('click', (event) => {
        const featuredMovie = movieData.find(movie => 
            movie.title === document.querySelector('#featured-content h2').textContent
        );
        modal.open(featuredMovie);
    });
})