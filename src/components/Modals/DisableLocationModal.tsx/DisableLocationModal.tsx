/* eslint-disable react/no-unescaped-entities */
import { Button } from '../../Button/Button';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import { Title } from './DisableLocationModal.styles';
import { useQuery } from 'react-query';
import { getLocationById } from '../../../services/location/location-by-id-service';
import { useAuth } from '../../../context/auth/AuthProvider';
import { disableLocationById } from '../../../services/location/disable-by-id-service';

type IDisableLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const DisableLocationModal = ({
  showmodal,
  setShowModal,
  id,
}: IDisableLocationModal) => {
  const { accessToken } = useAuth();
  const locationQuery = useQuery(
    ['location', id],
    () => getLocationById(accessToken, id),
    {
      enabled: !!id && showmodal,
      onSuccess: (data) => {
        if (!data.isActive)
          setTimeout(() => {
            setShowModal(false);
          }, 5000);
      },
    }
  );
  if (locationQuery.isLoading) {
    return <div></div>;
  }
  const handleDisable = async () => {
    await disableLocationById(accessToken, id);
    setShowModal(false);
  };
  return (
    <Modal showModal={showmodal} setShowModal={setShowModal}>
      <Frame direction="column" gap={'30px'}>
        <Frame direction="column" gap={'10px'}>
          <Title>Desativar Local</Title>
          {locationQuery.data?.isActive ? (
            <p>
              Tem certeza de que deseja desativar o local{' '}
              <b>'{locationQuery.data?.name}'</b>? Essa ação só
              poderá ser desfeita salvando uma edição com valores válidos de
              latitude e longitude.
            </p>
          ) : (
            <p>
              O local <b>'{locationQuery.data?.name}'</b> ja está inativo.
            </p>
          )}
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
            style={{ background: '#3d74ec' }}
            data-testid="button-send"
            onClick={() => handleDisable()}
          >
            DESATIVAR
          </Button>
        </Frame>
      </Frame>
    </Modal>
  );
};

export { DisableLocationModal };
