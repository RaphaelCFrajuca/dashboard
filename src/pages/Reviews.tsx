import { useContext } from 'react';
import { AuthContext } from '../ContextProviders/AuthContext';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { reviewNumberRequest } from '../services/ReviewNumberRequest';

const Reviews = () => {
  const { accessToken } = useContext(AuthContext);
  const { data: reviews } = useQuery<number, AxiosError>(
    'reviews',
    () => reviewNumberRequest(accessToken),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <>
      <h1>{reviews}</h1>
    </>
  );
};

export default Reviews;
