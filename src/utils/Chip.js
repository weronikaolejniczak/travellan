import React from 'react';
import { Chip } from 'react-native-paper';

const CustomChip = ({
  children,
  disabled,
  icon,
  onClose,
  onPress,
  outlined,
  selected,
}) => (
  <Chip
    disabled={disabled}
    icon={icon}
    mode={outlined && 'outlined'}
    onClose={onClose}
    onPress={onPress}
    selected={selected}
  >
    {children}
  </Chip>
);

export default CustomChip;
