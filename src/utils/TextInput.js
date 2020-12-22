import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';

const CustomTextInput = (props) => {
  const {
    disabled,
    error,
    handleChange,
    label,
    multiline,
    outlined,
    value,
  } = props;

  return (
    <>
      <TextInput
        disabled={disabled}
        error={error}
        label={label || 'Label'}
        mode={outlined && 'outlined'}
        multiline={multiline}
        numberOfLines={multiline && 5}
        onChangeText={handleChange}
        value={value}
      />
      <HelperText type="error" visible={!!error}>
        Error: {error}
      </HelperText>
    </>
  );
};

export default CustomTextInput;
