import React, { useState, useCallback, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as noteActions from 'notes/state/Actions';
import { addNoteStyle as styles } from './AddNoteStyle';
import Colors from 'constants/Colors';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

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
  const [category, setCategory] = useState('');
  const [categoryIsValid, setCategoryIsValid] = useState(false);
  //const [categorySubmitted, setCategorySubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  var ToPackList = [];


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

  //Validates category
  const categoryChangeHandler = (category) => {
    category.trim().length === 0
      ? setCategoryIsValid(false)
      : setCategoryIsValid(true);
    setCategory(category);
  };
  // Submits.
  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    if (!titleIsValid || !descriptionIsValid) {
      setTitleSubmitted(true);
      setDescriptionSubmitted(true);
      //setCategorySubmitted(true)
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
    categoryIsValid,
    dispatch,
    tripId,
    category,
    title,
    description,
    props.navigation,
    selectedTrip.id,
  ]);

  const submitHandlerToPack = useCallback(async () => {
    ToPackList=description.split(" ");
    console.log(ToPackList)
    setIsLoading(true);
    if (!descriptionIsValid) {
      setTitleSubmitted(true);
      setDescriptionSubmitted(true);
      //setCategorySubmitted(true)
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
    categoryIsValid,
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
      color: '#FF4500',
      fontWeight: 'bold',
    },
    {
      label: 'To Pack',
      value: 'To Pack',
      color: '#FF4500',
      fontWeight: 'bold',
    },
    {
      label: 'Diaries',
      value: 'Diaries',
      color: '#FF4500',
      fontWeight: 'bold',
    },
  ];

  const placeholder = {
    label: 'Select a category...',
    value: 'Categoryless',
    color: 'grey'
  };

  useEffect(() => {
    setCategory(placeholder.value)
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.smallPaddingTop}>
        <Text style={styles.label}>Set Category</Text>
        <View style={styles.smallPaddingTop}></View>
        <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 4 }}>
          {/* CATEGORY PICKER */}
          <RNPickerSelect
            //onChangeText={categoryChangeHandler}
            items={categoryList}
            placeholder={placeholder}
            onValueChange={(value) => setCategory(value)}
            style={{
              inputAndroid: {
                backgroundColor: 'transparent',
              },
              iconContainer: {
                top: 5,
                right: 15,
              },
              color: categoryList.color
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
                    top: 15,

                  }}
                />
              );
            }}
          />
          {/*
      {!categoryIsValid && categorySubmitted && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>Pick category!</Text>
          </View>
        )} */}
        </View>
      </View>
      { category === 'To Pack' ? (
        <ScrollView>
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
                <TouchableOpacity style={styles.button} onPress={submitHandlerToPack}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              )}
          </View>
        </ScrollView>
      ) : (
          <ScrollView>
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
        )}
    </ScrollView>
  );
};

export default AddNote;
