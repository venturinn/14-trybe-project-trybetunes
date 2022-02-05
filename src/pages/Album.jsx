import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.setFavorite = this.setFavorite.bind(this);

    this.state = {
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      musics: [],
      loading: true,
      favoriteValues: [],
    };
  }

  componentDidMount() {
    this.getMusicsAPI();
  }

  getMusicsAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsAPI = await getMusics(id);

    // Monta um array de booleanos com tamanho igual à quantidade de faixa de músicas. Array controlará as faixas favoritadas.
    const mountFavoriteValues = [];
    for (let index = 0; index < musicsAPI.length - 1; index += 1) {
      mountFavoriteValues.push(false);
    }

    this.setState({
      artistName: musicsAPI[0].artistName,
      collectionName: musicsAPI[0].collectionName,
      artworkUrl100: musicsAPI[0].artworkUrl100,
      musics: musicsAPI.slice(1),
      loading: false,
      favoriteValues: mountFavoriteValues,
    });
  }

  async setFavorite({ target }) {
    const { name } = target;
    const value = target.checked;
    const { musics, favoriteValues } = this.state;
    const trackIndex = target.id;

    const trackId = parseInt(name, 10);
    const trackFavorite = musics.find((music) => music.trackId === trackId);

    const favoriteValuesArray = favoriteValues;
    favoriteValuesArray.splice(trackIndex, 1, value);

    this.setState({
      loading: true,
      favoriteValues: favoriteValuesArray,
    });

    await addSong(trackFavorite);

    this.setState({
      loading: false,
    });
  }

  render() {
    const { artistName,
      collectionName,
      artworkUrl100,
      musics,
      loading,
      favoriteValues } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {loading
          ? (<Loading />) : (
            <div>
              <section>
                <p data-testid="artist-name">{artistName}</p>
                <p data-testid="album-name">{collectionName}</p>
                <img src={ artworkUrl100 } alt={ collectionName } />
              </section>
              {musics.map((music, index) => (
                <div key={ music.trackId }>
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    setFavorite={ this.setFavorite }
                    value={ favoriteValues[index] }
                    index={ index }
                  />
                </div>
              ))}
            </div>) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

Album.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: '',
    }),
  }),
};

export default Album;
