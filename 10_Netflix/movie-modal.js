class MovieModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.8);
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal {
                    background-color: #141414;
                    color: white;
                    padding: 20px;
                    border-radius: 5px;
                    max-width: 800px;
                    width: 90%;
                    display: flex;
                    gap: 20px;
                }
                .poster {
                    flex: 0 0 300px;
                }
                .poster img {
                    width: 100%;
                    height: auto;
                    border-radius: 5px;
                }
                .content {
                    flex: 1;
                }
                h2 {
                    margin-top: 0;
                }
                button {
                    background-color: #e50914;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    cursor: pointer;
                    margin-top: 10px;
                }
            </style>
            <div class="modal">
                <div class="poster">
                    <img src="" alt="Movie Poster">
                </div>
                <div class="content">
                    <h2></h2>
                    <p class="year-rating"></p>
                    <p class="description"></p>
                    <button>Close</button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            this.close();
        });
    }

    close() {
        this.style.display = 'none';
    }

    open(movieData) {
        const { title, year, rating, description, poster } = movieData;
        const modal = this.shadowRoot.querySelector('.modal');
        modal.querySelector('img').src = poster;
        modal.querySelector('img').alt = `${title} Poster`;
        modal.querySelector('h2').textContent = title;
        modal.querySelector('.year-rating').textContent = `${year} | Rating: ${rating}`;
        modal.querySelector('.description').textContent = description;
        this.style.display = 'flex';
    }
}

customElements.define('movie-modal', MovieModal);