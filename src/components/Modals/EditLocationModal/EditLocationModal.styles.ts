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

const fillAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

// Estiliza a barra de carregamento
export const LoadingBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #007bff;
  position: absolute;
  margin-bottom: 16px;

  &::before {
    content: '';
    display: block;
    height: 100%;
    background-color: #ccc;
    animation: ${fillAnimation} 2s linear forwards;
  }
`;
