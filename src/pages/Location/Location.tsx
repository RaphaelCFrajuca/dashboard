import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth/AuthProvider';
import { locationRequest } from '../../services/location/location-service';

interface LocationData {
  total_locations: number;
}

function Location() {
  const { accessToken } = useAuth();
  const { data, isLoading, isFetching } = useQuery<LocationData>(
    'location',
    () => locationRequest(accessToken),
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return (
    <>
      {isLoading && isFetching && <p>loading..</p>}
      <h1>{data?.total_locations}</h1>
    </>
  );
}

export default Location;
