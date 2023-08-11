import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import * as Style from './Lugares.styles';

const Lugares = () => {
  return (
    <Style.PageContainer>
      <Sidebar></Sidebar>
      <Style.HeaderContentContainer>
        <Header />
      </Style.HeaderContentContainer>
    </Style.PageContainer>
  );
};

export default Lugares;
