import { ReactNode } from 'react';
import { CloseIcon, Container, Content, Header } from './styled';
import { Frame } from '../../layout';

type IModal = {
	header?: ReactNode;
	children: ReactNode;
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ header, children, showModal, setShowModal }: IModal) => {
	return (
		<Container showModal={showModal}>
			<Content>
				<Header>
					<Frame direction="column" gap={4}>
						{header}
					</Frame>
					<CloseIcon onClick={() => setShowModal(false)}>
						<img
							src="close.svg"
							width={24}
							height={24}
							alt={'close icon'}
						/>
					</CloseIcon>
				</Header>
				{children}
			</Content>
		</Container>
	);
};

export { Modal };
