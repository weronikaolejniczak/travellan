import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as categories from 'data/SpendingCategories';
import { styles } from './SpendingCategoriesStyle';

const SpendingCategories = ({ category, chooseCategory }) => (
  <>
    <View style={styles.header}>
      <Text style={styles.label}>Categories</Text>
      <Text style={styles.activeCategoryName}>
        {categories.categoryLabels[category].toString()}
      </Text>
    </View>
    <View style={styles.categoriesContainer}>
      {categories.icons.map((item) => (
        <TouchableOpacity
          key={item}
          style={styles.button}
          onPress={() => chooseCategory(item)}
        >
          <Icon
            name={item}
            style={[
              styles.icon,
              categories.categoryIcons[category] === item
                ? styles.activeCategory
                : styles.nonactiveCategory,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  </>
);

export default memo(SpendingCategories);
