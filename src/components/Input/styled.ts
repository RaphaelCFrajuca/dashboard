import styled from 'styled-components';

type IInput = { hasError?: boolean };

export const BasicInput = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: 600;
	font-size: 14px;
	line-height: 21px;
	gap: 4px;
	width: 100%;
`;

export const LabelInput = styled.div<IInput>`
	color: ${(props) => (props.hasError ? '#EB3D3D' : '#5b3cf1')};
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
`;

export const ErrorMessage = styled.span`
	color: #eb3d3d;
	fontsize: 12;
	fontweight: '400';
`;
