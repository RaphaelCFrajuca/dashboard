import styled from 'styled-components';

interface LocationStatusProps {
  approved: boolean;
}

export const Container = styled.div`
  margin: 0 37px;
  background-color: #fdfcff;
`;

export const Content = styled.div`
  height: 666px;
  background-color: #fdfcff;
  display: flex;
  gap: 36px;
  overflow-y: auto;
  padding-top: 12px;
  margin-inline: 24px;

  ::-webkit-scrollbar {
    width: 12px;
    height: 197px;
  }
  ::-webkit-scrollbar-track {
    background: #efecfd;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background: #30009c;
  }
`;

export const FilterContainer = styled.div`
  button {
    border: 0;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    line-height: 250%;
    text-transform: uppercase;

    padding-bottom: 9px;

    color: #ffffff;
    background-color: #3f3384;
  }
`;
export const FilterTitle = styled.h1`
  display: flex;
  flex-direction: column;
  width: 60px;
`;

export const LocationListContainer = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

export const LocationTitle = styled.h1`
  color: #190a33;
  font-size: 12px;
  font-weight: 600;
  padding-bottom: 12px;
  margin-top: 12px;
  text-transform: uppercase;
  padding-top: 8px;
  border-top: 2px solid var(--neutros-200, #efecfd);
  background: var(--neutros-100, #faf9ff);

  padding-left: 24px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 48px;
  grid-column: span 12;
`;

export const TitleLocation = styled.h4``;

export const LocationItemContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-top: 1px solid var(--neutros-200, #efecfd);
  padding-left: 24px;
  height: 80px;
`;

export const LocationImage = styled.img`
  padding-right: 24px;
  width: auto;
  height: 80%;
  max-width: 90px;
`;

export const LocationName = styled.p`
  margin-right: auto;
  color: var(--neutros-900, #190a33);
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.15px;
  cursor: pointer;
`;

export const LocationHeader = styled.span`
  color: var(--primrias-100, #9d8df4);
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.15px;
  padding-left: 24px;
`;

export const LocationNameStatus = styled.span`
  margin-right: 23px;
  color: '#190A33';
  font-size: 12px;
`;

export const LocationStatusIcon = styled.div<LocationStatusProps>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 28px;
  background-color: ${({ approved }) => (approved ? '#2AF026' : '#FF9311')};
`;

export const LocationStatusText = styled.span`
  margin-right: 23px;
  color: '#190A33';
  font-size: 12px;
`;

export const EditButton = styled.button`
  background-color: #fdfcff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
`;

export const DeleteButton = styled.button`
  background-color: #fdfcff;
  color: white;
  padding-right: 8px;
  border: none;
  border-radius: 4px;
  margin-right: 14px;
`;