import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth/AuthProvider';
import { reviewNumberRequest } from '../../services/review-number/review-number-service';

const Reviews = () => {
  const { accessToken } = useAuth();
  const { data: reviews } = useQuery<number>(
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
