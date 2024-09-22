class MovieCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback() {
        this.render();
    }

    render() {
        const { title, year, poster, rating } = this.dataset;
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 200px;
                    transition: transform 0.3s;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                :host(:hover) {
                    transform: scale(1.05);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.3);
                }
                img {
                    width: 100%;
                    height: auto;
                }
                .info {
                    padding: 10px;
                    background-color: rgba(0,0,0,0.7);
                    color: white;
                }
                h3 {
                    margin: 0;
                    font-size: 1rem;
                }
                p {
                    margin: 5px 0 0;
                    font-size: 0.8rem;
                }
            </style>
            <div>
                <img src="${poster}" alt="${title}">
                <div class="info">
                    <h3>${title}</h3>
                    <p>${year} | Rating: ${rating}</p>
                </div>
            </div>
        `;
        this.shadowRoot.querySelector('div').addEventListener('click', this.handleClick.bind(this));
    }

    handleClick() {
        const event = new CustomEvent('movie-selected', {
            bubbles: true,
            detail: {
                title: this.dataset.title,
                year: this.dataset.year,
                poster: this.dataset.poster,
                rating: this.dataset.rating,
                description: this.dataset.description,
                backgroundPoster: this.dataset.backgroundPoster
            }
        });
        this.dispatchEvent(event);
    }

}

customElements.define('movie-card', MovieCard);

{/* <movie-card></movie-card> */}