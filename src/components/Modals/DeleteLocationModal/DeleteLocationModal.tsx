import { Button } from '../../Button/Button';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import { Title } from './DeleteLocationModal.styles';
import { useQuery } from 'react-query';
import { getLocationById } from '../../../services/location/location-by-id-service';
import { useAuth } from '../../../context/auth/AuthProvider';

type IDeleteLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const DeleteLocationModal = ({
  showmodal,
  setShowModal,
  id,
}: IDeleteLocationModal) => {
  const { accessToken } = useAuth();
  const locationQuery = useQuery(
    ['location', id],
    () => getLocationById(accessToken, id),
    {
      enabled: !!id && showmodal,
    }
  );
  return (
    <Modal showModal={showmodal} setShowModal={setShowModal}>
      <Frame direction="column" gap={'30px'}>
        <Frame direction="column" gap={'10px'}>
          <Title>Excluir Local</Title>
          <p>
            Tem certeza de que deseja excluir o local{' '}
            <b>'{locationQuery.data?.name}'</b> permanentemente? Essa ação não
            poderá ser desfeita.
          </p>
        </Frame>
        <Frame direction="row" gap={'16px'}>
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
