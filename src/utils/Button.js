import React from 'react';
import { Button } from 'react-native-paper';
import { Metrics } from 'constants';

const CustomButton = (props) => {
  const { children, disabled, icon, loading, mode, onPress } = props;

  return (
    <Button
      icon={icon}
      loading={loading}
      mode={mode || 'contained'}
      onPress={!disabled && onPress}
      style={{ ...Metrics.tinyMargin }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
