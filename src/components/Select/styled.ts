import styled from 'styled-components';

type ISelect = { hasError?: boolean };

export const BasicSelect = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  gap: 4px;
  width: 100%;
`;

export const LabelSelect = styled.div<ISelect>`
  color: ${(props) => (props.hasError ? '#EB3D3D' : '#5b3cf1')};
  position: absolute;
  top: -12px;
  left: 8px;
  background-color: white;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  z-index: 1;
`;

export const ErrorMessage = styled.span`
  color: #eb3d3d;
  fontsize: 12;
  fontweight: '400';
`;
