/* eslint-disable react/no-unescaped-entities */
import { Button } from '../../Button/Button';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import { SelectComponent } from '../../Select/Select';
import { BigInput } from '../../Input/BigInput';
import { Title } from './DeleteLocationModal.styles';

type IDeleteLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteLocationModal = ({
  showmodal,
  setShowModal,
}: IDeleteLocationModal) => {
  const location = {
    name: 'Teste',
  };

  return (
    <Modal showModal={showmodal} setShowModal={setShowModal}>
      <Frame direction="column" gap={30}>
        <Frame direction="column" gap={10}>
          <Title>Excluir Local</Title>
          <p>
            Tem certeza de que deseja excluir o local <b>'{location.name}'</b>{' '}
            permanentemente? Essa ação não poderá ser desfeita.
          </p>
        </Frame>
        <Frame direction="row" gap={16}>
          <Button
            grow
            onClick={() => setShowModal(false)}
            data-testid="button-cancel"
          >
            CANCELAR
          </Button>
          <Button
            grow
            primary
            style={{ background: '#ec483d' }}
            data-testid="button-send"
          >
            EXCLUIR
          </Button>
        </Frame>
      </Frame>
    </Modal>
  );
};

export { DeleteLocationModal };