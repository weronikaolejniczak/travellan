import React, {useState, useCallback, useEffect} from 'react';
import {
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import {useDispatch, useSelector} from 'react-redux';
  import RNPickerSelect from 'react-native-picker-select';
  
  import {notificationManager} from 'services/manageNotifications';
  import * as notesActions from 'actions/notesActions';
  import {styles} from './EditNoteContainerStyle';
  import Colors from 'constants/Colors';

  const EditNoteContainer = (props) => {

    const { noteId } = props;
    console.log(noteId)
    return (
        <ScrollView style={styles.container}>
        <View style={styles.smallPaddingTop}>
          <Text style={styles.label}></Text>
          </View>
        </ScrollView>
      );
  }


  export default EditNoteContainer;