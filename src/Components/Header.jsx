import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
