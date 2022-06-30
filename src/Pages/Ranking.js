import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Tela Inicial</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
