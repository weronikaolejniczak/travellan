import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/* IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../../app/constants/Colors';

/* ICONS */
const CloseIcon = (props) => {
  return (
    <TouchableOpacity onPress={() => props.close()}>
      <Icon name={'close'} style={styles.icon} />
    </TouchableOpacity>
  );
};

const GoBackIcon = (props) => {
  return (
    <TouchableOpacity onPress={() => props.goBack()}>
      <Icon name={'backspace'} style={styles.icon} />
    </TouchableOpacity>
  );
};

const ContinueIcon = (props) => {
  return (
    <TouchableOpacity onPress={() => props.continue()}>
      <Icon name={'page-next'} style={styles.icon} />
    </TouchableOpacity>
  );
};

const SaveIcon = (props) => {
  return (
    <TouchableOpacity onPress={() => props.save()}>
      <Icon name={'check'} style={styles.icon} />
    </TouchableOpacity>
  );
};

/* ACTION BAR */
const ActionBar = (props) => {
  console.log(props.actions);
  return (
    <View style={styles.actionsContainer}>
      {/* CLOSE BUTTON */}
      {props.actions.includes('close') && (
        <CloseIcon close={() => props.close()} />
      )}
      {/* GO BACK BUTTON */}
      {props.actions.includes('goBack') && (
        <GoBackIcon goBack={() => props.goBack()} />
      )}
      {/* CONTINUE BUTTON */}
      {props.actions.includes('continue') && (
        <ContinueIcon continue={() => props.continue()} />
      )}
      {/* SAVE BUTTON */}
      {props.actions.includes('save') && <SaveIcon save={() => props.save()} />}
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 24,
    color: Colors.text,
  },
});

export default ActionBar;
