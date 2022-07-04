import React, { Component, useReducer } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'
import { MOCK_DATA } from './feedback.test';
import { tokenResponse } from '../../cypress/mocks/token';

const MOCK_API_RESPONSE_CODE_3 = {
  "response_code":3,
  "results":[],
}

const QUESTIONS_RESPONSE = {"response_code":0,"results":[{"category":"Geography","type":"multiple","difficulty":"easy","question":"What is the only state in the United States that does not have a flag in a shape with 4 edges?","correct_answer":"Ohio","incorrect_answers":["Florida","Idaho","New Mexico"]},{"category":"History","type":"boolean","difficulty":"easy","question":"Former United States Presidents John Adams and Thomas Jefferson died within hours of each other.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"easy","question":"Who played the Cenobite called &quot;Pinhead&quot; in the original Hellraiser films?","correct_answer":"Doug Bradley","incorrect_answers":["Doug Jones","Doug Savant","Doug Benson"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"easy","question":"What is Lilo&#039;s last name from Lilo and Stitch?","correct_answer":"Pelekai","incorrect_answers":["Anoa\u02bbi","Kealoha","Ku\u02bbulei"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"What was the African nation of Zimbabwe formerly known as?","correct_answer":"Rhodesia","incorrect_answers":["Zambia","Mozambique"," Bulawayo"]}]}  

describe('Testando se a página de game...', () => { 
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    window.Cypress = true;
  })
  
  test('verifica se os botões desabilitam ao tempo chegar em 0', async () => {

    const mockFetch = jest.fn()
    .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(tokenResponse),
    })
    .mockReturnValueOnce({
      json: jest.fn().mockResolvedValue(QUESTIONS_RESPONSE),
    });

    global.fetch = mockFetch;

    renderWithRouterAndRedux(<App />);
    
    const nameInput = screen.getByRole('textbox', { name:/nome:/i });
    const emailInput = screen.getByRole('textbox', { name:/email:/i });
    const playButton = screen.getByRole('button', { name:/play/i });
    
    userEvent.type(nameInput, 'grupo10')
    userEvent.type(emailInput, 'grupo10@hotmail.com')
    userEvent.click(playButton);

    await waitForElementToBeRemoved(
      () => screen.getByRole('button', { name:/play/i }),
      { timeout: 5000 },
    )

    expect(await screen.findByTestId('correct-answer')).toBeInTheDocument()

    const wrongAnswer = screen.getByTestId('wrong-answer-0');
    
    userEvent.click(wrongAnswer)
    const nextButton1 = screen.getByRole('button', {name: /next/i});
    userEvent.click(nextButton1); 
    
    await waitForElementToBeRemoved(
      () => screen.getByRole('button', { name:/next/i }),
      { timeout: 4500 },
    )

    expect(await screen.findByTestId('correct-answer')).toBeInTheDocument()

    const correctAnswer1 = screen.getByTestId('correct-answer');
    
    userEvent.click(correctAnswer1)
    const nextButton2 = screen.getByRole('button', {name: /next/i});
    userEvent.click(nextButton2); 
    
    await waitForElementToBeRemoved(
      () => screen.getByRole('button', { name:/next/i }),
      { timeout: 4500 },
    )

    expect(await screen.findByText(/^0$/i)).toBeInTheDocument()

    const correctAnswer2 = screen.getByTestId('correct-answer');

    expect(correctAnswer2).toBeDisabled()
  })

  test('redirecionar para a página login se o response_code da api retorna 3', async () => {

    jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(MOCK_API_RESPONSE_CODE_3),
    });
    /* global.Storage.prototype.getItem = jest.fn((key) => 'pudim'); */
    localStorage.setItem('token', 'dasda');

    const { history } = renderWithRouterAndRedux(<App />, MOCK_DATA , "/game" );

    expect(await screen.findByText(/nome:/i, {},{timeout: 5000})).toBeInTheDocument()

    expect(history.location.pathname).toBe('/');
  })
})