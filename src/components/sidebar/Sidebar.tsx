import * as Style from './Sidebar.styles';
import { ReactComponent as DoubleArrow } from '../../assets/Icons/icon-dublearrow-lefticons.svg';
import { ReactComponent as Home } from '../../assets/Icons/Home.svg';
import { ReactComponent as Places } from '../../assets/Icons/Places.svg';
import { ReactComponent as Reviews } from '../../assets/Icons/Reviews.svg';
import { ReactComponent as Users } from '../../assets/Icons/Users.svg';
import { ReactComponent as Project } from '../../assets/Icons/Project.svg';
import { ReactComponent as Volunteers } from '../../assets/Icons/Volunteers.svg';
import { useSidebar } from '../../context/sidebarContext/SidebarContextProvider';

const Sidebar = () => {
  const { isSidebarExpanded, toggleSidebar, maskPosition } = useSidebar();

  return (
    <>
      <Style.SidebarContainer isSidebarExpanded={isSidebarExpanded}>
        <button onClick={toggleSidebar}>
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
