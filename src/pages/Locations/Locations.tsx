import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Style from '../Home/Home.styles';
import { AddLocationModal } from '../../components/Modals/AddLocationModal/AddLocationModal';
import { useState } from 'react';
import { ListLocation } from './components/ListLocation/ListLocation';
import { SearchList } from './components/SearchList/SearchList';
import { DeleteLocationModal } from '../../components/Modals/DeleteLocationModal/DeleteLocationModal';
import { EditLocationModal } from '../../components/Modals/EditLocationModal/EditLocationModal';

export const Locations = () => {
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
  const [isDeleteLocationModalOpen, setIsDeleteLocationModalOpen] =
    useState(false);
  const [isEditLocationModalOpen, setIsEditLocationModalOpen] = useState(false);

  const handleAddLocationClick = () => {
    setIsAddLocationModalOpen(true);
  };
  const handleDeleteLocationClick = () => {
    setIsDeleteLocationModalOpen(true);
  };
  const handleEditLocationClick = () => {
    setIsEditLocationModalOpen(true);
  };

  return (
    <>
      <Style.PageContainer>
        <Sidebar></Sidebar>
        <Style.HeaderContentContainer>
          <Header />
          <Style.Content>
            <SearchList onOpenModal={handleAddLocationClick} />
            <ListLocation
              onOpenDeleteModal={handleDeleteLocationClick}
              onOpenEditModal={handleEditLocationClick}
            />
            <AddLocationModal
              showmodal={isAddLocationModalOpen}
              setShowModal={setIsAddLocationModalOpen}
            />
            <DeleteLocationModal
              showmodal={isDeleteLocationModalOpen}
              setShowModal={setIsDeleteLocationModalOpen}
            />
            <EditLocationModal
              showmodal={isEditLocationModalOpen}
              setShowModal={setIsEditLocationModalOpen}
              id={1}
            />
          </Style.Content>
        </Style.HeaderContentContainer>
      </Style.PageContainer>
    </>
  );
};
