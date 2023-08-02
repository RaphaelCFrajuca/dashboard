import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import { ChartLocationHome } from '../../components/Charts/ChartLocationHome/ChartLocationHome';
import { ChartUserHome } from '../../components/Charts/ChartUserHome/ChartUserHome';
import * as Style from './Home.styles';

const Home = () => {
  return (
    <>
      <Style.PageContainer>
        <Sidebar></Sidebar>
        <Style.HeaderContentContainer>
          <Header />

          <Style.Content>
            <ChartUserHome />
            <Style.Whapper>
              <ChartLocationHome />
              {/* Adicionar o grafico de review aqui, com width: 730px; */}
            </Style.Whapper>
          </Style.Content>
        </Style.HeaderContentContainer>
      </Style.PageContainer>
    </>
  );
};

export default Home;
