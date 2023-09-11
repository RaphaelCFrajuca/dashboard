import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ReactComponent as BinIcon } from '../../../../assets/Icons/Binn.svg';
import { ReactComponent as TeamIcon } from '../../../../assets/Icons/Team.svg';
import * as Styled from './ListLocation.styles';
import { locationController } from '../../../../services/location/location-controller';
import { useAuth } from '../../../../context/auth/AuthProvider';
import imageList from '../../../../assets/image3.png';
import { Loading } from '../../../../components/Loading/Loading';
import { LocationList } from '../../../../services/location/all-location-service';
import { UseQueryResult } from 'react-query';

interface Props {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  locationList: UseQueryResult<LocationList, unknown>;
}
export function ListLocation({
  setSelectedId,
  setShowAddModal,
  setShowDeleteModal,
  setShowEditModal,
  setShowShowModal,
  locationList,
}: Props) {
  
  const [selectedLetter, setSelectedLetter] = useState('');

  const handleLetterChange = (letter: string) => {
    setSelectedLetter(letter);
  };

  if (locationList.isLoading) {
    return <Loading />;
  }

  const filteredLocations = locationList.data?.content?.filter(
    (location) =>
      selectedLetter === '' ||
      location.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
  );

  filteredLocations?.sort((a, b) => a.name.localeCompare(b.name));

  const handleOpenDeleteModal = (id: number | undefined) => {
    setShowDeleteModal(true);
    setSelectedId(id as number);
  };

  const handleOpenEditModal = (id: number | undefined) => {
    setSelectedId(id as number);
    setShowEditModal(true);
  };

  const handleOpenShowModal = (id: number | undefined) => {
    setSelectedId(id as number);
    setShowShowModal(true);
  };

  return (
    <Styled.Container>
      <Styled.FilterContainer>
        <Styled.FilterTitle>
          <button onClick={() => handleLetterChange('')}>todos</button>
          {Array.from({ length: 26 }, (_, index) => (
            <button
              key={index}
              onClick={() =>
                handleLetterChange(String.fromCharCode(65 + index))
              }
            >
              {String.fromCharCode(65 + index)}
            </button>
          ))}
        </Styled.FilterTitle>
      </Styled.FilterContainer>
      <Styled.LocationListContainer>
        <Styled.LocationHeader>Local</Styled.LocationHeader>
        {locationList.data?.content?.map((location, index) => (
          <div
            key={location.id}
          >
            {index === 0 ||
            location.name.charAt(0).toUpperCase() !==
              filteredLocations[index - 1].name.charAt(0).toUpperCase() ? (
              <Styled.LocationTitle>
                {location.name.charAt(0).toUpperCase()}
              </Styled.LocationTitle>
            ) : null}
            <Styled.LocationItemContainer onClick={() => handleOpenShowModal(location.id)}>
              <Styled.LocationImage src={imageList} />
              <Styled.LocationName>{location.name}</Styled.LocationName>
              <Styled.LocationStatusText>
                {location.isActive ? 'Aprovado' : 'Pendente'}
              </Styled.LocationStatusText>
              <Styled.LocationStatusIcon approved={location.isActive} />
              <Styled.EditButton
                onClick={() => handleOpenEditModal(location.id)}
              >
                <TeamIcon />
              </Styled.EditButton>
              <Styled.DeleteButton
                onClick={() => handleOpenDeleteModal(location.id)}
              >
                <BinIcon />
              </Styled.DeleteButton>
            </Styled.LocationItemContainer>
          </div>
        ))}
      </Styled.LocationListContainer>
    </Styled.Container>
  );
}