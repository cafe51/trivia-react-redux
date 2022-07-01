import React, { useReducer } from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux'

describe('Testando se a página de ranking...', () => {
    test('Exibe o título, a quantidade correta de players e as informações corretas', async () => {
        const response = {"response_code":0,"results":[{"category":"Geography","type":"multiple","difficulty":"easy","question":"What is the only state in the United States that does not have a flag in a shape with 4 edges?","correct_answer":"Ohio","incorrect_answers":["Florida","Idaho","New Mexico"]},{"category":"History","type":"boolean","difficulty":"easy","question":"Former United States Presidents John Adams and Thomas Jefferson died within hours of each other.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"easy","question":"Who played the Cenobite called &quot;Pinhead&quot; in the original Hellraiser films?","correct_answer":"Doug Bradley","incorrect_answers":["Doug Jones","Doug Savant","Doug Benson"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"easy","question":"What is Lilo&#039;s last name from Lilo and Stitch?","correct_answer":"Pelekai","incorrect_answers":["Anoa\u02bbi","Kealoha","Ku\u02bbulei"]},{"category":"Geography","type":"multiple","difficulty":"easy","question":"What was the African nation of Zimbabwe formerly known as?","correct_answer":"Rhodesia","incorrect_answers":["Zambia","Mozambique"," Bulawayo"]}]}

        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(response),
        });

        const { history } = renderWithRouterAndRedux(<App />);

        const nameInput = screen.getByRole('textbox', { name:/nome:/i });
        const emailInput = screen.getByRole('textbox', { name:/email:/i });
        const playButton = screen.getByRole('button', { name:/play/i });

        userEvent.type(nameInput, 'grupo10')
        userEvent.type(emailInput, 'grupo10@hotmail.com')
        userEvent.click(playButton);

        await waitForElementToBeRemoved(
            () => screen.getByRole('button', { name:/play/i }),
            { timeout: 1000 },
        )

        const correctAnswer1 = screen.getByTestId('correct-answer');
        userEvent.click(correctAnswer1);
        const nextButton1 = screen.getByRole('button', {name: /next/i});
        userEvent.click(nextButton1);

        await waitForElementToBeRemoved(
            () => screen.getByRole('button', {name: /next/i}),
            { timeout: 1000 },
        )

        const correctAnswer2 = screen.getByTestId('correct-answer');
        userEvent.click(correctAnswer2);
        const nextButton2 = screen.getByRole('button', {name: /next/i});
        userEvent.click(nextButton2);

        await waitForElementToBeRemoved(
            () => screen.getByRole('button', {name: /next/i}),
            { timeout: 1000 },
        )

        const correctAnswer3 = screen.getByTestId('correct-answer');
        userEvent.click(correctAnswer3);
        const nextButton3 = screen.getByRole('button', {name: /next/i});
        userEvent.click(nextButton3);

        await waitForElementToBeRemoved(
            () => screen.getByRole('button', {name: /next/i}),
            { timeout: 1000 },
        )

        const correctAnswer4 = screen.getByTestId('correct-answer');
        userEvent.click(correctAnswer4);
        const nextButton4 = screen.getByRole('button', {name: /next/i});
        userEvent.click(nextButton4);

        await waitForElementToBeRemoved(
            () => screen.getByRole('button', {name: /next/i}),
            { timeout: 1000 },
        )

        const correctAnswer5 = screen.getByTestId('correct-answer');
        userEvent.click(correctAnswer5);
        const nextButton5 = screen.getByRole('button', {name: /next/i});
        userEvent.click(nextButton5);

        const rankingButton = screen.getByRole('button', {name:/ranking/i});
        userEvent.click(rankingButton);

        const rankingTitle =  screen.getByText(/ranking/i);
        expect(rankingTitle).toBeInTheDocument();

        const spy = spyOn(global, 'sort');
        expect(spy).toHaveBeenCalled();

        const player1name = screen.getByText(/grupo10/i);
        const player1picture = screen.getByRole('img', {  name: /foto de grupo10/i }) 
        const player1score = screen.getByText(/200/i);

        expect(player1name).toBeInTheDocument();
        expect(player1picture).toHaveAttribute('src', 'https://www.gravatar.com/avatar/fc047b396b1e1955d2b35283e6449795');
        expect(player1picture).toBeInTheDocument();
        expect(player1score).toBeInTheDocument();

        const inicialButton = screen.getByRole('button', {name:/tela inicial/i});
        expect(inicialButton).toBeInTheDocument();

        userEvent.click(inicialButton);
        expect(history.location.pathname).toBe('/');
    })
})