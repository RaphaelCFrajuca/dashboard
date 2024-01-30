import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  margin-left: 12px;
  margin-right: 12px;
`;

export const DropdownButton = styled.button`
  background-color: #fff;
  color: #000;
  font-size: 12px;
  border: 1px solid #efecfd;

  border-radius: 4px;
  display: flex;
  line-height: 24px;
  display: flex;
  align-items: center;
  height: 34px;

  &.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

interface DowniconProps {
  isOpen: boolean;
}
export const DowniconsContainer = styled.svg<DowniconProps>`
  width: 24px;
  height: 24px;
  transition: transform 0.3s;
  margin-inline: 10px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const DropdownButtonTitle = styled.h1`
  color: var(--neutros-900, #190a33);
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-right: 33px;
  margin-left: 4px;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #efecfd;

  border-top: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
`;

export const DropdownButtonItem = styled.button`
  font-family: Poppins;
  font-size: 12px;
  border: 0;
  background: #fff;
  width: 100%;
  text-align: left;
  padding: 5px 10px;

  &:hover {
    background-color: #efecfd;
  }
`;
