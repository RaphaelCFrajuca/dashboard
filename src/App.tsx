import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/routes';
import './index.css';

export const App = () => {
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	);
};
