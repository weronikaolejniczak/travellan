import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import ShareExtension from 'rn-extensions-share';
/** IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../App/Constants/Colors';

const Home = (props) => {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    type ? console.log('already') : getData();
  }, [type]);

  const getData = async () => {
    const response = await ShareExtension.data();
    const data = await response;
    setType(data[0].type);
    setValue(data[0].value);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
      }}>
      <Text>{console.log(type)}</Text>
      <Text>{console.log(value)}</Text>
    </View>
  );
};

export default Home;
