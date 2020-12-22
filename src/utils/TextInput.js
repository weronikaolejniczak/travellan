import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';

const CustomTextInput = (props) => {
  const {
    disabled,
    error,
    onChange,
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
        onChangeText={onChange}
        value={value}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </>
  );
};

export default CustomTextInput;
