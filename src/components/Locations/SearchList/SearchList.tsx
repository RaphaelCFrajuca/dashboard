import React, { useState } from 'react';
import { ReactComponent as FilterIcon } from '../../../assets/Icons/Filtericons.svg';
import { ReactComponent as DownIcon } from '../../../assets/Icons/Downicons.svg';
import { ReactComponent as SearchIcon } from '../../../assets/Icons/SearchIcon.svg';
import * as Styled from './SearchList.styles';

interface Props {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export function SearchList({ setShowAddModal, setSearchTerm }: Props) {
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
          <Styled.IconContainer>
            <SearchIcon width={24} height={24} />
          </Styled.IconContainer>
          <Styled.SearchInput
            type="text"
            placeholder="Buscar"
            onChange={handleSearchInputChange}
          />
        </Styled.SearchInputContainer>
        <Styled.DropdownContainer onClick={handleDropdownToggle}>
          <Styled.DropdownButton>
            <FilterIcon width={24} height={24} style={{ marginLeft: '8px' }} />
            <Styled.DropdownButtonTitle>Filtro</Styled.DropdownButtonTitle>
            <Styled.DowniconsContainer isOpen={false}>
              <DownIcon width={24} height={24} />
            </Styled.DowniconsContainer>
          </Styled.DropdownButton>
          {isDropdownOpen && (
            <Styled.DropdownMenu>
              <Styled.DropdownButtonItem>Filtro 1</Styled.DropdownButtonItem>
              <Styled.DropdownButtonItem>Filtro 2</Styled.DropdownButtonItem>
            </Styled.DropdownMenu>
          )}
        </Styled.DropdownContainer>
        <Styled.AddButton onClick={() => setShowAddModal(true)}>
          +ADD
        </Styled.AddButton>
      </Styled.Content>
    </Styled.Container>
  );
}
