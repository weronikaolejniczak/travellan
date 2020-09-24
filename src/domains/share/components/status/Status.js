import React from 'react';
import {View, Text} from 'react-native';
/* imports from within the module */
import GoBackToApp from 'share/components/goBackToApp/GoBackToApp';
import Colors from 'constants/Colors';

const Status = (props) => {
  /* based on the type of status, return status component */
  switch (props.status) {
    case 'notLoggedIn':
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[props.styles.header, {color: Colors.primary}]}>
            You're not logged in!
          </Text>
          <Text style={[props.styles.text]}>
            First log in and then share again!
          </Text>
          {/* go back to app button component */}
          <GoBackToApp />
        </View>
      );
    case 'noTripsFound':
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={[props.styles.header, {color: Colors.primary}]}>
            No trips found
          </Text>
          <Text style={[props.styles.text]}>
            There are no trips! First create one.
          </Text>
          {/* go back to app button component */}
          <GoBackToApp />
        </View>
      );
    case 'finishStatus':
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={[props.styles.header, {color: Colors.primary}]}>
            {props.error ? 'Something went wrong' : 'Congratulations!'}
          </Text>
          <Text style={[props.styles.text]}>
            {props.error
              ? props.error
              : 'You successfully added accommodation to your trips!'}
          </Text>
          {/* go back to app button component */}
          <GoBackToApp />
        </View>
      );
    default:
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={[props.styles.header, {color: Colors.primary}]}>
            Something went wrong
          </Text>
          <Text style={[props.styles.text]}>{props.error}</Text>
          {/* go back to app button component */}
          <GoBackToApp />
        </View>
      );
  }
};

export default Status;
