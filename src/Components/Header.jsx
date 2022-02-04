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
          : (<span data-testid="header-user-name">{user.name}</span>)}
        <br />
        <Link data-testid="link-to-search" to="/search"> Pesquisar </Link>
        <br />
        <Link data-testid="link-to-favorites" to="/favorites"> Favoritos </Link>
        <br />
        <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
      </header>
    );
  }
}

export default Header;
