import React, { memo } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './CurrencyPickerStyle';

const CurrencyPicker = ({
  currencies,
  selectedCurrency,
  handleSelectCurrency,
  handleDeleteCurrency,
}) => (
  <View style={styles.container}>
    <FlatList
      horizontal
      data={currencies}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.currencyBubble}
          onLongPress={() => handleDeleteCurrency(item.id)}
          onPress={() => handleSelectCurrency(item)}
        >
          <Text
            style={
              selectedCurrency.currency === item.currency
                ? styles.currencyActive
                : styles.currencyNonactive
            }
          >
            {item.currency}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  </View>
);

export default memo(CurrencyPicker);
