import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Style from './Home.styles';
import { ChartLocationHome } from '../../components/Charts/ChartLocationHome/ChartLocationHome';

const Home = () => {
  return (
    <>
      <Style.PageContainer>
        <Sidebar></Sidebar>
        <Style.HeaderContentContainer>
          <Header />

          <Style.Content>
            <ChartLocationHome />
          </Style.Content>
        </Style.HeaderContentContainer>
      </Style.PageContainer>
    </>
  );
};

export default Home;
