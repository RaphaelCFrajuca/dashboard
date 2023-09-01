// Loading.js
import React from 'react';
import * as Styled from './loading.styles';

export function Loading() {
  return (
    <Styled.SpinnerContainer data-testid="spinner-container">
      <Styled.Spinner data-testid="spinner" />
    </Styled.SpinnerContainer>
  );
}
