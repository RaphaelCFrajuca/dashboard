import * as Style from './Header.styles';
import { getLoggedUser } from '../../services/get-logged-user/get-logged-user-service';
import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth/AuthProvider';
import { useEffect, useContext, useState } from 'react';
import { useSidebar } from '../../context/sidebarContext/SidebarContextProvider';
import { ReactComponent as Down } from '../../assets/Icons/Downicons.svg';

const Header = () => {
  const { accessToken } = useAuth();
  const { isSidebarExpanded, setMaskPosition } = useSidebar();
  const [username, setUsernmae] = useState<string>('user');
  const [profilePhoto, setProfilePhoto] = useState<string>(
    'src/assets/profile.png'
  );
  const { data: user } = useQuery('user', () => getLoggedUser(accessToken), {
    refetchInterval: 5000,
  });
  useEffect(() => {
    setMaskPosition ? setMaskPosition(0) : null;
    if (user) {
      setUsernmae(user.nickname);
      setProfilePhoto(user.profilePhoto);
    }
  }, [user]);
  return (
    <Style.HeaderContainer isSidebarExpanded={isSidebarExpanded}>
      <h1>Dashboard</h1>
      <Style.UserContainer>
        <p>olá {username}</p>
        <Down color={'#241B5E'}></Down>
        <Style.UserPhoto src={profilePhoto} alt="user" />
      </Style.UserContainer>
    </Style.HeaderContainer>
  );
};

export default Header;
