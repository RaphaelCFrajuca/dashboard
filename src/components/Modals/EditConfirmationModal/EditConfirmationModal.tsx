import { useEffect } from 'react';
import { Modal } from '../Modal/Modal';
import { ErrorMessage, SuccessMessage } from './EditConfirmationModal.styles';
import { set } from 'react-hook-form';

type IEditConfirmationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  hasError?: boolean;
};

const EditConfirmationModal = ({
  showmodal,
  setShowModal,
  hasError,
}: IEditConfirmationModal) => {
  return (
    <Modal showModal={showmodal} setShowModal={setShowModal}>
      {hasError ? (
        <ErrorMessage>
          Ocorreu um erro ao atualizar o local. Por favor, tente novamente.
      </ErrorMessage>
    ):(
      <SuccessMessage>Local atualizado com sucesso!</SuccessMessage>
    )}
    </Modal>
  );
};

export { EditConfirmationModal };