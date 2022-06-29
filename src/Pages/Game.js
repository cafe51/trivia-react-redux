import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MultipleChoices from '../Components/MutipleChoices';

const RESPONSE_CODE_3 = 3;

export default class Game extends React.Component {
  state = {
    response: [],
    questionIndex: 2,
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { history } = this.props;

    const token = localStorage.getItem('token');
    const fetchResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseJson = await fetchResponse.json();
    console.log(responseJson);
    if (responseJson.response_code === 0) {
      this.setState({ response: responseJson.results });
    } else if (responseJson.response_code === RESPONSE_CODE_3) {
      localStorage.setItem('token', '');
      history.push('/');
    }
    const { questionIndex, response } = this.state;
    // console.log(response);
    console.log(response[questionIndex].incorrect_answers);
  }

  render() {
    const { questionIndex, response } = this.state;
    return (
      <div>
        <Header />
        {response.length > 0 && (
          <MultipleChoices
            question={ response[questionIndex].question }
            category={ response[questionIndex].category }
            correctAnswer={ response[questionIndex].correct_answer }
            incorrectAnswers={ response[questionIndex].incorrect_answers }
            type={ response[questionIndex].type }
          />
        )}
        {/* {question == 1} */}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;
