import { useState, useEffect } from 'react';
import { ReactComponent as CloseIcon } from '../../../assets/Icons/Closeicons.svg';
import { ReactComponent as EditIcon } from '../../../assets/Icons/Editicons.svg';
import { ReactComponent as BinIcon } from '../../../assets/Icons/Bin.svg';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import * as Styles from './ShowLocationModal.styles';
import { useAuth } from '../../../context/auth/AuthProvider';
import {
  getLocationById,
  Location,
} from '../../../services/location/location-by-id-service';
import { useQuery } from 'react-query';
import {
  TranslatedCep,
  translateCep,
} from '../../../services/cep/cep-translation-service';

type IShowLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number | undefined;
};

const ShowLocationModal = ({
  showmodal,
  setShowModal,
  setShowEditModal,
  id,
}: IShowLocationModal) => {
  const { accessToken } = useAuth();

  const [locationData, setLocationData] = useState<Location | null>(null);
  const [cepData, setCepData] = useState<TranslatedCep | null>(null);
  const cep = locationData?.cep;
  const src = locationData?.imgUrl ? locationData?.imgUrl : '';

  const location = useQuery({
    queryKey: ['location', locationData],
    queryFn: () => getLocationById(accessToken, id),
    enabled: false,
  });

  const translatedCep = useQuery({
    queryKey: ['translatedCep', cep],
    queryFn: () => translateCep(cep),
    enabled: false,
  });

  useEffect(() => {
    if (id) {
      location.refetch();
      if (cep) translatedCep.refetch();
    }
  }, [showmodal, id, cep]);

  useEffect(() => {
    if (location.data) {
      setLocationData({
        id: location.data.id,
        name: location.data.name,
        cep: location.data.cep,
        endereco: location.data.endereco,
        type: location.data.type,
        imgUrl: location.data.imgUrl,
        averageGrade: location.data.averageGrade,
        totalReviews: location.data.totalReviews,
        isActive: location.data.isActive,
        pendingValidation: location.data.pendingValidation,
        latitude: location.data.latitude,
        longitude: location.data.longitude,
      } as Location);
      if (translatedCep.data) {
        setCepData(translatedCep.data);
      }
    }
  }, [location.data, translatedCep.data]);

  const handleEdit = () => () => {
    setShowModal(false);
    setShowEditModal(true);
  };

  const handleDelete = () => () => {
    setShowModal(false);
    setShowEditModal(false);
  };
  return (
    <Modal
      header={
        <Frame direction="column" gap={'0px'} style={{ width: '100%' }}>
          <Frame
            direction="row"
            gap={'0px'}
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Styles.Id>{'#' + locationData?.id}</Styles.Id>
            <CloseIcon
              data-testid="close-modal"
              onClick={() => setShowModal(false)}
            ></CloseIcon>
          </Frame>
          <Styles.TitleContainer>
            <Styles.Title>{locationData?.name}</Styles.Title>
            <Styles.EditDelete>
              <BinIcon onClick={handleDelete()}></BinIcon>
              <EditIcon onClick={handleEdit()}></EditIcon>
            </Styles.EditDelete>
          </Styles.TitleContainer>
          <Frame direction="row" gap={'18px'} style={{ paddingTop: '3px' }}>
            <Styles.TextUnderTitle>
              {locationData?.averageGrade + ' Nota Média'}
            </Styles.TextUnderTitle>
            <Styles.TextUnderTitle>
              {locationData?.totalReviews + ' Avaliações'}
            </Styles.TextUnderTitle>
          </Frame>
          <Frame direction="row" gap={'18px'} style={{ paddingTop: '20px' }}>
            <Styles.StatusContainer>
              <span>Aprovado</span>
              <Styles.LocationStatusIcon
                approved={locationData?.pendingValidation as boolean}
              />
            </Styles.StatusContainer>
            <Styles.StatusContainer>
              <span>Visível</span>
              <Styles.LocationStatusIcon
                approved={locationData?.isActive as boolean}
              />
            </Styles.StatusContainer>
          </Frame>
        </Frame>
      }
      showModal={showmodal}
      setShowModal={setShowModal}
    >
      <Frame direction="column" gap={'16px'}>
        <Frame direction="row" gap={'18px'}>
          <Styles.Property>
            <Styles.PropertyName>Tipo de local</Styles.PropertyName>
            <Styles.PropertyValue>{locationData?.type}</Styles.PropertyValue>
          </Styles.Property>
        </Frame>
        <Frame direction="row" gap={'15%'}>
          <Styles.Property>
            <Styles.PropertyName>CEP</Styles.PropertyName>
            <Styles.PropertyValue>{locationData?.cep}</Styles.PropertyValue>
          </Styles.Property>
          <Styles.Property>
            <Styles.PropertyName>Cidade/UF</Styles.PropertyName>
            <Styles.PropertyValue>
              {cepData?.localidade + '/' + cepData?.uf}
            </Styles.PropertyValue>
          </Styles.Property>
        </Frame>
        <Frame direction="row" gap={'0'}>
          <Styles.Property style={{ width: '100%' }}>
            <Styles.PropertyName style={{ minWidth: '17.5%' }}>
              Endereço
            </Styles.PropertyName>
            <Styles.PropertyValue
              style={{
                overflow: 'hidden',
                minWidth: '80%',
                WebkitMaskImage:
                  'linear-gradient(90deg, #000,  95%, transparent)',
              }}
            >
              {locationData?.endereco}
            </Styles.PropertyValue>
          </Styles.Property>
        </Frame>
        <Frame direction="row" gap={'15%'}>
          <Styles.Property>
            <Styles.PropertyName style={{ minWidth: '35%' }}>
              Latitude
            </Styles.PropertyName>
            <Styles.PropertyValue>
              {locationData?.latitude}
            </Styles.PropertyValue>
          </Styles.Property>
          <Styles.Property>
            <Styles.PropertyName style={{ minWidth: '40%' }}>
              Longitude
            </Styles.PropertyName>
            <Styles.PropertyValue>
              {locationData?.longitude}
            </Styles.PropertyValue>
          </Styles.Property>
        </Frame>
        <Frame direction="column" gap={'0'}>
          <img
            style={{ width: '100%', height: 'auto', padding: '0' }}
            src={src}
          ></img>
        </Frame>
      </Frame>
    </Modal>
  );
};

export { ShowLocationModal };
