import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.getUser = this.searchUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);

    this.state = {
      loading: true,
      userName: '',
      email: '',
      description: '',
      image: '',
      isSaveButtonDisabled: true,
      redirect: false,
    };
  }

  componentDidMount() {
    this.searchUser();
  }

  handleChange({ target }) {
    const { userName, email, description, image } = this.state;
    const { name, value } = target;

    // Resolver problema assíncrono
    this.setState(() => ({
      [name]: value,
    }));

    if (userName !== '' && email !== '' && description !== '' && image !== '') {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  async onSaveButtonClick() {
    const { userName, email, description, image } = this.state;

    const verifyEmail = -1;

    if (email.search('@') === verifyEmail) {
      return alert('E-mail Invalido');
    }

    const userData = {
      name: userName,
      email,
      description,
      image,
    };

    this.setState({ loading: true });
    await updateUser(userData);

    window.location.href = '/profile';

    this.setState({ redirect: true });
  }

  async searchUser() {
    const userAPI = await getUser();
    this.setState({
      loading: false,
      userName: userAPI.name,
      email: userAPI.email,
      description: userAPI.description,
      image: userAPI.image,
    });
  }

  render() {
    const { loading,
      userName,
      email,
      description,
      image,
      isSaveButtonDisabled,
      redirect } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        { redirect && <Redirect to="/profile" />}
        { loading ? (<Loading />) : (
          <form>
            <label htmlFor="userName">
              <input
                id="userName"
                name="userName"
                data-testid="edit-input-name"
                type="text"
                placeholder="Nome"
                value={ userName }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              <input
                id="email"
                name="email"
                data-testid="edit-input-email"
                type="email"
                placeholder="E-mail"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <input
              name="description"
              data-testid="edit-input-description"
              type="textarea"
              placeholder="Descrição"
              value={ description }
              onChange={ this.handleChange }
            />
            <input
              name="image"
              data-testid="edit-input-image"
              type="text"
              placeholder="URL da imagem"
              value={ image }
              onChange={ this.handleChange }
            />
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ isSaveButtonDisabled }
              onClick={ this.onSaveButtonClick }
            >
              Salvar
            </button>

          </form>)}
      </div>
    );
  }
}

export default ProfileEdit;
