import { Controller, useForm, FieldError, set } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { editLocationFormSchema } from '../../../zodSchemas/EditLocationSchema';
import { ReactComponent as CloseIcon } from '../../../assets/Icons/Closeicons.svg';
import ModalImg from '../../ModalImg/ModalImg';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Form } from '../../Form/Form';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import { Option, SelectComponent } from '../../Select/Select';
import { Title, TitleContainer } from './EditLocationModal.styles';
import { useAuth } from '../../../context/auth/AuthProvider';
import {
  getLocationById,
  Location,
} from '../../../services/location/location-by-id-service';
import { useQuery } from 'react-query';
import { updateLocation } from '../../../services/location/update-location-service';

type IEditLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const EditLocationModal = ({
  showmodal,
  setShowModal,
  id,
}: IEditLocationModal) => {
  const { accessToken } = useAuth();
  const { data, status, refetch } = useQuery('location', () =>
    getLocationById(accessToken, id)
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [typeNumber, setTypeNumber] = useState<string>('');

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const convertValue = (value: string) => {
    if (value === 'Bar') {
      return '1';
    } else if (value === 'Restaurante') {
      return '2';
    } else if (value === 'Casa Noturna') {
      return '3';
    } else {
      return '';
    }
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Location>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(editLocationFormSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('endereco', data.endereco);
    formData.append('locationType', typeNumber);
    formData.append('file', selectedFile as File);
    formData.append('cep', data.cep);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    updateLocation(accessToken, formData, id);
    setShowModal(false);
  };
  const types: Option[] = [
    { value: '1', label: 'Bar' },
    { value: '2', label: 'Restaurante' },
    { value: '3', label: 'Casa Noturna' },
  ];

  const src = data?.imgUrl ? data?.imgUrl : '';

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        endereco: data.endereco,
        type: convertValue(data.type),
        cep: data.cep,
        latitude: data.latitude,
        longitude: data.longitude,
      });
    }
  }, [data, status, reset]);

  useEffect(() => {
    refetch();
  }, [showmodal]);
  return (
    <Modal
      header={
        <>
          <TitleContainer>
            <Title>Editar</Title>
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
      <Form handleSubmit={handleSubmit} onSubmit={onSubmit}>
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
                dataTestid="select"
                label="Tipo"
                options={types}
                onChange={(value) => {
                  setTypeNumber(value.value);
                }}
                previousValue={
                  data
                    ? ({
                        label: data?.type,
                        value: convertValue(data?.type),
                      } as Option)
                    : null
                }
              />
            )}
            name="type"
          ></Controller>
          <Input
            label="Endereço"
            {...register('endereco', {})}
            data-testid="input-endereco"
            error={errors.endereco as FieldError}
          />
          <Frame direction="row" gap={'18px'}>
            <Input
              label="CEP"
              {...register('cep', {})}
              data-testid="input-cep"
              error={errors.cep as FieldError}
            />
          </Frame>
          <Frame direction="row" gap={'18px'}>
            <Input
              label="Latitude"
              {...register('latitude', {})}
              data-testid="input-latitude"
              error={
                errors.latitude?.message === 'Expected number, received nan'
                  ? ({ message: 'O valor deve ser um número' } as FieldError)
                  : (errors.latitude as FieldError)
              }
            />
            <Input
              label="Longitude"
              {...register('longitude', {})}
              data-testid="input-longitude"
              error={
                errors.longitude?.message === 'Expected number, received nan'
                  ? ({ message: 'O valor deve ser um número' } as FieldError)
                  : (errors.longitude as FieldError)
              }
            />
          </Frame>
          <Frame data-testid="img" direction="row" gap={'0px'}>
            <ModalImg src={src} onFileChange={handleFileChange} />
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

export { EditLocationModal };
