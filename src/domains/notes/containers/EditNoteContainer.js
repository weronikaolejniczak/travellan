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

    noteId = props.route.params.noteId;
    title = props.route.params.title;
    description= props.route.params.description;
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [titleSubmitted, setTitleSubmitted] = useState(false);
    const [descriptionIsValid, setDescriptionIsValid] = useState(false);
    const [descriptionSubmitted, setDescriptionSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const titleChangeHandler = (text) => {
        text.trim().length === 0 ? setTitleIsValid(false) : setTitleIsValid(true);
        setTitle(text);
      };
    const descriptionChangeHandler = (text) => {
        text.trim().length === 0
          ? setDescriptionIsValid(false)
          : setDescriptionIsValid(true);
        setDescription(text);
      };

    const submitHandler = () => { 
        console.log("working")
    }
    
    return (
        <ScrollView style={styles.container}>
          <View style={styles.smallPaddingTop}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor={'grey'}
              value={title}
              onChangeText={titleChangeHandler}
            />
            {!titleIsValid && titleSubmitted && (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>Enter a title!</Text>
              </View>
            )}
          </View>

          <View style={styles.smallPaddingTop}>
            <Text style={styles.label}>Content</Text>
            <TextInput
              numberOfLines={4}
              style={styles.input}
              placeholder="Content"
              placeholderTextColor={'grey'}
              value={description}
              onChangeText={descriptionChangeHandler}
              multiline
            />
            {!descriptionIsValid && descriptionSubmitted && (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>Enter a description!</Text>
              </View>
            )}
          </View>
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <TouchableOpacity style={styles.button} onPress={submitHandler}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      );
  }


  export default EditNoteContainer;