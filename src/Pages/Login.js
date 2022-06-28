import React from 'react';
import PropTypes from 'prop-types';
import logo from '../trivia.png';

const MINIMUN_LENTGH = 3;

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  }

  checkInputs = () => {
    const { name, email } = this.state;
    if (name.length >= MINIMUN_LENTGH && email.length >= MINIMUN_LENTGH
       && email.includes('@')) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  onInputChange = ({ target }) => this.setState({ [target.name]: target.value },
    this.checkInputs);

  startGame = async () => {
    const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
    const { token } = await tokenResponse.json();
    localStorage.setItem('token', token);
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { name, email, isDisabled } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="input-player-name">
            Nome:
            <input
              value={ name }
              name="name"
              id="input-player-name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="input-player-email">
            Email:
            <input
              value={ email }
              name="email"
              id="input-player-email"
              type="text"
              data-testid="input-gravatar-email"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.startGame }
          >
            Play
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Login;
