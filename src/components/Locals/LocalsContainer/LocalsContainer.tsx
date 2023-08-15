import * as Style from './LocalsContainer.styles';
import searchIcon from '../../../assets/Icons/Searchicons.svg';
import filterIcon from '../../../assets/Icons/Filtericons.svg';

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

const LocalsContainer = () => {
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
        <div>hello</div>
      </Style.ContentBody>
    </Style.Container>
  );
};

export default LocalsContainer;
