import { Input } from 'react-native-elements';
import React, { useState } from 'react';

import Colors from 'constants/Colors';

const CustomInput = (props) => {
  const { label, placeholder, error, handleChange, ref } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    error && ref.current.shake();
    setIsFocused(true);
  };

  const handleBlur = () => setIsFocused(false);

  return (
    <Input
      ref={ref}
      label={label ? label : 'label'}
      labelStyle={{ color: isFocused ? Colors.primary : Colors.text }}
      inputContainerStyle={{
        borderColor: isFocused ? Colors.primary : Colors.text,
      }}
      placeholder={placeholder}
      style={{ color: Colors.text }}
      errorStyle={{ color: Colors.error }}
      errorMessage={error}
      renderErrorMessage={true}
      onChangeText={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default CustomInput;
