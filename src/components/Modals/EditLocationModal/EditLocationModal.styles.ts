import styled, { keyframes } from 'styled-components';

export const TitleContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.h4`
  font-size: 1.2em;
  font-weight: 600;
  color: #362e5d;
`;

export const CloseIcon = styled.div`
  position: absolute;
  right: 0px;
  cursor: pointer;
`;

// export const SuccessMessage = styled.h4`
//   color: green;
//   font-size: 16px;
//   margin-bottom: 10px;
//   text-align: center;

export const ErrorMessage = styled.h4`
  color: red;
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
`;

const fillAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

// Estiliza o contêiner que envolve a mensagem de sucesso e a barra de carregamento
export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// Estiliza a mensagem de sucesso
export const SuccessMessage = styled.div`
  font-size: 18px;
  color: green;
  margin-bottom: 16px;
`;

// Estiliza a barra de carregamento
export const LoadingBar = styled.div`
  width: 100%;
  height: 4px; /* Altura da barra de carregamento */
  background-color: #007bff; /* Cor de fundo da barra de carregamento */
  position: absolute;
  margin-bottom: 16px; /* Espaço entre a mensagem de sucesso e a barra de carregamento */

  &::before {
    content: '';
    display: block;
    height: 100%;
    background-color: #ccc; /* Cor de fundo antes do preenchimento */
    animation: ${fillAnimation} 2s linear forwards; /* Duração e animação */
  }
`;
