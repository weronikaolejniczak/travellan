import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  RadioButtonGroup,
  ScrollView,
  Switch,
  TextInput,
} from 'utils';
import { Text, View } from 'react-native';
//import { styles } from './AddAccommodationContainerStyle';

const AddAccommodationContainer = (props) => {
  //const tripId = props.route.params.tripId;
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [radioValue, setRadioValue] = useState(null);

  const handleChange = (val) => {
    setValue(val);
    !value.match('@') ? setError('Invalid e-mail format') : setError('');
  };

  const handlePress = () => console.log('hello!');

  const toggleSwitch = () => setEnabled((prevState) => !prevState);

  const options = [
    {
      key: 'samsung',
      text: 'Samsung',
    },
    {
      key: 'apple',
      text: 'Apple',
    },
    {
      key: 'motorola',
      text: 'Motorola',
    },
    {
      key: 'lenovo',
      text: 'Lenovo',
    },
  ];

  return (
    <ScrollView>
      <TextInput error={error} onChange={handleChange} value={value} />
      <TextInput outlined />
      <TextInput outlined multiline />
      <Button onPress={handlePress}>Hello, World!</Button>
      <Button onPress={handlePress} disabled>
        Hello, World!
      </Button>
      <Button mode="outlined">Hello, World!</Button>
      <Button mode="outlined" loading>
        Hello, World!
      </Button>
      <View>
        <Text>Hello</Text>
      </View>
      <Button mode="text">Hello, World!</Button>
      <Checkbox onPress={toggleSwitch} checked={enabled} />
      <Checkbox
        label="Something that needs to be checked!"
        onPress={toggleSwitch}
        checked={enabled}
      />
      <Switch toggled={enabled} onToggleSwitch={toggleSwitch} />
      <RadioButtonGroup
        options={options}
        value={radioValue}
        onSelect={setRadioValue}
      />
    </ScrollView>
  );
};

export default AddAccommodationContainer;
