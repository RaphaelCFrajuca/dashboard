import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Style from '../Home/Home.styles';
import { AddLocationModal } from '../../components/Modals/AddLocationModal/AddLocationModal';
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
            <AddLocationModal
              showmodal={true}
              setShowModal={setShowModal}
            />
          </Style.Content>
        </Style.HeaderContentContainer>
      </Style.PageContainer>
    </>
  );
};

export default Locations;
