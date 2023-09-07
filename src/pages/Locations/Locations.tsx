import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Style from '../Home/Home.styles';
import { ShowLocationModal } from '../../components/Modals/ShowLocationModal/ShowLocationModal';
import { EditLocationModal } from '../../components/Modals/EditLocationModal/EditLocationModal';
import { AddLocationModal } from '../../components/Modals/AddLocationModal/AddLocationModal';
import { useState } from 'react';
import { DeleteLocationModal } from '../../components/Modals/DeleteLocationModal/DeleteLocationModal';

const Locations = () => {
  const [showShowodal, setShowShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showdeleteModal, setShowdeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(2);
  return (
    <>
      <Style.PageContainer>
        <Sidebar></Sidebar>
        <Style.HeaderContentContainer>
          <Header />
          <Style.Content>
            <ShowLocationModal
              id={2}
              showmodal={showShowodal}
              setSelectedId={setSelectedId}
              setShowShowModal={setShowShowModal}
              setShowEditModal={setShowEditModal}
              setShowDeleteModal={setShowdeleteModal}
              setShowAddModal={setShowAddModal}
            />
            <EditLocationModal
              id={selectedId}
              showmodal={showEditModal}
              setShowModal={setShowEditModal}
            />
            <AddLocationModal
              showmodal={showAddModal}
              setShowModal={setShowAddModal}
            />
            <DeleteLocationModal
              showmodal={showdeleteModal}
              setShowModal={setShowdeleteModal}
            />
          </Style.Content>
          <button onClick={() =>setShowShowModal(true)}>modal de exibição</button>
          <button onClick={() =>setShowEditModal(true)}>modal de edição</button>
          <button  onClick={() =>setShowdeleteModal(true)}>modal de exclusão</button>
          <button onClick={() =>setShowAddModal(true)}>modal de adição</button>
        </Style.HeaderContentContainer>
      </Style.PageContainer>
    </>
  );
};

export default Locations;
