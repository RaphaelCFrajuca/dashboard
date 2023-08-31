import React, { useState, useEffect, useRef } from 'react';
import { ImageContainer } from './ModalImg.style';
import { ReactComponent as CloseIcon } from '../../assets/Icons/Closeicons.svg';
import { set } from 'react-hook-form';

interface ModalImgProps {
  src: string;
  onFileChange: (file: File) => void;
}

const ModalImg: React.FC<ModalImgProps> = ({ src, onFileChange }) => {
  const [srcImg, setSrcImg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      onFileChange(selectedFile);
      setSrcImg(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    src ? setSrcImg(src) : setSrcImg('');
  }, [src]);
  return (
    <ImageContainer srcImg={srcImg}>
      {srcImg ? (
        <div>
          <CloseIcon
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'white',
              padding: '5px',
              borderRadius: '50%',
            }}
            onClick={() => setSrcImg('')}
          ></CloseIcon>
          <img src={srcImg} alt="Image" />
        </div>
      ) : (
        <>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
          />
          <CloseIcon
            style={{
              backgroundColor: 'ece9fd',
              padding: '5px',
              borderRadius: '50%',
              rotate: '-45deg',
            }}
            onClick={() => fileInputRef.current?.click()}
          ></CloseIcon>
        </>
      )}
    </ImageContainer>
  );
};

export default ModalImg;
