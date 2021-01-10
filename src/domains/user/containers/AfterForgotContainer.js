import React from 'react';
import { Button, View as Container, Text } from 'utils';
import { styles } from './AfterForgotContainerStyle';

const AfterForgotContainer = (props) => {
  return (
    <Container>
      <Text>
        Please check your email for instructions on how to reset your password.
      </Text>
      <Button onPress={() => props.navigation.navigate('Auth')}>
        Move to Login
      </Button>
    </Container>
  );
};

export const afterForgotOptions = {
  headerShown: false,
};

export default AfterForgotContainer;
