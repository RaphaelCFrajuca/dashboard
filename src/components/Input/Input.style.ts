import styled from 'styled-components';

type IInput = { hasError?: boolean };

export const BasicInput = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  gap: 4px;
  width: 100%;
`;

export const LabelInput = styled.label<IInput>`
  color: ${(props) => (props.hasError ? '#EB3D3D' : '#5b3cf1')};
  position: absolute;
  top: -12px;
  left: 8px;
  background-color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
`;

export const ErrorMessage = styled.span`
  color: #eb3d3d;
  font-size: 12;
  font-weight: '400';
`;
