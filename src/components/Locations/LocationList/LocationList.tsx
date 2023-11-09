import React, { useState } from 'react';
import { Loading } from '../../Loading/Loading';
import { ILocationList } from '../../../services/location/all-location-service';
import { UseQueryResult } from 'react-query';
import { Pagination } from '../Pagination/Pagination';
import * as Styled from './LocationList.styles';
import { LocationItem } from '../LocationListItem/LocationListItem';

interface Props {
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedId: React.Dispatch<React.SetStateAction<number>>;
  locationList: UseQueryResult<ILocationList, unknown>;
  searchTerm: string;
}

export function LocationList({
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
              <ul>
                {visibleLocations?.map((location, index) => {
                  const isFirstItem =
                    index === 0 ||
                    location.name.charAt(0).toUpperCase() !==
                      (
                        visibleLocations[index - 1]?.name.charAt(0) || ''
                      ).toUpperCase();
                  return (
                    <LocationItem
                      key={location.id}
                      location={location}
                      onEdit={handleOpenEditModal}
                      onDelete={handleOpenDeleteModal}
                      onShow={handleOpenShowModal}
                      isFirstItem={isFirstItem}
                    />
                  );
                })}
              </ul>
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
