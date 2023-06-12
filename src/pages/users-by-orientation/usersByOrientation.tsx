import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../../ContextProviders/AuthContext';
import fetchUsersBySexualOrientation from '../../services/user-by-orientation/fetchUserBySexualOrientation';

export const UserByOrientation = () => {
  const { accessToken } = useContext(AuthContext);
  const { data, isError, isLoading } = useQuery(['user-orientation'], () =>
    fetchUsersBySexualOrientation(
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpYXQiOjE2ODY1OTI0NDYsImV4cCI6MTY4NjU5MzM0Nn0.yqlcqCMB6iTfS9Vz5f3JH4RYj2oJg_XqURTlqvfZzv2NOvFwR6yylFQ4XBGs3tcfIBb-uflgPpQycSJwEimfwA'
    )
  );

  if (isError === false && isLoading === false) {
    return (
      <>
        <h1>{data[0].name}</h1>
      </>
    );
  } else {
    return <h1>Carregando...</h1>;
  }
};
