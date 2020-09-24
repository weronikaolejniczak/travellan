import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
/* imports from within the module */
import Colors from 'constants/Colors';

const GoBackToApp = (props) => {
  return (
    <TouchableOpacity onPress={() => {}} style={{marginTop: 50, padding: 10}}>
      <Text style={{color: Colors.primary}}>Go back to app</Text>
    </TouchableOpacity>
  );
};

export default GoBackToApp;
