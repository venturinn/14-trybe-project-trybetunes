import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
    };
  }

  async componentDidMount() {
    this.setState({
      user: await getUser(),
    });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        {user === ''
          ? (<Loading />)
          : (<p className="name" data-testid="header-user-name">{user.name}</p>)}
        <br />
        <div className="links-container">
          <Link
            className="link"
            data-testid="link-to-search"
            to="/search"
          >
            {' '}
            Pesquisar
            {' '}

          </Link>
          <Link
            className="link"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            {' '}
            Favoritos
            {' '}

          </Link>
          <Link
            className="link"
            data-testid="link-to-profile"
            to="/profile"
          >
            {' '}
            Perfil
            {' '}

          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
