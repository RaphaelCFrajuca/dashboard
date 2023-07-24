import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  position: absolute;
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
export const ButtonContainer = styled.button`
  display: flex;
  flex-direction: column;
  background: rgba(253, 252, 255, 0.5);
  border: none;
`;
export const DropdownContent = styled.button`
  border: none;
  background: rgba(253, 252, 255, 0.5);
`;

export const LogoutButton = styled.button`
  color: #241b5e;
  cursor: pointer;
  font-size: 16px;
  border: none;
`;