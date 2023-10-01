import React, { useState, useEffect, useRef } from 'react';
import { ImageContainer, ModalImageContainer } from './ModalImg.style';
import { ReactComponent as CloseIcon } from '../../assets/Icons/Closeicons.svg';
import { set } from 'react-hook-form';
import { ErrorMessage } from '../Input/Input.style';

interface ModalImgProps {
  src: string;
  onFileChange: (file: File) => void;
}

const ModalImg: React.FC<ModalImgProps> = ({ src, onFileChange }) => {
  const [srcImg, setSrcImg] = useState<string>('');
  const [InputErrorMessage, setInputErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hasError = !!InputErrorMessage;
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
      ];
      const maxSize = 5242880; // 5MB in bytes
      if (!allowedTypes.includes(selectedFile.type)) {
        setInputErrorMessage('Tipo de arquivo não permitido');
      } else if (selectedFile.size > maxSize) {
        setInputErrorMessage('Arquivo muito grande');
      } else if (event.target.files && event.target.files.length > 1)
        setInputErrorMessage('Selecione apenas uma imagem');
      else {
        setInputErrorMessage('');
        onFileChange(selectedFile);
        setSrcImg(URL.createObjectURL(selectedFile));
      }
    }
  };

  useEffect(() => {
    src ? setSrcImg(src) : setSrcImg('');
  }, [src]);
  return (
    <ModalImageContainer data-testid="modal-image-container">
      <ImageContainer hasError={hasError} srcImg={srcImg}>
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
              accept=".jpg, .jpeg, .png, .webp"
              multiple={false}
              onChange={handleFileInputChange}
              data-testid="file-input"
            />
            <CloseIcon
              style={{
                backgroundColor: hasError ? '#ffcdcd' : 'ece9fd',
                color: hasError ? '#ff0000' : '#3f3d56',
                padding: '5px',
                borderRadius: '50%',
                rotate: '-45deg',
              }}
              onClick={() => fileInputRef.current?.click()}
            ></CloseIcon>
          </>
        )}
      </ImageContainer>
      {hasError && (
        <ErrorMessage data-testid="input-error">
          {InputErrorMessage}
        </ErrorMessage>
      )}
    </ModalImageContainer>
  );
};

export default ModalImg;
