import React, { useState } from 'react';
import { ReactComponent as Filtericons } from '../../../../assets/Icons/Filtericons.svg';
import { ReactComponent as Downicons } from '../../../../assets/Icons/Downicons.svg';
import { ReactComponent as Search2 } from '../../../../assets/Icons/Search2.svg';
import * as Styled from './SearchList.styles';

interface Props {
  onOpenModal: () => void;
}

export function SearchList({ onOpenModal }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <Styled.Container>
      <Styled.Title>Locais</Styled.Title>
      <Styled.Content>
        <Styled.SearchInput type="text" placeholder="Buscar" />
        <Styled.DropdownContainer onClick={handleDropdownToggle}>
          <Styled.DropdownButton>
            <Filtericons width={24} height={24} />
            <Styled.DropdownButtonTitle>Filtro</Styled.DropdownButtonTitle>
            <Styled.DowniconsContainer isOpen={false}>
              <Downicons width={24} height={24} />
            </Styled.DowniconsContainer>
          </Styled.DropdownButton>
          {isDropdownOpen && (
            <Styled.DropdownMenu>
              <Styled.DropdownButtonItem>Filtro 1</Styled.DropdownButtonItem>
              <Styled.DropdownButtonItem>Filtro 2</Styled.DropdownButtonItem>
            </Styled.DropdownMenu>
          )}
        </Styled.DropdownContainer>
        <Styled.AddButton onClick={onOpenModal}>+ADD</Styled.AddButton>
      </Styled.Content>
    </Styled.Container>
  );
}
