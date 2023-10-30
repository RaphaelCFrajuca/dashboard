import { Controller, useForm, FieldError } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AddLocationFormSchemaType,
  addLocationFormSchema,
} from '../../../zodSchemas/AddLocationSchema';
import { ReactComponent as CloseIcon } from '../../../assets/Icons/Closeicons.svg';
import ModalImg from '../../ModalImg/ModalImg';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Form } from '../../Form/Form';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import { Option, SelectComponent } from '../../Select/Select';
import { ConfirmationModal } from './../ConfirmationModal/ConfirmationModal';
import { Title, TitleContainer } from './AddLocationModal.styles';
import { useAuth } from '../../../context/auth/AuthProvider';
import { saveLocation } from '../../../services/location/save-location-service';

type IAddLocationModal = {
  showmodal: boolean;
  locationsRefresh: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddLocationModal = ({
  showmodal,
  setShowModal,
  locationsRefresh,
}: IAddLocationModal) => {
  const { accessToken } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [typeNumber, setTypeNumber] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const clearHide = () => {
    reset(), setShowModal(false);
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<AddLocationFormSchemaType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(addLocationFormSchema),
  });

  const onSubmit = (data: AddLocationFormSchemaType) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('locationTypeId', typeNumber);
    formData.append('file', selectedFile as File);
    formData.append('cep', data.cep);
    saveLocation(accessToken, formData)
      .then(() => {
        locationsRefresh();
        setHasError(false);
        setShowSubmitModal(true);
      })
      .catch(() => {
        setHasError(true);
        setShowSubmitModal(true);
      });
    setTimeout(() => {
      setShowSubmitModal(false);
      setShowModal(false);
    }, 2000);
    clearHide();
  };

  const types: Option[] = [
    { value: '1', label: 'Bar' },
    { value: '2', label: 'Restaurante' },
    { value: '3', label: 'Casa Noturna' },
  ];

  return (
    <Modal
      header={
        <>
          <TitleContainer>
            <Title>Novo Local</Title>
          </TitleContainer>
          <CloseIcon
            data-testid="close-modal"
            onClick={() => clearHide()}
          ></CloseIcon>
        </>
      }
      showModal={showmodal}
      setShowModal={setShowModal}
    >
      <ConfirmationModal
        hasError={hasError}
        setShowModal={setShowSubmitModal}
        showmodal={showSubmitModal}
      />
      <Form handleSubmit={handleSubmit} onSubmit={(data) => onSubmit(data)}>
        <Frame direction="column" gap={'16px'}>
          <Input
            label="Nome"
            {...register('name', {})}
            data-testid="input-name"
            error={errors.name as FieldError}
          />
          <Controller
            control={control}
            render={() => (
              <SelectComponent
                label="Tipo"
                options={types}
                onChange={(value) => {
                  setValue('type', value.value);
                  setTypeNumber(value.value);
                  errors.type = undefined;
                }}
                dataTestid="type-select"
                error={errors.type}
              />
            )}
            name="type"
          ></Controller>
          <Input
            label="CEP"
            {...register('cep', {})}
            data-testid="input-cep"
            error={errors.cep}
          />
          <Frame data-testid="img" direction="row" gap={'0px'}>
            <ModalImg src="" onFileChange={handleFileChange} />
          </Frame>
          <Frame direction="row" gap={'18px'}>
            <Button
              grow
              onClick={() => clearHide()}
              data-testid="button-cancel"
            >
              CANCELAR
            </Button>
            <Button grow type="submit" primary data-testid="button-send">
              ENVIAR
            </Button>
          </Frame>
        </Frame>
      </Form>
    </Modal>
  );
};

export { AddLocationModal };
