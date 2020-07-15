import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ShareExtension from 'rn-extensions-share';
/** IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../App/Constants/Colors';

const Home = (props) => {
  /* STATE VARIABLES AND STATE SETTING FUNCTIONS */
  const [type, setType] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    type ? console.log('ALREADY ASSIGNED') : getData();
  }, [type]);

  /* HANDLERS */
  /**
    TODO: refactor to catch errors,
    show them in UI as alerts,
    take into account different ShareExtension.data() outputs
  */
  const getData = async () => {
    const response = await ShareExtension.data().catch(
      console.log('NO INTENT'),
    );
    const data = await response;
    data
      ? (setType(data[0].type), setValue(data[0].value))
      : console.log('DATA UNDEFINED');
  };

  return (
    <View style={styles.container}>
      {/* CLOSE BUTTON */}
      <TouchableOpacity onPress={() => ShareExtension.close()}>
        <Text style={styles.text}>x</Text>
      </TouchableOpacity>
      {/* PRINT */}
      <Text style={styles.text}>{type}</Text>
      <Text style={styles.text}>{value}</Text>
    </View>
  );
};

/* REFACTOR INTO SEPERATE FILE */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: '5%',
  },
  text: {
    color: Colors.text,
  },
});

export default Home;
