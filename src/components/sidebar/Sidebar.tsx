import * as Style from './Sidebar.styles';
import { ReactComponent as DoubleArrow } from '../../assets/Icons/icon-dublearrow-lefticons.svg';
import { ReactComponent as Home } from '../../assets/Icons/Home.svg';
import { ReactComponent as Places } from '../../assets/Icons/Places.svg';
import { ReactComponent as Reviews } from '../../assets/Icons/Reviews.svg';
import { ReactComponent as Users } from '../../assets/Icons/Users.svg';
import { ReactComponent as Project } from '../../assets/Icons/Project.svg';
import { ReactComponent as Volunteers } from '../../assets/Icons/Volunteers.svg';
import { useState } from 'react';
import { useEffect } from 'react';
const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(
    Boolean(localStorage.getItem('isSidebarExpanded'))
  );
  const [maskPosition, setMaskPosition] = useState<number>(
    localStorage.getItem('setMaskPosition') === null
      ? 0
      : Number(localStorage.getItem('setMaskPosition'))
  );

  useEffect(() => {
    const url = window.location.href;
    const lastIndex =  window.location.href.lastIndexOf('/');
    const page = url.slice(lastIndex + 1);
    switch (page) {
      case '':
        localStorage.setItem('setMaskPosition', '0')
        setMaskPosition(0);
        break;
      case 'lugares':
        isSidebarExpanded
          ? localStorage.setItem('setMaskPosition', '69')
          : localStorage.setItem('setMaskPosition', '50');
        isSidebarExpanded ? setMaskPosition(69) : setMaskPosition(50);

        break;
      case 'reviews':
        isSidebarExpanded
          ? localStorage.setItem('setMaskPosition', '138')
          : localStorage.setItem('setMaskPosition', '100');
        isSidebarExpanded ? setMaskPosition(138) : setMaskPosition(100);

        break;
      case 'usuarios':
        isSidebarExpanded
          ? localStorage.setItem('setMaskPosition', '207')
          : localStorage.setItem('setMaskPosition', '150');
        isSidebarExpanded ? setMaskPosition(207) : setMaskPosition(150);

        break;
      case 'projeto':
        isSidebarExpanded
          ? localStorage.setItem('setMaskPosition', '276')
          : localStorage.setItem('setMaskPosition', '200');
        isSidebarExpanded ? setMaskPosition(276) : setMaskPosition(200);

        break;
      case 'voluntarios':
        isSidebarExpanded
          ? localStorage.setItem('setMaskPosition', '345')
          : localStorage.setItem('setMaskPosition', '250');
        isSidebarExpanded ? setMaskPosition(345) : setMaskPosition(250);

        break;
      default:
        setMaskPosition(0);
        break;
    }
  }, [window.location.href, isSidebarExpanded]);

  const toggleSidebar = () => {
    isSidebarExpanded
      ? localStorage.setItem('isSidebarExpanded', '')
      : localStorage.setItem('isSidebarExpanded', 'true');
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <>
      <Style.SidebarContainer isSidebarExpanded={isSidebarExpanded}>
        <button id="toggle"  onClick={toggleSidebar}>
          <DoubleArrow />{' '}
        </button>
        <Style.Logo isSidebarExpanded={isSidebarExpanded}>
          <img src="src/assets/logo.png" alt="logo" />
        </Style.Logo>
        <Style.SidebarMenu>
          <Style.SidebarMask
            position={maskPosition ? maskPosition : 0}
            isSidebarExpanded={isSidebarExpanded}
          ></Style.SidebarMask>
          <Style.SidebarMenuItem
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => window.location.assign('/')}
          >
            <Home />
            <div>Home</div>
          </Style.SidebarMenuItem>
          <Style.SidebarMenuItem
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => window.location.assign('/lugares')}
          >
            <Places />
            <div>Lugares</div>
          </Style.SidebarMenuItem>
          <Style.SidebarMenuItem
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => window.location.assign('/reviews')}
          >
            <Reviews />
            <div>Reviews</div>
          </Style.SidebarMenuItem>
          <Style.SidebarMenuItem
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => window.location.assign('/usuarios')}
          >
            <Users />
            <div>Usuarios</div>
          </Style.SidebarMenuItem>
          <Style.SidebarMenuItem
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => window.location.assign('/projeto')}
          >
            <Project />
            <div>Projeto</div>
          </Style.SidebarMenuItem>
          <Style.SidebarMenuItem
            isSidebarExpanded={isSidebarExpanded}
            onClick={() => window.location.assign('/voluntarios')}
          >
            <Volunteers />
            <div>Voluntários</div>
          </Style.SidebarMenuItem>
        </Style.SidebarMenu>
      </Style.SidebarContainer>
    </>
  );
};
export default Sidebar;
