import React from 'react';
import { View } from 'react-native';

import { Chip } from 'utils';
import { styles } from './ChipGroupStyle';

const ChipGroup = ({ disabled, items, onPress, value }) => (
  <View>
    <View style={styles.wrapper}>
      {items &&
        Array.isArray(items) &&
        items.map((item) => (
          <Chip
            key={`chip-${item.value}`}
            disabled={disabled}
            icon={item.icon}
            onPress={() => onPress(item.value)}
            //selected={items.find()}
          >
            {item.label}
          </Chip>
        ))}
    </View>
  </View>
);

export default ChipGroup;
