import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Style from '../Home/Home.styles';
import { EditLocationModal } from '../../components/EditLocationModal/EditLocationModal';
import { useState } from 'react';
import { ListLocation } from './components/ListLocation/ListLocation';

export function Locations() {
  const [showmodal, setShowModal] = useState(false);
  return (
    <>
      <Style.PageContainer>
        <Sidebar></Sidebar>
        <Style.HeaderContentContainer>
          <Header />
          <Style.Content>
            {/* <EditLocationModal showmodal={true} setShowModal={setShowModal} /> */}
          </Style.Content>
          <ListLocation />
        </Style.HeaderContentContainer>
      </Style.PageContainer>
    </>
  );
}
