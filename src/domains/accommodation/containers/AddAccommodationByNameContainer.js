import React, { useState } from 'react';
import { Button, ScrollView as Container, Headline, TextInput } from 'utils';
import { View } from 'react-native';

const AddAccommodationByNameContainer = (props) => {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  const handleChange = (val) => {
    setValue(val);
  };

  const handlePress = () => console.log('hello!');

  return (
    <Container>
      <Headline>Headline!</Headline>
      <TextInput
        label={'Hotel address'}
        error={error}
        onChange={handleChange}
        value={value}
      />
      <Button onPress={handlePress}>Submit</Button>
    </Container>
  );
};

export default AddAccommodationByNameContainer;
