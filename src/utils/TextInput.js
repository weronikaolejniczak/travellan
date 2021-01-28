import React, { memo } from 'react';
import { HelperText, TextInput } from 'react-native-paper';

const CustomTextInput = ({
  error,
  onChange,
  label,
  multiline,
  flat,
  ...rest
}) => (
  <>
    <TextInput
      {...rest}
      error={error}
      label={label || 'Label'}
      mode={flat ? 'flat' : 'outlined'}
      multiline={multiline}
      numberOfLines={multiline && 5}
      onChangeText={onChange}
    />
    <HelperText type="error" visible={!!error}>
      {error}
    </HelperText>
  </>
);

export default memo(CustomTextInput);
