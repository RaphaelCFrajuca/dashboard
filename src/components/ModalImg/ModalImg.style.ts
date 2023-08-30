import styled from 'styled-components';

interface ImageContainerProps {
  srcImg: string;
}

export const ImageContainer = styled.div<ImageContainerProps>`
  width: 100%;
  aspect-ratio: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => (props.srcImg ? 'none' : '1px dashed #9D8DF4')};
  img {
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
  div {
    position: relative;
  }
  input {
    display: none;
  }
`;
