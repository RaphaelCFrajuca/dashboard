import { ReactNode } from 'react';
import { BasicButton, TextButton } from './Button.styles';

export type ButtonProps = {
  primary?: boolean;
  grow?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  style?: React.CSSProperties;
};
type IButton = { children: ReactNode; onClick?: () => void } & ButtonProps;

const Button = ({ children, ...props }: IButton) => {
  return (
    <BasicButton {...props}>
      <TextButton>{children}</TextButton>
    </BasicButton>
  );
};

export { Button };
