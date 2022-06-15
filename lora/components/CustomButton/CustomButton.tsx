import React from 'react';
import { ButtonProps } from '@mui/material/Button';
import { CustomButtonStyle } from './CustomButton.styles';

type CustomButtonProps = ButtonProps;

export const CustomButton = (props: CustomButtonProps) => {
  const { children } = props;

  return (
    <CustomButtonStyle {...props}>
      {children}
    </CustomButtonStyle>
  )
}