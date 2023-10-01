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
} from '../../../services/location/location-by-id-service';
import { useQuery } from 'react-query';
import {
  TranslatedCep,
  translateCep,
} from '../../../services/cep/cep-translation-service';
import { Loading } from '../../Loading/Loading';

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

  const location = useQuery({
    queryKey: ['location'],
    queryFn: () => getLocationById(accessToken, id),
    enabled: false,
  });

  
  const src = location.data?.imgUrl ? location.data?.imgUrl : '';
  const cep = location.data && location.data.cep;

const  translatedCep = useQuery({
  queryKey: ['translatedCep'],
  queryFn: () => translateCep(cep),
  enabled: false,
});

 
console.log(id)
 console.log(location.data?.cep);

  useEffect( () => {
    const fetchLocation = async () => {
      console.log('refetching location');
     await location.refetch()
     if(cep)
      translatedCep.refetch()
    console.log('refetched location');
}
if(location.isRefetching || location.isLoading || !id || translatedCep.isRefetching || translatedCep.isLoading){
  return
}else
{fetchLocation()}
}, [id, cep]);



  const handleEdit = () => () => {
    setShowModal(false);
    setShowEditModal(true);
  };

  const handleDelete = () => () => {
    setShowModal(false);
    setShowEditModal(false);
  };
  return (
    <>
      {location.isLoading || location.isRefetching || translatedCep.isLoading || translatedCep.isRefetching? 
           <Styles.LoadingContainer>
          <Loading ></Loading>
        </Styles.LoadingContainer>
   
       : 
    <Modal
      header={
        <Frame direction="column" gap={'0px'} style={{ width: '100%' }}>
          <Frame
            direction="row"
            gap={'0px'}
            style={{ justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Styles.Id>{'#' + location.data?.id}</Styles.Id>
            <CloseIcon
              data-testid="close-modal"
              onClick={() => setShowModal(false)}
            ></CloseIcon>
          </Frame>
          <Styles.TitleContainer>
            <Styles.Title>{location.data?.name}</Styles.Title>
            <Styles.EditDelete>
              <BinIcon onClick={handleDelete()}></BinIcon>
              <EditIcon onClick={handleEdit()}></EditIcon>
            </Styles.EditDelete>
          </Styles.TitleContainer>
          <Frame direction="row" gap={'18px'} style={{ paddingTop: '3px' }}>
            <Styles.TextUnderTitle>
              {location.data?.averageGrade + ' Nota Média'}
            </Styles.TextUnderTitle>
            <Styles.TextUnderTitle>
              {location.data?.totalReviews + ' Avaliações'}
            </Styles.TextUnderTitle>
          </Frame>
          <Frame direction="row" gap={'18px'} style={{ paddingTop: '20px' }}>
            <Styles.StatusContainer>
              <span>
                {location.data?.pendingValidation ? 'Pendente' : 'Aprovado'}
              </span>
              <Styles.LocationStatusIcon
                approved={!location.data?.pendingValidation as boolean}
              />
            </Styles.StatusContainer>
            <Styles.StatusContainer>
              <span>Visível</span>
              <Styles.LocationStatusIcon
                approved={location.data?.isActive as boolean}
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
            <Styles.PropertyValue>{location.data?.type}</Styles.PropertyValue>
          </Styles.Property>
        </Frame>
        <Frame direction="row" gap={'15%'}>
          <Styles.Property>
            <Styles.PropertyName>CEP</Styles.PropertyName>
            <Styles.PropertyValue>{location.data?.cep}</Styles.PropertyValue>
          </Styles.Property>
          <Styles.Property>
            <Styles.PropertyName>Cidade/UF</Styles.PropertyName>
            <Styles.PropertyValue>
              {translatedCep.data?.localidade + '/' + translatedCep.data?.uf}
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
              {location.data?.endereco}
            </Styles.PropertyValue>
          </Styles.Property>
        </Frame>
        <Frame direction="row" gap={'15%'}>
          <Styles.Property>
            <Styles.PropertyName style={{ minWidth: '35%' }}>
              Latitude
            </Styles.PropertyName>
            <Styles.PropertyValue>
              {location.data?.latitude}
            </Styles.PropertyValue>
          </Styles.Property>
          <Styles.Property>
            <Styles.PropertyName style={{ minWidth: '40%' }}>
              Longitude
            </Styles.PropertyName>
            <Styles.PropertyValue>
              {location.data?.longitude}
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

    </Modal>}
    </>
  );
};

export { ShowLocationModal };