import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ShareExtension from 'rn-extensions-share';
/** IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../App/Constants/Colors';

const Home = (props) => {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    type ? console.log('ALREADY ASSIGNED') : getData();
  }, [type]);

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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
      }}>
      <TouchableOpacity onPress={() => ShareExtension.close()}>
        <Text style={{color: Colors.text, fontSize: 32}}>x</Text>
      </TouchableOpacity>
      <Text style={{color: Colors.text}}>{type}</Text>
      <Text style={{color: Colors.text}}>{value}</Text>
    </View>
  );
};

export default Home;
