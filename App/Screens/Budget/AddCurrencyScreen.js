import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
/** IMPORTS FROM WITHIN THE MODULE */
import {AddCurrencyScreenStyles as styles} from './AddCurrencyScreenStyle';
import CURRENCIES from '../../Data/Currencies';

const AddCurrency = (props) => {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  return (
    <View style={styles.container}>
      <View style={styles.elementContainer}>
        {/* INITIAL VALUE */}
        <Text style={styles.label}>Initial value</Text>
        <TextInput
          placeholder="Amount"
          placeholderTextColor="grey"
          style={styles.input}
          keyboardType={'numeric'}
          value={amount}
          onChange={(number) => setAmount(number)}
        />
      </View>
      <View style={styles.elementContainer}>
        <Text style={styles.label}>Currency</Text>
        {/* PICKER */}
        <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={() => {}} style={styles.picker}>
            <View style={{justifyContent: 'space-between'}}>
              <Text style={styles.pickerText}>{selectedCurrency}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.elementContainer}>
        <View style={{alignItems: 'center', margin: 20}}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddCurrency;
