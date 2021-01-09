import React, { useState } from 'react';
import {
  Button,
  Caption,
  Checkbox,
  ScrollView as Container,
  Headline,
  Paragraph,
  RadioButtonGroup,
  Searchbar,
  Subheading,
  Switch,
  Text,
  TextInput,
  Title,
} from 'utils';
import { View } from 'react-native';

const AddAccommodationByNameContainer = (props) => {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [radioValue, setRadioValue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleChange = (val) => {
    setValue(val);
    !value.match('@') ? setError('Invalid e-mail format') : setError('');
  };

  const handlePress = () => console.log('hello!');

  const toggleSwitch = () => setEnabled((prevState) => !prevState);

  const options = [
    {
      key: 'samsung',
      text: 'Samsung123',
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
    <Container>
      <Headline>Headline!</Headline>
      <TextInput error={error} onChange={handleChange} value={value} />
      <Button onPress={handlePress}>Hello, World!</Button>
    </Container>
  );
};

export default AddAccommodationByNameContainer;
