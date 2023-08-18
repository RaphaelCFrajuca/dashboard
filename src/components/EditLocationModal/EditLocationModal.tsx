import { Controller, useForm } from 'react-hook-form';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Form } from '../Form/Form';
import { Frame } from '../../layout';
import { Modal } from '../Modal/Modal';
import { SelectComponent } from '../Select/Select';
import { BigInput } from '../Input/BigInput';
import {Title, TitleContainer, CloseIcon } from './EditLocationModal.styles';

type IEditLocationModal = {
  showmodal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditLocationModal = ({ showmodal, setShowModal }: IEditLocationModal) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      indication: '',
      pronouns: '',
      partOfCommunity: '',
      about: '',
      reason: '',
      interest: '',
      timeExperience: '',
      portfolio: '',
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
    setShowModal(false);
  };
  const options = [
    { value: 'yes', label: 'Sim' },
    { value: 'no', label: 'Não' },
    { value: 'not answered', label: 'Prefiro não responder' },
  ];
  const timeExperienceOptions = [
    { value: '0-6', label: '0-6 meses' },
    { value: '1-2', label: '1-2 anos' },
    { value: '2-4', label: '2-4 anos' },
    { value: '4+', label: '+4 anos' },
  ];
  return (
    <Modal
      header={
        <><TitleContainer>
				  <Title>Editar</Title>
			  </TitleContainer>
			  <CloseIcon
				  data-testid="close-modal"
				  onClick={() => setShowModal(false)}
			  >
					  <img src="close.svg" width={24} height={24} alt={'close icon'} />
          </CloseIcon>
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
              required: 'Precisamos do seu nome',
              // validate: (value) => validationFunction(value) || errorMessage
            })}
            error={errors.name}
            data-testid="input-name"
          />
          <Input
            label="E-mail"
            {...register('email', {
              required: 'Precisamos do seu email',
            })}
            error={errors.email}
            data-testid="input-email"
          />
          <Input
            label="Alguém te indicou? Quem?"
            {...register('indication', {})}
            error={errors.indication}
            data-testid="input-indication"
          />
          <Frame direction="row" gap={18}>
            <Input
              label="Pronomes"
              {...register('pronouns', {
                required: 'Por favor, responda',
              })}
              error={errors.pronouns}
              data-testid="input-pronouns"
            />
            <Controller
              control={control}
              render={() => (
                <SelectComponent
                  label="Faz parte da comunidade?"
                  options={options}
                  onChange={(value) => setValue('partOfCommunity', value.value)}
                  error={errors.partOfCommunity}
                  dataTestid="input-part-of-community"
                />
              )}
              rules={{ required: 'Por favor, responda' }}
              name={'partOfCommunity'}
            ></Controller>
          </Frame>
          <BigInput
            label="Nos conte sobre você ?"
            {...register('about', {
              required: 'Campo não pode ser vazio',
            })}
            error={errors.about}
            data-testid="input-about"
          />
          <BigInput
            label="Porque quer ser voluntário?"
            {...register('reason', {
              required: 'Campo não pode ser vazio',
            })}
            error={errors.reason}
            data-testid="input-reason"
          />
          <Frame direction="row" gap={18}>
            <Input
              label="Qual vaga tem interesse?"
              {...register('interest', {
                required: 'Por favor, responda',
              })}
              error={errors.interest}
              data-testid="input-interest"
            />
            <Controller
              control={control}
              render={() => (
                <SelectComponent
                  label="Tempo de experiência"
                  options={timeExperienceOptions}
                  onChange={(value) => setValue('timeExperience', value.value)}
                  error={errors.timeExperience}
                  dataTestid="input-time-experience"
                />
              )}
              rules={{ required: 'Por favor, responda' }}
              name={'timeExperience'}
            ></Controller>
          </Frame>
          <Input
            label="Portfólio"
            {...register('portfolio', {
              required: 'Por favor, responda',
            })}
            error={errors.portfolio}
            data-testid="input-portifolio"
          />
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
