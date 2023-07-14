import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Style from './Home.styles';
import ChartLocation from '../../components/ChartLocation/ChartLocation';

const Home = () => {
  return (
    <>
      <Style.PageContainer>
        <Sidebar></Sidebar>
        <Style.HeaderContentContainer>
          <Header />

          <Style.Content>
            <ChartLocation />
          </Style.Content>
        </Style.HeaderContentContainer>
      </Style.PageContainer>
    </>
  );
};

export default Home;
