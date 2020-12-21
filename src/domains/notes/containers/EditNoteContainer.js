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

import { notificationManager } from 'services/manageNotifications';
import * as notesActions from 'actions/notesActions';
import { styles } from './EditNoteContainerStyle';
import Colors from 'constants/Colors';

const EditNoteContainer = (props) => {
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const dispatch = useDispatch();
  noteId = props.route.params.noteId;
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [titleSubmitted, setTitleSubmitted] = useState(false);
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);
  const [descriptionSubmitted, setDescriptionSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(props.route.params.title);
  const [description, setDescription] = useState(
    props.route.params.description,
  );
  const [category, setCategory] = useState(props.route.params.category);

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

  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    if (!titleIsValid || !descriptionIsValid) {
      setTitleSubmitted(true);
      setDescriptionSubmitted(true);
    } else {
      await dispatch(
        notesActions.editNoteRequest(
          tripId,
          noteId,
          title,
          category,
          description,
        ),
      );
      props.navigation.navigate('Notes', {
        tripId: selectedTrip.id,
      });
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    titleIsValid,
    descriptionIsValid,
    tripId,
    noteId,
    title,
    category,
    description,
  ]);

  const submitHandlerToPack = useCallback(async () => {
    setIsLoading(true);
    if (!descriptionIsValid) {
      setTitleSubmitted(true);
      setDescriptionSubmitted(true);
    } else {
      await dispatch(
        notesActions.editNoteRequest(
          tripId,
          noteId,
          title,
          category,
          description,
        ),
      );
      props.navigation.navigate('Notes', {
        tripId: selectedTrip.id,
      });
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    titleIsValid,
    descriptionIsValid,
    tripId,
    noteId,
    title,
    category,
    description,
  ]);

  return (
    <ScrollView style={styles.container}>
      {category === 'To Pack' ? (
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
              <TouchableOpacity
                style={styles.button}
                onPress={submitHandlerToPack}
              >
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

export default EditNoteContainer;
