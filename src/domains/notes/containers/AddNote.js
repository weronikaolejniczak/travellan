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
import * as noteActions from 'notes/state/Actions';
import {addNoteStyle as styles} from './AddNoteStyle';
import Colors from 'constants/Colors';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import Icon from 'react-native-ionicons'
import { Chevron } from 'react-native-shapes';

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
  const [category, setCategory] = useState('');

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

  const categoryList = [
    {
      label: 'To Do',
      value: 'To Do',
    },
    {
      label: 'To Pack',
      value: 'To Pack',
    },
    {
      label: 'Diaries',
      value: 'Diaries',
    },
  ];

  const placeholder = {
    label: 'Select a category...',
    value: null,
    color: '#9EA0A4',
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.smallPaddingTop}>
        <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 4 }}>
      {/* CATEGORY PICKER */}
      <RNPickerSelect 
        items={categoryList}
        placeholder={placeholder}
        onValueChange={(value) => setCategory(value)}
        useNativeAndroidPickerStyle={false}
        style={{
          inputAndroid: {
            backgroundColor: 'transparent',
          },
          iconContainer: {
            top: 5,
            right: 15,
          },
        }}
        Icon={() => {
          return (
            <View
              style={{
                backgroundColor: 'transparent',
                borderTopWidth: 10,
                borderTopColor: 'gray',
                borderRightWidth: 10,
                borderRightColor: 'transparent',
                borderLeftWidth: 10,
                borderLeftColor: 'transparent',
                width: 0,
                height: 0,
                top:10,
              }}
            />
          );
        }}
      />
      </View>
    </View>
    
      {/*<View style={styles.smallPaddingTop}>
      <Text style={styles.label}>Set Category</Text>
      <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 4 }}>
      <Picker 
        mode='dialog'
        itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        
        <Picker.Item label="To Do" value="To Do" />
        <Picker.Item label="To Pack" value="To Pack" />
        <Picker.Item label="Diares" value="Diares" />
      </Picker>
      </View>
      </View>
  */}
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
