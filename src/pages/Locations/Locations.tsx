import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import * as Style from '../Home/Home.styles';
import { ShowLocationModal } from '../../components/Modals/ShowLocationModal/ShowLocationModal';
import { EditLocationModal } from '../../components/Modals/EditLocationModal/EditLocationModal';
import { AddLocationModal } from '../../components/Modals/AddLocationModal/AddLocationModal';
import { useEffect, useState} from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../../context/auth/AuthProvider';
import { DeleteLocationModal } from '../../components/Modals/DeleteLocationModal/DeleteLocationModal';
import { ListLocation } from './components/ListLocation/ListLocation';
import  {LocationList, getAllLocations}  from '../..../../../services/location/all-location-service';


const Locations = () => {
  const [showShowodal, setShowShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showdeleteModal, setShowdeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const { accessToken } = useAuth();

  const locationList = useQuery<LocationList>('locationList', () =>
    getAllLocations(accessToken)
  );

  console.log(locationList.data);

  useEffect(() => {
    if (!showShowodal && !showEditModal && !showdeleteModal && !showAddModal)
      locationList.refetch();
  }, [showShowodal, showEditModal, showdeleteModal, showAddModal]);

  return (
    <>
      <Style.PageContainer>
        <Sidebar></Sidebar>
        <Style.HeaderContentContainer>
          <Header />
          <Style.Content>
            <ListLocation
              setShowShowModal={setShowShowModal}
              setShowEditModal={setShowEditModal}
              setShowAddModal={setShowAddModal}
              setShowDeleteModal={setShowdeleteModal}
              setSelectedId={setSelectedId}
              locationList={locationList}
            />
            <ShowLocationModal
              showmodal={showShowodal}
              setShowModal={setShowShowModal}
              setShowEditModal={setShowEditModal}
              id={selectedId}
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
        </Style.HeaderContentContainer>
      </Style.PageContainer>
    </>
  );
};

export default Locations;
