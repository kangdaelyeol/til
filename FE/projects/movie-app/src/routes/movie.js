import { Component } from '../core/core'
import movieStore, { getMovieDetails } from '../store/movie'

export default class Movie extends Component {
    async render() {
        await getMovieDetails(history.state.id)
        const {
            Poster,
            Title,
            Released,
            Runtime,
            Country,
            Plot,
            Ratings,
            Actors,
            Director,
            Production,
            Genre,
        } = movieStore.state.movieDetail

        this.el.classList.add('container', 'the-movie')
        this.el.innerHTML = /* html */ `
        <div style="background-image: url(${Poster})" class="poster"></div>
        <div class="specs">
          <div class="title">
            ${Title}
          </div>
          <div class="labels">
            <span>${Released}</span>
            &nbsp;/&nbsp;
            <span>${Runtime}</span>
            &nbsp;/&nbsp;
            <span>${Country}</span>
          </div>
          <div class="plot">
            ${Plot}
          </div>
          <div>
            <h3>Ratings</h3>
            ${Ratings.map(({ Source, Value }) => {
                return /* html */ `<p>${Source} - ${Value}</p>`
            }).join('')}
          </div>
          <div>
            <h3>Actors</h3>
            <p>${Actors}</p>
          </div>
          <div>
            <h3>Director</h3>
            <p>${Director}</p>
          </div>
          <div>
            <h3>Production</h3>
            <p>${Production}</p>
          </div>
          <div>
            <h3>Genre</h3>
            <p>${Genre}</p>
          </div>
        </div>
        `
    }
}
