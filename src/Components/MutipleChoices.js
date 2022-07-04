import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { rightAnswer, nextQuestion } from '../Redux/actions';

// const TO_MULTIPLE = 3;
const ONE_SECOND = 1000;
const DEZ = 10;
const FOUR = 4;

class MultipleChoices extends React.Component {
  state = {
    answered: false,
    timer: 30,
    shuffledArray: [],
    renderQuestion: false,
  }

  componentDidMount = () => {
    this.wrongAnswerIndex = 0;
    this.startTimer();
    this.randomizeAnswersAndStartQuestion();
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState((initialState) => ({ timer: initialState.timer - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate = () => {
    this.wrongAnswerIndex = 0;
    const { timer, answered } = this.state;
    if (timer === 0 && !answered) {
      this.setState({ answered: true });
      clearInterval(this.timerId);
    }
  }

  // A função de randomizar o Array foi retirada do link abaixo ;
  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

  shuffleArray= (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
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

  randomizeAnswersAndStartQuestion = () => {
    const { correctAnswer, incorrectAnswers } = this.props;

    const newArray = [correctAnswer, ...incorrectAnswers];
    const shuffledArray = this.shuffleArray(newArray);
    this.setState({ shuffledArray, renderQuestion: false }, () => this.setState({
      renderQuestion: true,
      answered: false,
      timer: 30 }));
  }

  nextQuestion = async () => {
    const { questionX, history, dispatch, name, gravatarEmail, score } = this.props;
    // Veriica se passará para a tela de feedback
    if (questionX === FOUR) {
      let ranking = JSON.parse(localStorage.getItem('ranking'));
      if (!ranking) ranking = [];
      ranking.push({
        name,
        score,
        picture: `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`,
      });
      localStorage.setItem('ranking', JSON.stringify(ranking));
      clearInterval(this.timerId);
      history.push('/feedback');
    } else {
      this.wrongAnswerIndex = 0;
      this.startTimer();
      await dispatch(nextQuestion());
      this.randomizeAnswersAndStartQuestion();
    }
  }

  encodeString = (string) => {
    const newString = string
      .replace(/&amp;/img, '&')
      .replace(/&quot;/img, '"')
      .replace(/&ldquo;/img, '“')
      .replace(/&rdquo;/img, '"')
      .replace(/&#039;/img, '\'')
      .replace(/&lt;/img, '<')
      .replace(/&gt;/img, '>');
    return newString;
  }

  render() {
    const { question, category, correctAnswer } = this.props;

    const { timer, answered,
      shuffledArray, renderQuestion } = this.state;
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <h1 data-testid="question-text">{ this.encodeString(question) }</h1>
        <div data-testid="answer-options">
          { renderQuestion && shuffledArray.map((answer) => {
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
                  {this.encodeString(answer)}
                </button>);
            }
            this.wrongAnswerIndex += 1;
            return (
              <button
                onClick={ this.wrongAnswerClick }
                className={ answered ? 'red' : 'x' }
                type="button"
                data-testid={ `wrong-answer-${this.wrongAnswerIndex - 1}` }
                key={ answer }
                disabled={ timer === 0 }
              >
                {this.encodeString(answer)}
              </button>);
          })}
        </div>
        <p data-testid="timer">{timer}</p>
        {(answered || timer === 0)
        && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ async () => {
              this.nextQuestion();
            } }
          >
            Next
          </button>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questionX: state.player.question,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

MultipleChoices.propTypes = {
  score: PropTypes.number,
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
  type: PropTypes.string,
  question: PropTypes.string,
  category: PropTypes.string,
  correctAnswer: PropTypes.string,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(MultipleChoices);
