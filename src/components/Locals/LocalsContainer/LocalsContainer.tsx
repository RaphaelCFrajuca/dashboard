import * as Style from './LocalsContainer.styles';
import searchIcon from '../../../assets/Icons/Searchicons.svg';
import filterIcon from '../../../assets/Icons/Filtericons.svg';
import React from 'react';

const alphabetList = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'X',
  'Y',
  'Z',
];

const LocalsContainer: React.FC<HTMLBodyElement> = () => {
  return (
    <Style.Container>
      <Style.Content>
        <Style.Title>Locais</Style.Title>
        <Style.ContainerSearchFilterAdd>
          <Style.SearchBox>
            <img src={searchIcon} />
            <Style.InputSearch placeholder="Buscar"></Style.InputSearch>
          </Style.SearchBox>
          <Style.FilterBox type=""></Style.FilterBox>
          <Style.ButtonAddBox>+ ADD</Style.ButtonAddBox>
        </Style.ContainerSearchFilterAdd>
      </Style.Content>
      <Style.LineGrey></Style.LineGrey>
      <Style.ContentBody>
        <Style.ColumnAlphabet>
          {alphabetList.map((letter, i) => (
            <div key={i}>{letter}</div>
          ))}
        </Style.ColumnAlphabet>
        <Style.BoxList>
          <Style.TopList>
            <Style.SpaceColumn>
              <Style.TitleColumn>Local</Style.TitleColumn>
            </Style.SpaceColumn>
            <Style.SpaceColumn>
              <Style.TitleColumn>Status</Style.TitleColumn>
            </Style.SpaceColumn>
          </Style.TopList>
          <Style.LineGrey></Style.LineGrey>
        </Style.BoxList>
      </Style.ContentBody>
    </Style.Container>
  );
};

export default LocalsContainer;
