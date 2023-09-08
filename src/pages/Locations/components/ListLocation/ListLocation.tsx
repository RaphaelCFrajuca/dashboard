import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ReactComponent as BinIcon } from '../../../../assets/Icons/Binn.svg';
import { ReactComponent as TeamIcon } from '../../../../assets/Icons/Team.svg';
import * as Styled from './ListLocation.styles';
import { locationController } from '../../../../services/location/location-controller';
import { useAuth } from '../../../../context/auth/AuthProvider';
import imageList from '../../../../assets/image3.png';
import { Loading } from '../../../../components/Loading/Loading';

interface LocationList {
  content: {
    id: number;
    name: string;
    isActive: boolean;
  }[];
}
interface Props {
  onOpenDeleteModal: () => void;
  onOpenEditModal: () => void;
}
export function ListLocation({ onOpenDeleteModal, onOpenEditModal }: Props) {
  const { accessToken } = useAuth();
  const { data, isLoading } = useQuery<LocationList>('location', () =>
    locationController(accessToken)
  );
  const [selectedLetter, setSelectedLetter] = useState('');

  const handleLetterChange = (letter: string) => {
    setSelectedLetter(letter);
  };

  if (isLoading) {
    return <Loading />;
  }

  const filteredLocations = data?.content?.filter(
    (location) =>
      selectedLetter === '' ||
      location.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
  );

  filteredLocations?.sort((a, b) => a.name.localeCompare(b.name));

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
        {filteredLocations?.map((location, index) => (
          <div key={location.id}>
            {index === 0 ||
            location.name.charAt(0).toUpperCase() !==
              filteredLocations[index - 1].name.charAt(0).toUpperCase() ? (
              <Styled.LocationTitle>
                {location.name.charAt(0).toUpperCase()}
              </Styled.LocationTitle>
            ) : null}
            <Styled.LocationItemContainer>
              <Styled.LocationImage src={imageList} />
              <Styled.LocationName>{location.name}</Styled.LocationName>
              <Styled.LocationStatusText>
                {location.isActive ? 'Aprovado' : 'Pendente'}
              </Styled.LocationStatusText>
              <Styled.LocationStatusIcon approved={location.isActive} />
              <Styled.EditButton onClick={onOpenEditModal}>
                <TeamIcon />
              </Styled.EditButton>
              <Styled.DeleteButton
                onClick={() => onOpenDeleteModal(location.id)}
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
