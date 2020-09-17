import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as noteActions from 'notes/state/Actions';
import {addNoteStyle as styles} from './AddNoteStyle';
import Colors from 'constants/Colors';

const AddNote = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );

  /** STATE VARIABLES AND STATE SETTER FUNCTIONS */
  const [title, setTitle] = useState('');
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [titleSubmitted, setTitleSubmitted] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [descriptionSubmitted, setDescriptionSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('To Do');

  /** HANDLERS */
  // Validates title.
  const titleChangeHandler = (text) => {
    text.trim().length === 0 ? setTitleIsValid(false) : setTitleIsValid(true);
    setTitle(text);
  };
  // Validates description.
  const descriptionChangeHandler = (text) => {
    text.trim().length === 0
      ? setDescriptionIsValid(false)
      : setDescriptionIsValid(true);
    setDescription(text);
  };
  // Submits.
  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    if (!titleIsValid || !descriptionIsValid) {
      setTitleSubmitted(true);
      setDescriptionSubmitted(true);
    } else {
      await dispatch(noteActions.createNote(tripId, category, title, description));
      props.navigation.navigate('Notes', {
        tripId: selectedTrip.id,
      });
    }
    setIsLoading(false);
  }, [
    titleIsValid,
    descriptionIsValid,
    dispatch,
    tripId,
    category,
    title,
    description,
    props.navigation,
    selectedTrip.id,
  ]);

  return (
    <ScrollView style={styles.container}>
      {/* TITLE INPUT */}
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
      {/* DESCRIPTION INPUT */}
      <View style={styles.smallPaddingTop}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
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
      {/* DESCRIPTION INPUT */}
      <View style={styles.smallPaddingTop}>
      <Text style={styles.label}>Set Category</Text>
      <Picker
        selectedValue={category}
        style={{ height: 50, width: 150, color: '#FFFFFF' }}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item label="To Do" value="To Do" />
        <Picker.Item label="To Pack" value="To Pack" />
        <Picker.Item label="Diares" value="Diares" />
      </Picker>
      </View>
      {/* SUBMIT BUTTON */}
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
};

export default AddNote;
