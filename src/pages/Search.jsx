import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
    this.makeCollectionList = this.makeCollectionList.bind(this);

    this.state = {
      disabled: true,
      artist: '',
      artistSearch: '',
      loading: false,
      artistsResult: [],
      resultAPIReady: false,
    };
  }

  onInputChange({ target }) {
    const minimumInput = 2;

    if (target.value.length >= minimumInput) {
      this.setState({
        disabled: false,
        artist: target.value,
        artistSearch: target.value,
      });
    } else {
      this.setState({
        disabled: true,
        artist: target.value,
        artistSearch: target.value,
      });
    }
  }

  async searchArtist() {
    const { artistSearch } = this.state;

    this.setState({
      disabled: true,
      artist: '',
      loading: true,
    });

    const searchResultAPI = await searchAlbumsAPI(artistSearch);

    this.setState({
      loading: false,
      artistsResult: searchResultAPI,
      resultAPIReady: true,
    });
  }

  makeCollectionList() {
    const { artistsResult, artistSearch } = this.state;

    if (artistsResult.length !== 0) {
      return (
        <div>
          <p>
            Resultado de álbuns de:
            {' '}
            {artistSearch}
          </p>
          <div className="albuns-container">
            {artistsResult.map((artistResult) => (
              <div className="album-container" key={ artistResult.collectionId }>
                <Link
                  data-testid={ `link-to-album-${artistResult.collectionId}` }
                  to={ `/album/${artistResult.collectionId}` }
                >
                  <img
                    src={ artistResult.artworkUrl100 }
                    alt={ artistResult.artistName }
                  />
                  <p>{artistResult.collectionName}</p>
                  <p>{artistResult.artistName}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (<p>Nenhum álbum foi encontrado</p>);
  }

  render() {
    const { disabled, artist, loading, resultAPIReady } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading === true ? (<Loading />)
          : (
            <form>
              <input
                data-testid="search-artist-input"
                type="text"
                onChange={ this.onInputChange }
                value={ artist }
                className="search-input"
              />
              <button
                disabled={ disabled }
                type="button"
                data-testid="search-artist-button"
                onClick={ this.searchArtist }
                className="search-button"
              >
                Pesquisar

              </button>
            </form>
          )}
        {resultAPIReady === true && this.makeCollectionList()}
      </div>
    );
  }
}

export default Search;
