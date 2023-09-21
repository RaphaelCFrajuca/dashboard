import React, { useState } from 'react';
import { ReactComponent as Filtericons } from '../../../../assets/Icons/Filtericons.svg';
import { ReactComponent as Downicons } from '../../../../assets/Icons/Downicons.svg';
import { ReactComponent as Searchicons } from '../../../../assets/Icons/Searchicons.svg';
import * as Styled from './SearchList.styles';

interface Props {
  onOpenAddModal: () => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchList({ onOpenAddModal, setSearchTerm }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Styled.Container>
      <Styled.Title>Locais</Styled.Title>
      <Styled.Content>
        <Styled.SearchInputContainer>
          <Searchicons width={24} height={24} />
          <Styled.SearchInput
            type="text"
            placeholder="Buscar"
            onChange={handleSearchInputChange}
          />
        </Styled.SearchInputContainer>
        <Styled.DropdownContainer onClick={handleDropdownToggle}>
          <Styled.DropdownButton>
            <Filtericons width={24} height={24} style={{ marginLeft: '8px' }} />
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
        <Styled.AddButton onClick={onOpenAddModal}>+ADD</Styled.AddButton>
      </Styled.Content>
    </Styled.Container>
  );
}
