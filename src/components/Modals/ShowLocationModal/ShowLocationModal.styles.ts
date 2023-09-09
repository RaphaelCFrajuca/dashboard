import styled from 'styled-components';

export const TitleContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BelowTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  span{
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
  color: #241B5E;
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
  white-space:nowrap;
  
  :hover{
    overflow:visible;
    white-space:normal;
    -webkit-mask-image:"linear-gradient(90deg, #000,  100%, transparent)"
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
