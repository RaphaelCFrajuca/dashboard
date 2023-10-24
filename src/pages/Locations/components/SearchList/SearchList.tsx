import React, { useState } from 'react';
import { ReactComponent as Filtericons } from '../../../../assets/Icons/Filtericons.svg';
import { ReactComponent as Downicons } from '../../../../assets/Icons/Downicons.svg';
import { ReactComponent as Searchicons } from '../../../../assets/Icons/Searchicons.svg';
import * as Styled from './SearchList.styles';

interface Props {
  onOpenAddModal: () => void;
}

export function SearchList({ onOpenAddModal }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Searchicons width={24} height={24} />
          <Styled.SearchInput
            type="text"
            placeholder="Buscar"
            onChange={handleSearchInputChange}
          />
        </div>
        <Styled.DropdownContainer onClick={handleDropdownToggle}>
          <Styled.DropdownButton>
            <Filtericons width={24} height={24} style={{ marginLeft: '8px' }} />
            <Styled.DropdownButtonTitle>Filtrar</Styled.DropdownButtonTitle>
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
