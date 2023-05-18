import { login } from '../../services/login/login-service';
import { useForm } from 'react-hook-form';

import * as Styled from './Login.styles';

type FormValues = {
  username: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const doLogin = (formData: FormValues) => {
    const userData = {
      username: formData.username,
      password: formData.password,
    };

    login(userData);
  };

  return (
    <Styled.Container>
      <Styled.Form onSubmit={handleSubmit(doLogin)}>
        <Styled.Label>Email</Styled.Label>
        <Styled.Input
          data-testid="email"
          type="text"
          {...register('username', {
            required: 'Preencha o email',
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: 'Email inválido',
            },
          })}
          placeholder="username@email.com"
        />
        {errors.username && (
          <p className="errorMsg">
            {errors?.username && errors.username.message}
          </p>
        )}
        <Styled.Label>Password</Styled.Label>
        <Styled.Input
          data-testid="password"
          type="password"
          {...register('password', {
            required: true,
            validate: {
              checkLength: (value) => value.length >= 6,
            },
          })}
          placeholder="Deve conter pelo menos 6 caracteres"
        />
        {errors.password?.type === 'required' && (
          <p className="errorMsg">É necessário informar uma senha.</p>
        )}
        {errors.password?.type === 'checkLength' && (
          <p className="errorMsg">A senha deve ter pelo menos 6 caracteres.</p>
        )}
        <Styled.Button type="submit">Login</Styled.Button>
      </Styled.Form>
    </Styled.Container>
  );
};
