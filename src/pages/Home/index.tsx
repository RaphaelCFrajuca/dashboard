import { useState } from 'react';
import { SubsCriptionModal } from '../../components/SubscriptionModal';
import { PageLayout } from '../../layout/page-layout';

const Home = () => {
	const [showModal, setShowModal] = useState<boolean>(true);

	return (
		<PageLayout>
			<SubsCriptionModal
				showmodal={showModal}
				setShowModal={setShowModal}
			/>
		</PageLayout>
	);
};

export { Home };
