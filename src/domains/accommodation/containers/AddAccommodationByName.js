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

const AddAccommodationContainer = (props) => {
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

  const items = [
    {
      label: 'Hello',
      value: 'hello',
    },
    {
      label: 'World',
      value: 'world',
    },
    {
      label: 'This',
      value: 'this',
    },
  ];

  return (
    <Container>
      <Headline>Headline!</Headline>
      <Subheading>Subheading!</Subheading>
      <Title>Title!</Title>
      <Paragraph>Paragraph!</Paragraph>
      <Caption>Caption!</Caption>
      <Text>Text!</Text>
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
      <Searchbar onChangeText={onChangeSearch} value={searchQuery} />
    </Container>
  );
};

export default AddAccommodationContainer;
