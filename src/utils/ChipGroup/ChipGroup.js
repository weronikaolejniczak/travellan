import React from 'react';
import { View } from 'react-native';

import { Chip } from 'utils';
import { styles } from './ChipGroupStyle';

const ChipGroup = ({
  disabled,
  isSelected,
  items,
  onClose,
  onPress,
  value,
}) => (
  <View>
    <View style={styles.wrapper}>
      {items &&
        Array.isArray(items) &&
        items.map((item) => (
          <Chip
            key={`chip-${item.value}`}
            disabled={disabled}
            icon={item.icon}
            onClose={() => onClose(item.value)}
            onPress={() => onPress(item.value)}
            selected={() => isSelected(item.value)}
          >
            {item.label}
          </Chip>
        ))}
    </View>
  </View>
);

export default ChipGroup;
