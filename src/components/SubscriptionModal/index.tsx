import { Controller, useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Form } from '../../components/Form';
import { Frame } from '../../layout';
import { Modal } from '../../components/Modal';
import { SelectComponent } from '../Select';
import { BigInput } from '../Input/BigInput';
import { SubTitle, Title, TitleContainer } from './styled';

type ISubscriptionModal = {
	showmodal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SubsCriptionModal = ({ showmodal, setShowModal }: ISubscriptionModal) => {
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
				<TitleContainer>
					<Title>Quero ser voluntário!</Title>
					<SubTitle>
						Após o envio deste formulário, a equipe do Is It Safe?
						irá entrar em contato através do e-mail fornecido.
					</SubTitle>
				</TitleContainer>
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
					/>
					<Input
						label="E-mail"
						{...register('email', {
							required: 'Precisamos do seu email',
						})}
						error={errors.email}
					/>
					<Input
						label="Alguém te indicou? Quem?"
						{...register('indication', {})}
						error={errors.indication}
					/>
					<Frame direction="row" gap={18}>
						<Input
							label="Pronomes"
							{...register('pronouns', {
								required: 'Por favor, responda',
							})}
							error={errors.pronouns}
						/>
						<Controller
							control={control}
							render={() => (
								<SelectComponent
									label="Faz parte da comunidade?"
									options={options}
									onChange={(value) =>
										setValue('partOfCommunity', value.value)
									}
									error={errors.partOfCommunity}
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
					/>
					<BigInput
						label="Porque quer ser voluntário?"
						{...register('reason', {
							required: 'Campo não pode ser vazio',
						})}
						error={errors.reason}
					/>
					<Frame direction="row" gap={18}>
						<Input
							label="Qual vaga tem interesse?"
							{...register('interest', {
								required: 'Por favor, responda',
							})}
							error={errors.interest}
						/>
						<Controller
							control={control}
							render={() => (
								<SelectComponent
									label="Tempo de experiência"
									options={timeExperienceOptions}
									onChange={(value) =>
										setValue('timeExperience', value.value)
									}
									error={errors.timeExperience}
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
					/>
					<Frame direction="row" gap={18}>
						<Button grow>CANCELAR</Button>
						<Button grow type="submit" primary>
							ENVIAR
						</Button>
					</Frame>
				</Frame>
			</Form>
		</Modal>
	);
};

export { SubsCriptionModal };
