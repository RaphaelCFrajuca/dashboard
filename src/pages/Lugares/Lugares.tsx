import LocalsContainer from '../../components/Locals/LocalsContainer/LocalsContainer';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import * as StyleImport from '../Home/Home.styles';

const Lugares = () => {
  return (
    <StyleImport.PageContainer>
      <Sidebar></Sidebar>
      <StyleImport.HeaderContentContainer>
        <Header />
        <StyleImport.Content>
          <LocalsContainer />
        </StyleImport.Content>
      </StyleImport.HeaderContentContainer>
    </StyleImport.PageContainer>
  );
};

export default Lugares;
