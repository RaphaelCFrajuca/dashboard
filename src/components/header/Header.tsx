import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth/AuthProvider';
import { useEffect, useState } from 'react'; // Importe apenas o useEffect e useState do 'react'.
import { useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../../services/get-logged-user/get-logged-user-service';
import { ReactComponent as Down } from '../../assets/Icons/Downicons.svg';
import profile from '../../assets/profile.png';
import * as Style from './Header.styles';
import { locationPendingValidationRequest } from '../../services/location/location-service';

const Header = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [username, setUsernmae] = useState<string>('user');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>(profile);
  const { data: user } = useQuery('user', () => getLoggedUser(accessToken), {
    refetchInterval: 50000,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const response = locationPendingValidationRequest(accessToken);
    console.log(response);
    if (user) {
      setUsernmae(user.nickname);
      setProfilePhoto(user.profilePhoto);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('refresh_token');
    setAccessToken('');
    setIsDropdownVisible(false);
    navigate('/login');
  };

  return (
    <Style.HeaderContainer>
      <h1>Dashboard</h1>
      <Style.UserContainer>
        <p>olá {username}</p>
        <Style.ButtonContainer>
          <Down
            color={'#241B5E'}
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          />
          {isDropdownVisible && (
            <Style.DropdownContent>
              <Style.LogoutButton onClick={handleLogout}>
                Sair
              </Style.LogoutButton>
            </Style.DropdownContent>
          )}
        </Style.ButtonContainer>
        <Style.UserPhoto data-testid="user-profile-pic" src={profilePhoto} />
      </Style.UserContainer>
    </Style.HeaderContainer>
  );
};

export default Header;
