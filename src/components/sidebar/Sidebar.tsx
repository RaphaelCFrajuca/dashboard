import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Styled from './Sidebar.styles';
import { ReactComponent as DoubleArrow } from '../../assets/Icons/icon-dublearrow-lefticons.svg';
import { ReactComponent as Home } from '../../assets/Icons/Home.svg';
import { ReactComponent as Places } from '../../assets/Icons/Places.svg';
import { ReactComponent as Reviews } from '../../assets/Icons/Reviews.svg';
import { ReactComponent as Users } from '../../assets/Icons/Users.svg';
import { ReactComponent as Project } from '../../assets/Icons/Project.svg';
import { ReactComponent as Volunteers } from '../../assets/Icons/Volunteers.svg';

const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(() =>
    Boolean(localStorage.getItem('isSidebarExpanded'))
  );
  const [maskPosition, setMaskPosition] = useState(
    () => Number(localStorage.getItem('setMaskPosition')) || 0
  );
  const location = useLocation();

  useEffect(() => {
    const pagePositions: { [key: string]: number } = {
      '': 0,
      lugares: 69,
      reviews: 138,
      usuarios: 207,
      projeto: 276,
      voluntarios: 345,
    };

    const currentPage = location.pathname.substring(1);
    const newPosition = pagePositions[currentPage] || 0;

    localStorage.setItem('setMaskPosition', String(newPosition));
    setMaskPosition(newPosition);
  }, [location.pathname]);

  const toggleSidebar = () => {
    const newValue = !isSidebarExpanded;
    localStorage.setItem('isSidebarExpanded', String(newValue));
    setIsSidebarExpanded(newValue);
  };

  return (
    <Styled.SidebarContainer isSidebarExpanded={isSidebarExpanded}>
      <button id="toggle" onClick={toggleSidebar}>
        <DoubleArrow />
      </button>
      <Styled.Logo isSidebarExpanded={isSidebarExpanded}>
        <img src="src/assets/logo.png" alt="logo" />
      </Styled.Logo>
      <Styled.SidebarMenu>
        <Styled.SidebarMask
          position={maskPosition}
          isSidebarExpanded={isSidebarExpanded}
        />
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/">
            <Home />
            <div>Home</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/lugares">
            <Places />
            <div>Lugares</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/reviews">
            <Reviews />
            <div>Reviews</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/usuarios">
            <Users />
            <div>Usuarios</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/projeto">
            <Project />
            <div>Projeto</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
        <Styled.SidebarMenuItem isSidebarExpanded={isSidebarExpanded}>
          <Styled.Links to="/voluntarios">
            <Volunteers />
            <div>Voluntários</div>
          </Styled.Links>
        </Styled.SidebarMenuItem>
      </Styled.SidebarMenu>
    </Styled.SidebarContainer>
  );
};

export default Sidebar;
