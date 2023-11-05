import React, { useState } from 'react';
import { Loading } from '../../../../components/Loading/Loading';
import { LocationList } from '../../../../services/location/all-location-service';
import { UseQueryResult } from 'react-query';
import { Pagination } from '../Pagination/Pagination';
import { ReactComponent as BinIcon } from '../../../../assets/Icons/Bin.svg';
import { ReactComponent as TeamIcon } from '../../../../assets/Icons/Team.svg';
import imageList from '../../../../assets/imageList.png';
import * as Styled from './ListLocation.styles';

interface Props {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  locationList: UseQueryResult<LocationList, unknown>;
  searchTerm: string;
}

export function ListLocation({
  setSelectedId,
  setShowDeleteModal,
  setShowEditModal,
  setShowShowModal,
  locationList,
  searchTerm,
}: Props) {
  const [selectedLetter, setSelectedLetter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const filteredLocations = locationList.data?.content?.filter(
    (location) =>
      (selectedLetter === '' ||
        location.name.toLowerCase().startsWith(selectedLetter.toLowerCase())) &&
      (searchTerm === '' ||
        location.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil((filteredLocations?.length || 0) / itemsPerPage);
  filteredLocations?.sort((a, b) => a.name.localeCompare(b.name));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleLocations = filteredLocations?.slice(startIndex, endIndex);

  if (locationList.isLoading) {
    return <Loading />;
  }

  const handleLetterChange = (letter: string) => {
    setSelectedLetter(letter);
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  const handleOpenDeleteModal = (
    id: number | undefined,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSelectedId(id as number);
    setShowDeleteModal(true);
  };
  const handleOpenEditModal = (
    id: number | undefined,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSelectedId(id as number);
    setShowEditModal(true);
  };

  const handleOpenShowModal = (id: number | undefined) => {
    setSelectedId(id as number);
    setShowShowModal(true);
  };

  return (
    <Styled.Container>
      <Styled.ContentContainer>
        <Styled.FilterContainer>
          <Styled.FilterTitle>
            {Array.from({ length: 26 }, (_, index) => (
              <li
                key={index}
                onClick={() =>
                  handleLetterChange(String.fromCharCode(65 + index))
                }
              >
                {String.fromCharCode(65 + index)}
              </li>
            ))}
          </Styled.FilterTitle>
        </Styled.FilterContainer>
        <Styled.Content>
          <Styled.LocationListContainer>
            <Styled.LocationHeader>Local</Styled.LocationHeader>
            {visibleLocations?.map((location, index) => (
              <div
                key={location.id}
                onClick={() => handleOpenShowModal(location.id)}
              >
                {index === 0 ||
                location.name.charAt(0).toUpperCase() !==
                  (
                    visibleLocations[index - 1]?.name.charAt(0) || ''
                  ).toUpperCase() ? (
                  <Styled.LocationTitle>
                    {location.name.charAt(0).toUpperCase()}
                  </Styled.LocationTitle>
                ) : null}
                <Styled.LocationItemContainer>
                  <Styled.LocationImage
                    src={location.imgUrl ? location.imgUrl : imageList}
                  />
                  <Styled.LocationName>{location.name}</Styled.LocationName>
                  <Styled.LocationStatusText>
                    {location.pendingValidation ? 'Pendente' : ' Aprovado'}
                  </Styled.LocationStatusText>
                  <Styled.LocationStatusIcon
                    approved={!location.pendingValidation}
                  />
                  <Styled.EditButton
                    onClick={(e) => handleOpenEditModal(location.id, e)}
                  >
                    <TeamIcon />
                  </Styled.EditButton>
                  <Styled.DeleteButton
                    onClick={(e) => handleOpenDeleteModal(location.id, e)}
                  >
                    <BinIcon />
                  </Styled.DeleteButton>
                </Styled.LocationItemContainer>
              </div>
            ))}
          </Styled.LocationListContainer>
        </Styled.Content>
      </Styled.ContentContainer>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
      />
    </Styled.Container>
  );
}
