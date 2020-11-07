import React from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
/* imports from within the module */
import {toolbarButtonStyle as styles} from './ToolbarButtonStyle';
import Colors from 'constants/Colors';

/* ONE TOOLBAR BUTTON, PASS AS PROPS - refactor icon buttons into smaller component */
const ToolbarButton = (props) => {
  return (
    <View
      style={{
        backgroundColor: props.handler ? Colors.background : Colors.cards,
      }}>
      <TouchableOpacity styles={styles.button} onPress={props.onPress}>
        {props.loader && props.isLoading ? (
          <View style={styles.button}>
            <ActivityIndicator size="small" color={Colors.text} />
          </View>
        ) : (
          <Icon name={props.iconName} style={styles.icon} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ToolbarButton;
