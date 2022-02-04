import React, { Component } from 'react';
import Header from '../Components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        Album
        <Header />
      </div>
    );
  }
}

export default Album;
