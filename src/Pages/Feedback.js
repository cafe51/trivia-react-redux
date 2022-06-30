import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
});

Feedback.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  player: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
