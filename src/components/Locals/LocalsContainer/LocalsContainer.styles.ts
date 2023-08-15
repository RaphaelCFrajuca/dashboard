import styled from 'styled-components';

export const Container = styled.div`
  background: var(--neutros-50);
  padding: 16px 24px;
  border-radius: 2px;
  border: 1px solid red;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContentBody = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  border: 1px solid yellow;
`;

export const ContainerSearchFilterAdd = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: calc(20px);
  padding: 0 10px;
`;

export const SearchBox = styled.div`
  width: 60%;
  height: 2.5em;
  display: flex;
  align-items: center;
  padding: 0 5px;
  gap: calc(20px);
  border: 1px solid #b9b3da;
  border-radius: 0.3em;
`;

export const InputSearch = styled.input`
  width: 100%;

  border: none;
  font-size: 1.2em;
  &:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`;

export const FilterBox = styled.input`
  width: 20%;
  height: 3em;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #b9b3da;
  border-radius: 0.3em;
  background-color: #ffffff;
`;

export const ButtonAddBox = styled.div`
  width: 15%;
  height: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 600;
  background-color: #5c45ed;
  border: none;
  border-radius: 0.3em;
  cursor: pointer;
`;
export const LineGrey = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
  margin: 1.5em 0;
`;

export const ColumnAlphabet = styled.div`
  width: 4%;
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: linear-gradient(
    90deg,
    rgba(34, 19, 70, 1) 0%,
    rgba(58, 44, 136, 1) 49%,
    rgba(34, 19, 70, 1) 100%
  );
  gap: calc(5px);
  padding: 5px 0;
`;
