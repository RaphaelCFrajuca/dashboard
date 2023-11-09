/* eslint-disable @typescript-eslint/no-explicit-any */
// LocationItem.tsx
import React from 'react';
import * as Styled from './LocationListItem.styles';
import { ReactComponent as BinIcon } from '../../../assets/Icons/Bin.svg';
import { ReactComponent as TeamIcon } from '../../../assets/Icons/Team.svg';
import imageList from '../../../assets/imageList.png';

export type ILocationItemProps = {
  location: {
    id: number;
    name: string;
    imgUrl?: string;
    pendingValidation: boolean;
  };
  onEdit: (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onShow: (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isFirstItem: boolean;
};

export type ILocationItemLI = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

export const LocationItem: React.FC<ILocationItemProps & ILocationItemLI> = ({
  location,
  onEdit,
  onDelete,
  onShow,
  isFirstItem,
  ...liProps
}) => {
  return (
    <li {...liProps} onClick={(e: any) => onShow(location.id, e)}>
      {isFirstItem && (
        <Styled.LocationTitle>
          {location.name.charAt(0).toUpperCase()}
        </Styled.LocationTitle>
      )}
      <Styled.LocationItemContainer>
        <Styled.LocationImageContainer>
          <Styled.LocationImage
            src={location.imgUrl ? location.imgUrl : imageList}
          />
        </Styled.LocationImageContainer>
        <Styled.LocationName>{location.name}</Styled.LocationName>
        <Styled.LocationStatusText>
          {location.pendingValidation ? 'Pendente' : 'Aprovado'}
        </Styled.LocationStatusText>
        <Styled.LocationStatusIcon approved={!location.pendingValidation} />
        <Styled.EditButton onClick={(e: any) => onEdit(location.id, e)}>
          <TeamIcon />
        </Styled.EditButton>
        <Styled.DeleteButton onClick={(e: any) => onDelete(location.id, e)}>
          <BinIcon />
        </Styled.DeleteButton>
      </Styled.LocationItemContainer>
    </li>
  );
};

