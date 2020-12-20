import React, { createRef } from 'react';
import { Input } from 'react-native-elements';

const CustomInput = (props) => {
  const input = createRef();
  const { label, placeholder, error, handleChange } = props;

  const handleFocus = () => input.current.focus();

  return (
    <Input
      ref={input}
      label="Name"
      placeholder="BASIC INPUT"
      style={{ color: 'white' }}
      errorStyle={{ color: 'red' }}
      errorMessage="ENTER A VALID ERROR HERE"
      renderErrorMessage={true}
      onChangeText={handleChange}
      onFocus={handleFocus}
    />
  );
};

export default CustomInput;
