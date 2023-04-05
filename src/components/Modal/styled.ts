import styled from 'styled-components';

export type ModalProps = {
	showModal: boolean;
};

export const Container = styled.div<ModalProps>`
	width: 100%;
	min-height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	display: ${(props) => (props.showModal ? 'flex' : 'none')};
	justify-content: center;
	align-items: center;
	background: rgba(24, 29, 32, 0.1);
	backdrop-filter: blur(8px);
	padding-top: 32px;
	padding-bottom: 32px;
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px;
	width: 100%;
	max-width: 640px;
	border-radius: 12px;
	background-color: #ffffff;
`;

export const Header = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 20px;
`;

export const CloseIcon = styled.div`
	position: absolute;
	right: 0px;
	cursor: pointer;
`;
