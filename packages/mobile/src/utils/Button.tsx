import React, { ReactNode, memo } from 'react';
import { Button } from 'react-native-paper';

import { Metrics } from 'constants';
import { ViewStyle } from 'react-native';
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

type PropsType = {
  children: ReactNode;
  disabled?: boolean;
  icon: IconSource;
  loading?: boolean;
  mode:
    | 'text'
    | 'contained'
    | 'outlined'
    | 'elevated'
    | 'contained-tonal'
    | undefined;
  onPress: () => void;
  style: ViewStyle;
};

const CustomButton = ({
  children,
  disabled,
  icon,
  loading,
  mode,
  onPress,
  style,
}: PropsType) => (
  <Button
    icon={icon}
    loading={loading}
    mode={mode || 'contained'}
    onPress={disabled ? undefined : onPress}
    style={{ ...Metrics.tinyMargin, ...style }}
  >
    {children}
  </Button>
);

export default memo(CustomButton);
