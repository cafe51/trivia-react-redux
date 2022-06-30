import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  state = {
    sortedRank: [],
  }

  componentDidMount = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);
    this.setState({ sortedRank: ranking });
  }

  render() {
    const { sortedRank } = this.state;
    return (
      <div>
        <p data-testid="ranking-title">Ranking</p>
        <section>
          {sortedRank.length > 0 && (
            sortedRank.map(({ name, score, picture }, index) => (
              <div key={ picture }>
                <img src={ picture } alt={ `Foto de ${name}` } />
                <p data-testid={ `player-name-${index}` }>{name}</p>
                <p data-testid={ `player-score-${index}` }>{score}</p>
              </div>
            ))
          )}
        </section>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Tela Inicial</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
