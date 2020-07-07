import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
/** IMPORTS FROM WITHIN THE MODULE */
import {AddCurrencyScreenStyles as styles} from './AddCurrencyScreenStyle';

const AddCurrency = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.elementContainer}>
        <Text style={styles.label}>Initial value</Text>
        <TextInput
          placeholder="Amount"
          placeholderTextColor="grey"
          style={styles.input}
          keyboardType={'numeric'}
        />
      </View>
      <View style={styles.elementContainer}>
        <Text style={styles.label}>Currency</Text>
        {/* PICKER */}
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
