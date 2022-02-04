import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.setUser = this.setUser.bind(this);

    this.state = {
      disabled: true,
      userName: '',
      loadingOn: false,
      redirect: false,
    };
  }

  // ref.: https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component

  componentWillUnmount() {
    this.setState = () => {};
  }

  onInputChange({ target }) {
    const minimumInput = 3;

    if (target.value.length >= minimumInput) {
      this.setState({
        disabled: false,
        userName: target.value,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  async setUser() {
    const { userName } = this.state;

    this.setState(() => ({
      loadingOn: true,
    }));

    await createUser({ name: userName });

    this.setState({
      loadingOn: false,
      redirect: true,
    });
  }

  render() {
    const { disabled, loadingOn, redirect } = this.state;

    return (
      <div data-testid="page-login">
        <form>
          <input
            type="input"
            data-testid="login-name-input"
            onChange={ this.onInputChange }
          />
          <button
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.setUser }
            type="button"
          >
            Entrar
          </button>
          {loadingOn === true && <Loading /> }
        </form>
        {redirect === true && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
