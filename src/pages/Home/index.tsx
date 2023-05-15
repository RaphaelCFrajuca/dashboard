import { useState } from 'react';
import { SubsCriptionModal } from '../../components/SubscriptionModal';
import { PageLayout } from '../../layout/page-layout';
import { DashboardService } from '../../services/dashboard/dashboad-service';

const Home = () => {
	const [showModal, setShowModal] = useState<boolean>(true);

	DashboardService.DashBoardLogin().then((response) => {
		if (response.isSuccess && response.result) {
			const authToken = response.result.token_jwt;
			DashboardService.GetNumberOfUsers({ authKey: authToken }).then(
				(response) => {
					if (response.isSuccess && response.result) {
						console.log(response.result);
					}
				},
			);
		}
	});

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
