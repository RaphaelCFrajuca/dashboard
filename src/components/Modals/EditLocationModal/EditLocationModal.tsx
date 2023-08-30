import { Controller, set, useForm } from 'react-hook-form';
import { useState } from 'react';
import { ReactComponent as CloseIcon } from '../../../assets/Icons/Closeicons.svg';
import ModalImg from '../../ModalImg/ModalImg';
import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { Form } from '../../Form/Form';
import { Frame } from '../../../layout';
import { Modal } from '../Modal/Modal';
import { Option, SelectComponent } from '../../Select/Select';
import { BigInput } from '../../Input/BigInput';
import { useEffect } from 'react';
import { Title, TitleContainer } from './EditLocationModal.styles';
import { useAuth } from '../../../context/auth/AuthProvider';
import { getLocationById } from '../../../services/location/location-by-id-service';
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
  const { data, status } = useQuery('location', () =>
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
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: async () => {
      if (status === 'success') {
        return {
          id: data.id,
          name: data.name,
          endereco: data.endereco,
          type: convertValue(data.type),
          cep: data.cep,
          latitude: data.latitude,
          longitude: data.longitude,
        };
      }
    },
  });

  useEffect(() => {
    reset(data);
  }, [data]);
  const imgUrl = data ? data.imgUrl : '';
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
        <Frame direction="column" gap={16}>
          <Input
            label="Nome"
            {...register('name', {
              // validate: (value) => validationFunction(value) || errorMessage
            })}
            data-testid="input-name"
          />
          <Controller
            control={control}
            render={() => (
              <SelectComponent
                label="Tipo"
                options={types}
                onChange={(value) => {
                  setValue('type', value.label);
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
                dataTestid="type-select"
              />
            )}
            name="type"
          ></Controller>
          <Input
            label="Endereço"
            {...register('endereco', {})}
            data-testid="input-endereco"
          />
          <Frame direction="row" gap={18}>
            <Input
              label="CEP"
              {...register('cep', {})}
              data-testid="input-cep"
            />
          </Frame>
          <Frame direction="row" gap={18}>
            <Input
              label="Latitude"
              {...register('latitude', {})}
              data-testid="input-latitude"
            />
            <Input
              label="Longitude"
              {...register('longitude', {})}
              data-testid="input-longitude"
            />
          </Frame>
          <Frame direction="row" gap={0}>
            <ModalImg src={imgUrl} onFileChange={handleFileChange} />
          </Frame>
          <Frame direction="row" gap={18}>
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
