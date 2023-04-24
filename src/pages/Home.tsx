import { useEffect, useState } from 'react';
import fetchUsersBySexualOrientation from '../api/fetchUserBySexualOrientation';

const Home = () => {
  const [usersByOrientation, setUsersByOrientation] = useState([]);

  useEffect(() => {
    const response = fetchUsersBySexualOrientation();
    response.then((res) => setUsersByOrientation(res));
  }, []);

  return (
    <>
      <div>home</div>
      {usersByOrientation?.map((el) => (
        <div key={el.name}>
          <p>{el.name}</p>
          <p>{el.count}</p>
        </div>
      ))}
    </>
  );
};

export default Home;
