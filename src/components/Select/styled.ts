import styled from 'styled-components';

type ISelect = { hasError?: boolean };

export const BasicSelect = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: 600;
	font-size: 14px;
	line-height: 21px;
	gap: 4px;
	width: 100%;
`;

export const LabelSelect = styled.div<ISelect>`
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
