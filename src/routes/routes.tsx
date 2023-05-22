import { ReactNode } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import { useUser } from '../providers/UserProvider';
import { Home } from '../pages/Home';
interface ChildrenTypes {
	children: ReactNode;
}
// const Private = ({ children }: ChildrenTypes): JSX.Element => {
// 	const { user } = useUser();
// 	if (!user) {
// 		return <Navigate to="/home" />;
// 	}

// 	return (
// 		<div className="flex flex-col items-center w-full h-full">
// 			{children}
// 		</div>
// 	);
// };
const Public = ({ children }: ChildrenTypes): JSX.Element => {
	return <>{children}</>;
};

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/home" />} />
			<Route
				path="/home"
				element={
					<Public>
						<Home />
					</Public>
				}
			/>
			<Route
				path="*"
				element={<h1 className="text-white">Error 404</h1>}
			/>
		</Routes>
	);
};
console.log('Hellow');
