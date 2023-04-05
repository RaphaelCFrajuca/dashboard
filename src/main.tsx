/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
