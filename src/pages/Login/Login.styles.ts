import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

export const Form = styled.form`
  width: 35rem;
`;

export const Input = styled.input`
  padding: 20px;
  margin: 20px 0px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;

  &::placeholder {
    color: #e3e1da;
  }
`;

export const Button = styled.button`
  background-color: #340a5e;
  color: white;
  padding: 20px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  width: 100%;
  font-size: 20px;

  &:hover {
    background-color: #460a82;
  }
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
`;
