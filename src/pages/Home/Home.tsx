import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Style from './Home.styles';
import { useEffect } from 'react';
import { useSidebar } from '../../context/sidebarContext/SidebarContextProvider';

const Home = () => {
  const { setMaskPosition } = useSidebar();
  useEffect(() => {
    setMaskPosition ? setMaskPosition(0) : null;
  }, []);
  return (
    <>
      <Style.PageContainer>
        <Sidebar></Sidebar>
        <Header></Header>
        <Style.Content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non
            malesuada urna. Praesent tincidunt, justo et volutpat facilisis,
            mauris dolor ultricies sem, ut faucibus metus nulla sed magna.
          </p>
          <p>
            Vestibulum eget sem vel nulla lobortis aliquet. Nullam mattis nisl a
            consectetur aliquet. Curabitur eget neque urna. Etiam vulputate
            ultricies sem, ut convallis mauris fringilla sed.
          </p>
          <p>
            Proin accumsan enim sed est fringilla commodo. Duis non ipsum eget
            leo tincidunt efficitur. Aenean venenatis, lectus a ultricies
            consequat, elit mauris tempor nisl, vitae rutrum ligula odio non
            velit.
          </p>
          <p>
            Nullam auctor aliquam purus, ac fermentum est malesuada a. Sed non
            ante quam. Sed condimentum quam nec arcu blandit bibendum. Fusce eu
            diam risus.
          </p>

          <ul>
            <li>Phasellus tempor erat quis efficitur feugiat.</li>
            <li>Sed in fermentum mauris, ut viverra lorem.</li>
            <li>
              Nullam lacinia viverra turpis, sed luctus nisi efficitur in.
            </li>
            <li>Aliquam vel feugiat mi, sed commodo lacus.</li>
            <li>Donec finibus viverra arcu a fermentum.</li>
            <li>Nunc sed mi sed ex tempor dapibus.</li>
            <li>Aenean quis efficitur erat.</li>
            <li>
              Curabitur varius fringilla tellus, ut rutrum nibh ultricies vel.
            </li>
            <li>Integer auctor nulla nunc, ut dictum risus placerat in.</li>
          </ul>

          <p>
            Vestibulum eleifend augue in mauris dignissim, eu finibus enim
            dapibus. Etiam aliquet, velit non venenatis pellentesque, nisi odio
            congue lectus, sit amet hendrerit justo nulla id elit.
          </p>
          <p>
            Donec sed tellus ac turpis sagittis convallis. Pellentesque sed diam
            in felis tempor malesuada. Morbi consectetur tincidunt mauris, vitae
            fringilla ex.
          </p>
          <p>
            Sed pellentesque mauris eu mauris semper, a commodo risus commodo.
            Suspendisse ut sapien non mauris rhoncus hendrerit ut vel quam.
            Integer volutpat urna vel justo sollicitudin, in sagittis velit
            faucibus.
          </p>
          <p>
            Sed condimentum nisl in quam eleifend, a malesuada mi aliquet.
            Quisque ac feugiat dolor. Nulla facilisi. Nam faucibus aliquet
            libero nec feugiat. Curabitur id libero non dolor hendrerit auctor
            id et lacus.
          </p>
        </Style.Content>
      </Style.PageContainer>
    </>
  );
};

export default Home;
