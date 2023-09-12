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
import {
  ErrorMessage,
  SuccessMessage,
  Title,
  TitleContainer,
} from './AddLocationModal.styles';
import { useAuth } from '../../../context/auth/AuthProvider';
import { saveLocation } from '../../../services/location/save-location-service';

type IAddLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddLocationModal = ({ showmodal, setShowModal }: IAddLocationModal) => {
  const { accessToken } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [typeNumber, setTypeNumber] = useState<string>('');
  const [submissionStatus, setSubmissionStatus] = useState<
    'success' | 'error' | 'none'
  >('none');

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const {
    register,
    handleSubmit,
    setValue,
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
        setSubmissionStatus('success');
      })
      .catch((error) => {
        setSubmissionStatus('error');
        console.error('Erro ao atualizar o local:', error);
      });
  };

  const closeModal = () => {
    setSubmissionStatus('none');
    setShowModal(false);
  };

  useEffect(() => {
    if (submissionStatus === 'success' || submissionStatus === 'error') {
      const timer = setTimeout(() => {
        closeModal();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [submissionStatus]);

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
            onClick={() => setShowModal(false)}
          ></CloseIcon>
        </>
      }
      showModal={showmodal}
      setShowModal={setShowModal}
    >
      <Form handleSubmit={handleSubmit} onSubmit={(data) => onSubmit(data)}>
        <Frame direction="column" gap={'16px'}>
          {submissionStatus === 'success' && (
            <Modal showModal={true} setShowModal={closeModal}>
              <SuccessMessage>Local atualizado com sucesso!</SuccessMessage>
            </Modal>
          )}
          {submissionStatus === 'error' && (
            <Modal showModal={true} setShowModal={closeModal}>
              <ErrorMessage>
                Ocorreu um erro ao atualizar o local. Por favor, tente
                novamente.
              </ErrorMessage>
            </Modal>
          )}
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
              onClick={() => setShowModal(false)}
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
