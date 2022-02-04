import React, { Component } from 'react';
import Header from '../Components/Header';

class Search extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      disabled: true,
    };
  }

  onInputChange({ target }) {
    const minimumInput = 2;

    if (target.value.length >= minimumInput) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            type="text"
            onChange={ this.onInputChange }
          />
          <button
            disabled={ disabled }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
