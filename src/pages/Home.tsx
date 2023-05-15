import { useEffect, useState } from 'react';
import fetchUsersBySexualOrientation from '../api/fetchUserBySexualOrientation';

const Home = () => {
  const [usersByOrientation, setUsersByOrientation] = useState([]);

  useEffect(() => {
    const response = fetchUsersBySexualOrientation();
    response.then((res) => console.log(res));
  }, []);

  return (
    <>
      <div>home</div>
    </>
  );
};

export default Home;
