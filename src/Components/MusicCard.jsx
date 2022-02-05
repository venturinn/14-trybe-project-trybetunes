import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, setFavorite, value, index } = this.props;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            name={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            onChange={ setFavorite }
            checked={ value }
            id={ index }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  setFavorite: PropTypes.func.isRequired,
  value: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

MusicCard.defaultProps = {
  value: false,
};

export default MusicCard;
