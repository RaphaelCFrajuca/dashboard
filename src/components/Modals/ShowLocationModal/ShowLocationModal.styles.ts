import styled from 'styled-components';

type LocationStatusProps = {
  approved: boolean;
};

export const TitleContainer = styled.div`
  min-width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BelowTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span {
    font-size: 12px;
    font-weight: 400;
  }
`;
export const EditDelete = styled.div`
  display: flex;
  flex-direction: row;
  color: #b9b3da;
`;

export const Title = styled.h4`
  font-size: 1.2em;
  font-weight: 700;
  color: #241b5e;
`;

export const CloseIcon = styled.div`
  position: absolute;
  right: 0px;
  cursor: pointer;
`;

export const PropertyName = styled.span`
  font-size: 8px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  min-width: 50%;
`;
export const PropertyValue = styled.span`
  color: #241b5e;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  white-space: nowrap;
  width: 80%;
  :hover {
    overflow: visible;
    white-space: normal;
    -webkit-mask-image: 'linear-gradient(90deg, #000,  100%, transparent)';
  }
`;

export const Property = styled.div`
  color: #b9b3da;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: space-between;
  width: 35%;

  padding: 0;
  margin: 0;
`;

export const LocationStatusIcon = styled.div<LocationStatusProps>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ approved }) => (approved ? '#2AF026' : '#FF9311')};
`;

export const StatusContainer = styled.div`
  width: 89px;
  height: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  border-radius: 43px;
  background-color: #f8f7ff;
  span {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.15px;
    text-align: left;
  }
`;

export const TextUnderTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 10px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  color: #b9b3da;
`;

export const Id = styled.div`
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  color: #190a33;
`;
