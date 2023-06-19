import styled from 'styled-components';

interface Props {
  isSidebarExpanded: boolean;
}

export const HeaderContainer = styled.header<Props>`
  width: ${(props) => (props.isSidebarExpanded ? '83vw' : '94.7vw ')};
  position: fixed;
  top: 0;
  right: 0;
  height: 116px;
  background-color: rgba(253, 252, 255, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  color: #9d8df4;
  padding-right: 52px;
  padding-left: 48px;
  box-sizing: border-box;
`;
export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  gap: 10px;
  font-family: 'Poppins', sans-serif;
  justify-content: space-between;
  gap: 15px;
  font-size: 22px;
  color: #241b5e;
  font-weight: 700;
`;
export const UserPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
