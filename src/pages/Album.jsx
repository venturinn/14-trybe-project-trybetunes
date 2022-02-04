import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      musics: [],
    };
  }

  async componentDidMount() {
    this.getMusicsAPI();
  }

  getMusicsAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsAPI = await getMusics(id);

    const collectionInfo = musicsAPI.shift();

    this.setState({
      artistName: collectionInfo.artistName,
      collectionName: collectionInfo.collectionName,
      artworkUrl100: collectionInfo.artworkUrl100,
      musics: musicsAPI,
    });
  }

  render() {
    const { artistName, collectionName, artworkUrl100, musics } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {musics.length === 0
          ? (<Loading />) : (
            <div>
              <p data-testid="artist-name">{artistName}</p>
              <p data-testid="album-name">{collectionName}</p>
              <img src={ artworkUrl100 } alt={ collectionName } />
              {musics.map((music) => (
                <div key={ music.trackId }>
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
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
