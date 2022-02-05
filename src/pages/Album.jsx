import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.setFavorite = this.setFavorite.bind(this);
    this.getFavorite = this.getFavorite.bind(this);

    this.state = {
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      musics: [],
      loading: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getMusicsAPI();
    this.getFavorite();
  }

  getMusicsAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsAPI = await getMusics(id);

    this.setState({
      artistName: musicsAPI[0].artistName,
      collectionName: musicsAPI[0].collectionName,
      artworkUrl100: musicsAPI[0].artworkUrl100,
      musics: musicsAPI.slice(1),
      loading: false,
    });
  }

  getFavorite = async () => {
    this.setState({ loading: true });
    const favoriteSongsAPI = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs: favoriteSongsAPI });
  }

  async setFavorite({ target }) {
    const { name } = target;
    const value = target.checked;
    const { musics } = this.state;
    let favoriteSongsAPI = [];

    const trackId = parseInt(name, 10);
    const trackFavorite = musics.find((music) => music.trackId === trackId);

    this.setState({
      loading: true,
    });

    if (value === true) {
      await addSong(trackFavorite);
      favoriteSongsAPI = await getFavoriteSongs();
    } else {
      await removeSong(trackFavorite);
      favoriteSongsAPI = await getFavoriteSongs();
    }
    this.setState({
      loading: false,
      favoriteSongs: favoriteSongsAPI,
    });
  }

  render() {
    const { artistName,
      collectionName,
      artworkUrl100,
      musics,
      loading,
      favoriteSongs } = this.state;

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
              {musics.map((music) => (
                <div key={ music.trackId }>
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    setFavorite={ this.setFavorite }
                    value={ favoriteSongs.some((song) => song.trackId === music.trackId) }
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
