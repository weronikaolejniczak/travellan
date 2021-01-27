import React, { memo } from 'react';
import { Button } from 'react-native-paper';

import { Metrics } from 'constants';

const CustomButton = ({
  children,
  disabled,
  icon,
  loading,
  mode,
  onPress,
  style,
}) => (
  <Button
    icon={icon}
    loading={loading}
    mode={mode || 'contained'}
    onPress={!disabled && onPress}
    style={{ ...Metrics.tinyMargin, ...style }}
  >
    {children}
  </Button>
);

export default memo(CustomButton);
