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
    };
  }

  componentDidMount() {
    this.getMusicsAPI();
  }

  getMusicsAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsAPI = await getMusics(id);

    console.log(musicsAPI);

    // const collectionInfo = musicsAPI.shift();

    this.setState({
      artistName: musicsAPI[0].artistName,
      collectionName: musicsAPI[0].collectionName,
      artworkUrl100: musicsAPI[0].artworkUrl100,
      musics: musicsAPI.slice(1),
      loading: false,
    });
  }

  async setFavorite(target) {
    const { name } = target;
    const value = target.checkek;

    this.setState({
      loading: true,
    });

    await addSong();

    this.setState({
      loading: false,
    });
  }

  render() {
    const { artistName, collectionName, artworkUrl100, musics, loading } = this.state;

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
