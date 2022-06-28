import React from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, name } = this.props;
    return (
      <header>
        <p data-testid="header-player-name">{name}</p>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="Foto de perfil"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  name: globalState.user.name,
});

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
