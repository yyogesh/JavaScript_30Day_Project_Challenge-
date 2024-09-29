const movies = [
    { id: 1, title: "Inception", image: "./images/inception.jpg" },
    { id: 2, title: "The Shawshank Redemption", image: "./images/The-Shawshank-Redemption-poster-300x450.jpg" },
    { id: 3, title: "The Dark Knight", image: "./images/theDarkKnight.jpg" },
    { id: 4, title: "Pulp Fiction", image: "./images/pulp_fiction-small.jpg" },
    { id: 5, title: "Forrest Gump", image: "./images/Forrest-Gump-poster-300x450.jpeg" }
];

const movieList = document.getElementById('movie-list');
const reviewSection = document.getElementById('review-section');
const selectedMovie = document.getElementById('selected-movie');
const reviewForm = document.getElementById('review-form');
const starRating = document.getElementById('star-rating');
const reviewList = document.getElementById('review-list');

let currentMovie = null;
let currentRating = 0;

movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `<img src="${movie.image}" alt="${movie.title}">`
    movieCard.addEventListener('click', () => selectMovie(movie));
    movieList.appendChild(movieCard);
})

function selectMovie(movie) {
    currentMovie = movie;
    selectedMovie.innerHTML = `<h3>${movie.title}</h3><img src="${movie.image}" alt="${movie.title}">`;
    reviewSection.classList.remove('hidden');
    reviewSection.scrollIntoView({ behavior: 'smooth' });
}

starRating.addEventListener('click', (event) => {
  if(event.target.classList.contains('star')) {
    const rating = parseInt(event.target.dataset.rating, 10);
    currentRating = rating;
    updateStartRating();
  }
});

function updateStartRating() {
   const stars = starRating.getElementsByClassName('star');
   for(let i = 0; i < stars.length; i++) {
    stars[i].classList.toggle('active', i < currentRating);
   }
}


reviewForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const reviewerName = document.getElementById('reviewer-name').value;
  const reviewText = document.getElementById('review-text').value;

  if(currentMovie && reviewerName && reviewText && currentRating > 0) { 
    addReview(currentMovie, reviewerName, reviewText, currentRating);
    reviewForm.reset();
    currentRating = 0;
    updateStartRating();
  }
});

function addReview(movie, reviewerName, reviewText, rating) {
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('review-card');
    reviewCard.innerHTML = `
        <h3>${movie.title}</h3>
        <p><strong>Reviewer:</strong> ${reviewerName}</p>
        <div class="rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
        <p>${reviewText}</p>
    `;
    reviewList.prepend(reviewCard);
}