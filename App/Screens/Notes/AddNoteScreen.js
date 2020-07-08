import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as noteActions from '../../Stores/Actions/Note';
import {newNoteScreenStyle as styles} from './AddNoteScreenStyle';
import Colors from '../../Constants/Colors';

const AddNote = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  //temp
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  // title
  const [title, setTitle] = useState('');
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [titleSubmitted, setTitleSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // description
  const [description, setDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [descriptionSubmitted, setDescriptionSubmitted] = useState(false);

  /** HANDLERS */
  // validation handlers
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

  // submit handler
  const submitHandler = useCallback(async () => {
    if (!titleIsValid || !descriptionIsValid) {
      setTitleSubmitted(true);
      setDescriptionSubmitted(true);
    } else {
      setIsLoading(true);
      await dispatch(noteActions.createNote(tripId, title, description));
      props.navigation.navigate('Notes', {
        tripId: selectedTrip.id,
      });
      setIsLoading(false);
    }
  }, [
    props.navigation,
    dispatch,
    tripId,
    title,
    titleIsValid,
    description,
    descriptionIsValid,
  ]);

  return (
    <ScrollView style={styles.form}>
      {/* TITLE INPUT */}
      <View style={{paddingVertical: 15}}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={titleChangeHandler}
        />
        {!titleIsValid && titleSubmitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Enter a title!</Text>
          </View>
        )}
      </View>

      {/* DESCRIPTION INPUT */}
      <View style={{paddingVertical: 15}}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
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

      {/* SUBMIT BUTTON */}
      <View style={{alignItems: 'center', margin: 20}}>
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
};

export default AddNote;
