import React, { useReducer } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'
import { MOCK_DATA } from './feedback.test';

const MOCK_API_RESPONSE_CODE_3 = {
  "response_code":3,
  "results":[],
}

describe('Testando se a página de game...', () => { 
  test('redirecionar para a página login se o response_code da api retorna 3', async () => {

    jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(MOCK_API_RESPONSE_CODE_3),
    });
    global.Storage.prototype.getItem = jest.fn((key) => 'pudim');
    
    const { history } = renderWithRouterAndRedux(<App />, MOCK_DATA , "/game" );

    expect(await screen.findByText(/nome:/i, {},{timeout: 5000})).toBeInTheDocument()

    expect(history.location.pathname).toBe('/');
  })
})