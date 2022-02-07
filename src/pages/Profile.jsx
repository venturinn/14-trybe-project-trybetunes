import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Profile extends Component {
  constructor() {
    super();
    this.getUser = this.searchUser.bind(this);

    this.state = {
      loading: true,
      user: {},
    };
  }

  componentDidMount() {
    this.searchUser();
  }

  async searchUser() {
    const userAPI = await getUser();
    this.setState({ loading: false, user: userAPI });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? (<Loading />) : (
          <div className="profile">
            <img
              className="user-image"
              data-testid="profile-image"
              src={ user.image }
              alt={ user.name }
            />
            <p>Usuário: </p>
            <p>{user.name}</p>
            <p>E-mail: </p>
            <p>{user.email}</p>
            <p>Descrição: </p>
            <p>{user.description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>)}

      </div>
    );
  }
}

export default Profile;
