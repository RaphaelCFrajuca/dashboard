import {
  render,
  screen,
  fireEvent,
  findAllByTestId,
} from '@testing-library/react';
import { EditLocationModal } from './EditLocationModal';

describe('EditLocationModal', () => {
  const setShowModalMock = jest.fn();

  beforeEach(() => {
    render(
      <EditLocationModal showmodal={true} setShowModal={setShowModalMock} />
    );
  });

  it('renders the modal header correctly', () => {
    const titleText = 'Quero ser voluntário!';
    const subTitleText =
      'Após o envio deste formulário, a equipe do Is It Safe? irá entrar em contato através do e-mail fornecido.';

    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(screen.getByText(subTitleText)).toBeInTheDocument();
  });

  it('triggers the setShowModal function when cancel button is clicked', () => {
    const cancelButton = screen.getByText('CANCELAR');
    fireEvent.click(cancelButton);

    expect(setShowModalMock).toHaveBeenCalledWith(false);
  });

  it('show errors in required inputs if user click on submit with all inputs empty', async () => {
    const nameInput = await screen.findByTestId('input-name');
    const emailInput = await screen.findByTestId('input-email');
    const indicationInput = await screen.findByTestId('input-indication');
    const pronounsInput = await screen.findByTestId('input-pronouns');
    const partOfCommunityInput = await screen.findByTestId(
      'input-part-of-community'
    );
    const aboutInput = await screen.findByTestId('input-about');
    const reasonInput = await screen.findByTestId('input-reason');
    const interestInput = await screen.findByTestId('input-interest');
    const timeExperienceInput = await screen.findByTestId(
      'input-time-experience'
    );
    const portifolioInput = await screen.findByTestId('input-portifolio');
    const cancelButton = await screen.findByTestId('button-cancel');
    const sendButton = await screen.findByTestId('button-send');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(indicationInput).toBeInTheDocument();
    expect(pronounsInput).toBeInTheDocument();
    expect(partOfCommunityInput).toBeInTheDocument();
    expect(aboutInput).toBeInTheDocument();
    expect(reasonInput).toBeInTheDocument();
    expect(interestInput).toBeInTheDocument();
    expect(timeExperienceInput).toBeInTheDocument();
    expect(portifolioInput).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();

    fireEvent.click(sendButton);

    const allErrors = await screen.findAllByTestId('input-error');
    expect(allErrors).toHaveLength(9); // There is 9 required inputs
  });
});
