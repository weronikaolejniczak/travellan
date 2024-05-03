import ActionSheet from 'react-native-actions-sheet';
import React, { forwardRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './ActionSheetStyle';

const CustomActionSheet = ({ elements, header }, ref) => (
  <ActionSheet ref={ref}>
    <View style={styles.container}>
      {header && <Text>{header}</Text>}
      {Array.isArray(elements) &&
        elements.length > 0 &&
        elements.map((elem) => (
          <TouchableOpacity
            style={styles.button}
            onPress={elem.onPress}
            key={elem.id}
          >
            <Text style={styles.buttonText}>{elem.label}</Text>
          </TouchableOpacity>
        ))}
    </View>
  </ActionSheet>
);

export default forwardRef(CustomActionSheet);
