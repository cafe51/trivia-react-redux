import React, { useReducer } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'
import originalStore from '../redux/store/store'
import {INITIAL_STATE} from '../redux/reducers/user'
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store'
import { createMemoryHistory } from 'history'

describe('Testa se a store do redux', () => {
    test('Possue os elementos preenchidos', async () => {
        const response = {"response_code":0,"results":[{"category":"Geography","type":"multiple","difficulty":"easy","question":"What is the only state in the United States that does not have a flag in a shape with 4 edges?","correct_answer":"Ohio","incorrect_answers":["Florida","Idaho","New Mexico"]},{"category":"History","type":"boolean","difficulty":"easy","question":"Former United States Presidents John Adams and Thomas Jefferson died within hours of each other.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"easy","question":"Who played the Cenobite called &quot;Pinhead&quot; in the original Hellraiser films?","correct_answer":"Doug Bradley","incorrect_answers":["Doug Jones","Doug Savant","Doug Benson"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"easy","question":"What is Lilo&#039;s last name from Lilo and Stitch?","correct_answer":"Pelekai","incorrect_answers":["Anoa\u02bbi","Kealoha","Ku\u02bbulei"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"What was the African nation of Zimbabwe formerly known as?","correct_answer":"Rhodesia","incorrect_answers":["Zambia","Mozambique"," Bulawayo"]}]}

        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(response),
        });

        /* const {store} = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/'); */

        const history = createMemoryHistory();
        window.Cypress = jest.fn(true);
        render(
            <Router history={ history }>
                <Provider store={store}>
                    <App />
                </Provider>
            </Router>
        )

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

        const storeObj = store.getState()

        expect(storeObj.player.name).toBe('grupo10')
        expect(storeObj.player.gravatarEmail).toBe('grupo10@hotmail.com')
    })
})