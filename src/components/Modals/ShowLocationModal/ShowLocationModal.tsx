import { Controller, useForm, FieldError, set } from 'react-hook-form';
import { useState, useEffect, SetStateAction } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactComponent as CloseIcon } from '../../../assets/Icons/Closeicons.svg';
import { ReactComponent as EditIcon } from '../../../assets/Icons/Editicons.svg';
import { ReactComponent as BinIcon } from '../../../assets/Icons/Bin.svg';
import ModalImg from '../../ModalImg/ModalImg';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Form } from '../../Form/Form';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import {
  Title,
  TitleContainer,
  Property,
  PropertyName,
  PropertyValue,
  EditDelete,
} from './ShowLocationModal.styles';
import { useAuth } from '../../../context/auth/AuthProvider';
import {
  getLocationById,
  Location,
} from '../../../services/location/location-by-id-service';
import { useQuery } from 'react-query';
import { TranslatedCep, translateCep } from '../../../services/cep/cep-translation-service';

type IShowLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const ShowLocationModal = ({
  showmodal,
  setShowModal,
  setShowEditModal,
  setShowAddModal,
  id,
}: IShowLocationModal) => {
  const { accessToken } = useAuth();
  const location = useQuery('location', () => getLocationById(accessToken, id));

  const [locationData, setLocationData] = useState<Location | null>(null);
  const [cepData, setCepData] = useState< TranslatedCep | null>(null);
  const cep = locationData?.cep;
  const src = locationData?.imgUrl? locationData?.imgUrl : "";

  const translatedCep = useQuery({
    queryKey: ['translatedCep', cep],
    queryFn: () => translateCep(cep),
    enabled: !!cep,
  });

  useEffect(() => {
    location.refetch();
    translatedCep.refetch();
  }, [showmodal]);

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
  }, [location.data, translatedCep.data, showmodal]);
 
   const handleEdit = () => () => {
    
    setShowModal(false);
    setShowAddModal(false);
    setShowEditModal(true);
  
  };

  const handleDelete = () => () => {
    setSelectedId(id as number);
    setShowModal(false);
    setShowAddModal(false);
    setShowEditModal(false);
  
  };
  return (
    <Modal
      header={
        <>
          <TitleContainer>
            <Title>{locationData?.name}</Title>
            
          </TitleContainer>
          <EditDelete>
            <BinIcon onClick={handleDelete()}></BinIcon>
            <EditIcon  onClick={handleEdit()}></EditIcon>
            </EditDelete>
          <CloseIcon
            data-testid="close-modal"
            onClick={() => setShowModal(false)}
          ></CloseIcon>
        </>
      }
      showModal={showmodal}
      setShowModal={setShowModal}
    >
      <Frame direction="column" gap={'16px'}>
        <Frame direction="row" gap={'18px'}>
          <Property>
            <PropertyName>Tipo de local</PropertyName>
            <PropertyValue>{locationData?.type}</PropertyValue>
          </Property>
        </Frame>
        <Frame direction="row" gap={'15%'}>
          <Property>
            <PropertyName>CEP</PropertyName>
            <PropertyValue>{locationData?.cep}</PropertyValue>
          </Property>
          <Property>
            <PropertyName>Cidade/UF</PropertyName>
            <PropertyValue>
              {cepData?.localidade + '/' + cepData?.uf}
            </PropertyValue>
          </Property>
        </Frame>
        <Frame direction="row" gap={'0'}>
          <Property style={{width:"100%"}}>
            <PropertyName style={{minWidth:"17.5%"} }>Endereço</PropertyName>
            <PropertyValue style={{overflow:"hidden", minWidth:"80%", WebkitMaskImage:"linear-gradient(90deg, #000,  90%, transparent)"}}>{locationData?.endereco}</PropertyValue>
          </Property>
        </Frame>
        <Frame direction="row" gap={'15%'}>
          <Property>
            <PropertyName>Latitude</PropertyName>
            <PropertyValue>{locationData?.latitude}</PropertyValue>
          </Property>
          <Property>
            <PropertyName>Longitude</PropertyName>
            <PropertyValue>{locationData?.longitude}</PropertyValue>
          </Property>
        </Frame>
        <Frame direction="column" gap={'0'}>
          <img style={{width:"100%", height:"auto", padding:"0"}} src={src}></img>
        </Frame>
      </Frame>
    </Modal>
  );
};

export { ShowLocationModal };
