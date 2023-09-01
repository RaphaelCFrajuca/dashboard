import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Style from '../Home/Home.styles';
import { EditLocationModal } from '../../components/Modals/EditLocationModal/EditLocationModal';
import { DeleteLocationModal } from '../../components/Modals/DeleteLocationModal/DeleteLocationModal';
import { useState } from 'react';

const Locations = () => {
  const [showmodal, setShowModal] = useState(false);
  return (
    <>
      <Style.PageContainer>
        <Sidebar></Sidebar>
        <Style.HeaderContentContainer>
          <Header />
          <Style.Content>
            <EditLocationModal
              showmodal={true}
              setShowModal={setShowModal}
              id={2}
            />
          </Style.Content>
        </Style.HeaderContentContainer>
      </Style.PageContainer>
    </>
  );
};

export default Locations;
