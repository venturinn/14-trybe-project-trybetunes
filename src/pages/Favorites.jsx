import React, { Component } from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.getFavorite = this.getFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);

    this.state = {
      loading: true,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = async () => {
    this.setState({ loading: true });
    const favoriteSongsAPI = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs: favoriteSongsAPI });
  }

  async removeFavorite({ target }) {
    const { name } = target;
    const { favoriteSongs } = this.state;
    let favoriteSongsAPI = [];

    const trackId = parseInt(name, 10);
    const trackFavorite = favoriteSongs.find((music) => music.trackId === trackId);

    this.setState({ loading: true });

    await removeSong(trackFavorite);
    favoriteSongsAPI = await getFavoriteSongs();

    this.setState({
      loading: false,
      favoriteSongs: favoriteSongsAPI,
    });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    const value = true; // todas as músicas serão renderizadas com o checkbox marcado
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Músicas favoritas:</p>
        { loading ? (<Loading />) : (
          <div className="favorite">
            { favoriteSongs.map((song) => (
              <div key={ song.trackId }>
                <MusicCard
                  trackName={ song.trackName }
                  previewUrl={ song.previewUrl }
                  trackId={ song.trackId }
                  setFavorite={ this.removeFavorite }
                  value={ value }
                />
              </div>))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
