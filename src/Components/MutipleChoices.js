import React from 'react';
import PropTypes from 'prop-types';

// const TO_MULTIPLE = 3;

class MultipleChoices extends React.Component {
  state = {
    answered: false,
  }

  // A função de randomizar o Array foi retirada do link abaixo ;

  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

  // Função para randomizar array
  shuffleArray= (arr) => {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  correctAnswerClick = () => {
    this.setState({
      answered: true,
    });
  }

  generateRandomArratWithAnswers = () => {
    const { answered } = this.state;
    const { correctAnswer, incorrectAnswers } = this.props;
    const newArray = [correctAnswer, ...incorrectAnswers];
    const respostas = newArray.map((answer, index) => {
      if (index === 0) {
        return (
          <button
            onClick={ this.correctAnswerClick }
            className={ answered ? 'green' : 'x' }
            type="button"
            data-testid="correct-answer"
            key={ answer }
          >
            {answer}
          </button>);
      }
      return (
        <button
          onClick={ this.correctAnswerClick }
          className={ answered ? 'red' : 'x' }
          type="button"
          data-testid={ `wrong-answer-${index - 1}` }
          key={ answer }
        >
          {answer}
        </button>);
    });
    return this.shuffleArray(respostas);
  }

  render() {
    const { question, category } = this.props;
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <h1 data-testid="question-text">{ question }</h1>
        <div data-testid="answer-options">{this.generateRandomArratWithAnswers()}</div>
      </div>
    );
  }
}

MultipleChoices.propTypes = {
  type: PropTypes.string,
  question: PropTypes.string,
  category: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default MultipleChoices;
