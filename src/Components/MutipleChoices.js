import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { rightAnswer, nextQuestion, sendArrayAnswers } from '../Redux/actions';

// const TO_MULTIPLE = 3;
const ONE_SECOND = 1000;
const ONE = 1000;
const DEZ = 10;
const FOUR = 4;

class MultipleChoices extends React.Component {
  state = {
    answered: false,
    timer: 30,
  }

  componentDidMount = () => {
    // this.generateRandomArratWithAnswers();
    this.timerId = setInterval(() => {
      this.setState((oldState) => {
        console.log('oi');
        return { timer: oldState.timer - 1 };
      });
    }, ONE_SECOND);
    const { correctAnswer, incorrectAnswers, dispatch } = this.props;
    const newArray = [correctAnswer, ...incorrectAnswers];
    dispatch(sendArrayAnswers(newArray));
  }

  timerFunction = () => {
    this.timerId = setInterval(() => {
      this.setState((initialState) => ({ timer: initialState.timer - 1 }));
    }, ONE);
  }

  componentDidUpdate = () => {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.timerId);
    }
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
    clearInterval(this.timerId);
    this.setState({
      answered: true,
    });
    const { dispatch, difficulty } = this.props;
    const { timer } = this.state;
    const difficultyPoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    dispatch(rightAnswer(DEZ + (difficultyPoints[difficulty] * timer)));
  }

  wrongAnswerClick = () => {
    clearInterval(this.timerId);
    this.setState({
      answered: true,
    });
  }

  generateRandomArratWithAnswers = (array) => {
    const { dispatch, history, questionX } = this.props;
    console.log(this.props);
    if (questionX === FOUR) {
      history.push('/feedback');
      console.log('five');
    } else {
      this.shuffleArray(array);
      // console.log(array);
      dispatch(sendArrayAnswers(array));
    }
  }

  render() {
    const { question, category, correctAnswer, dispatch,
      incorrectAnswers } = this.props;
    const newArray = [correctAnswer, ...incorrectAnswers];
    console.log('teste', newArray);

    const { timer, answered } = this.state;
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <h1 data-testid="question-text">{ question }</h1>
        <div data-testid="answer-options">
          {
            this.shuffleArray(newArray).map((answer, index) => {
              // console.log(correctAnswer);
              if (answer === correctAnswer) {
                return (
                  <button
                    onClick={ this.correctAnswerClick }
                    className={ answered ? 'green' : 'x' }
                    type="button"
                    data-testid="correct-answer"
                    key={ answer }
                    disabled={ timer === 0 }
                  >
                    {answer}
                  </button>);
              }
              return (
                <button
                  onClick={ this.wrongAnswerClick }
                  className={ answered ? 'red' : 'x' }
                  type="button"
                  data-testid={ `wrong-answer-${index - 1}` }
                  key={ answer }
                  disabled={ timer === 0 }
                >
                  {answer}
                </button>);
            })
          }
        </div>
        <p>{timer}</p>
        {answered
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              this.timerFunction();
              dispatch(nextQuestion());
              console.log(newArray, question);
              this.generateRandomArratWithAnswers(newArray);
              this.setState({
                answered: false,
                timer: 30,
              });
            } }
          >
            Next
          </button>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  answers: state.player.answers,
  questionX: state.player.question,
});

MultipleChoices.propTypes = {
  type: PropTypes.string,
  question: PropTypes.string,
  category: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(MultipleChoices);
