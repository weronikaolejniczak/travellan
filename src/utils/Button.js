import React from 'react';
import { Button } from 'react-native-paper';

const CustomButton = (props) => {
  const { children, disabled, icon, loading, mode, onPress } = props;

  return (
    <Button icon={icon} loading={loading} mode={mode || "contained"} onPress={!disabled && onPress}>
      {children}
    </Button>
  );
};

export default CustomButton;
