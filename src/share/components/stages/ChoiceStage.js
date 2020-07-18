import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
/* IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../../app/constants/Colors';

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.setType(props.mode)}
      style={[
        styles.button,
        {
          backgroundColor:
            props.type === props.mode ? Colors.primary : Colors.transparent,
        },
      ]}>
      <Text style={[styles.text, styles.label]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const ChoiceStage = (props) => {
  return (
    <View style={[styles.centered, styles.dataContainer]}>
      <Text style={[styles.text, styles.header]}>The file contains my</Text>
      <View style={[styles.bigMarginTop, styles.choiceContainer]}>
        {/* ACCOMMODATION BUTTON */}
        <Button
          type={props.type}
          mode={'reservation'}
          setType={() => props.setType()}
          title={'housing reservation'}
        />
        {/* TRANSPORT BUTTON */}
        <Button
          type={props.type}
          mode={'transport'}
          setType={() => props.setType()}
          title={'transportation ticket'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    marginTop: '2%',
    marginBottom: '5%',
  },
  choiceContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: '2%',
    padding: '4%',
    borderRadius: 25,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.primary,
  },
  header: {
    fontSize: 18,
  },
  label: {
    fontSize: 16,
  },
  text: {
    color: Colors.text,
  },
  bigMarginTop: {
    marginTop: '5%',
  },
});

export default ChoiceStage;
