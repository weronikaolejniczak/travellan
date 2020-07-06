import React, {useState} from 'react';
import {View, ScrollView, Text, TouchableOpacity, FlatList} from 'react-native';
//import Icon from 'react-native-vector-icons/Ionicons';
/** IMPORTS FROM WITHIN THE MODULE */
//import Card from '../../Components/Atoms/Card';
import {budgetScreenStyle as styles} from './BudgetScreenStyle';
import Colors from '../../Constants/Colors';
import BUDGET from '../../Data/DummyBudget';

const BudgetScreen = (props) => {
  const activeCurrencies = BUDGET;
  const [selectedCurrency, setSelectedCurrency] = useState(activeCurrencies[0]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* HORIZONTAL FLATLIST OF CURRENCIES */}
      <View style={styles.currenciesContainer}>
        <FlatList
          horizontal
          data={activeCurrencies}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => setSelectedCurrency(item)}>
              <Text style={[styles.currency, {color: selectedCurrency.currency === item.currency ? Colors.primary : 'grey'}]}>
                {item.currency}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {/* CURRENCY OPERATIONS AND HISTORY */}
      {selectedCurrency && (
        <View style={styles.detailsContainer}>
          <Text style={styles.text}>{selectedCurrency.value}</Text>
          <Text style={styles.text}>{selectedCurrency.currency}</Text>
          {selectedCurrency.history.map((item) => (
            <View style={styles.justifyRow}>
              <Text style={styles.text}>Title: {item.title}</Text>
              <Text style={styles.text}>Value: {item.value}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default BudgetScreen;
