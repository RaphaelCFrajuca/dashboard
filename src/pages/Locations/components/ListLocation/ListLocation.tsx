import React, { useState } from 'react';
import { ReactComponent as BinIcon } from '../../../../assets/Icons/Binn.svg';
import { ReactComponent as TeamIcon } from '../../../../assets/Icons/Team.svg';
import * as Styled from './ListLocation.styles';
import { useQuery } from 'react-query';
import imageList from '../../../../assets/image3.png';
import { Loading } from '../../../../components/Loading/Loading';
import { LocationList } from '../../../../services/location/all-location-service';
import { UseQueryResult } from 'react-query';
import { Pagination } from '../Pagination/Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Mova a declaração de filteredLocations para antes de usá-la
  const filteredLocations = locationList.data?.content?.filter(
    (location) =>
      selectedLetter === '' ||
      location.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
  );

  filteredLocations?.sort((a, b) => a.name.localeCompare(b.name));

  // Calcular o índice inicial e final dos itens visíveis
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleLocations = filteredLocations?.slice(startIndex, endIndex);

  const handleLetterChange = (letter: string) => {
    setSelectedLetter(letter);
    setCurrentPage(1); // Resetar a página para 1 quando a letra é alterada
  };

  if (locationList.isLoading) {
    return <Loading />;
  }

  // Calcular o número total de páginas
  const totalPages = Math.ceil((filteredLocations?.length || 0) / itemsPerPage);

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
      <Styled.Content>
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
          {visibleLocations?.map((location, index) => (
            <div key={location.id}>
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
                <Styled.LocationImage src={imageList} />
                <Styled.LocationName
                  onClick={() => handleOpenShowModal(location.id)}
                >
                  {location.name}
                </Styled.LocationName>
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
      </Styled.Content>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={totalPages}
      />
    </Styled.Container>
  );
}
