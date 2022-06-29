import React from 'react';
import PropTypes from 'prop-types';

// const TO_MULTIPLE = 3;

class MultipleChoices extends React.Component {
  state = {
    answers: [],
  }

  componentDidMount() {
    this.generateRandomArratWithAnswers();
  }

  // A função de randomizar o Array foi retirada do link abaixo;

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

  generateRandomArratWithAnswers = () => {
    const { correctAnswer, incorrectAnswers, type } = this.props;
    const newArray = [correctAnswer, ...incorrectAnswers];
    if (type === 'multiple') {
      this.setState({ answers: this.shuffleArray(newArray) });
    } else {
      this.setState({ answers: this.shuffleArray(newArray) });
    }
  }

  render() {
    const { question, category, correctAnswer, incorrectAnswers } = this.props;
    const { answers } = this.state;
    console.log(correctAnswer);
    console.log(incorrectAnswers);
    return (
      <div>
        <h1 data-testid="question-text">{ question }</h1>
        <p data-testid="question-category">{category}</p>
        {answers.map((answer) => <p key={ answer }>{answer}</p>)}
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
