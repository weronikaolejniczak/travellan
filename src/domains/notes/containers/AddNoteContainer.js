import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as notesActions from 'actions/notesActions';
import Colors from 'constants/Colors';
import { Select } from 'utils';
import { notificationManager } from 'services/manageNotifications';
import { styles } from './AddNoteContainerStyle';

const AddNoteContainer = (props) => {
  const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const localNotify = notificationManager;
  const startDate = new Date(selectedTrip.startDate);
  startDate.setHours(startDate.getHours() - 12);

  const [title, setTitle] = useState('');
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [titleSubmitted, setTitleSubmitted] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [descriptionSubmitted, setDescriptionSubmitted] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryIsValid, setCategoryIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toPackList, setToPackList] = useState([]);

  const titleChangeHandler = (text) => {
    text.trim().length === 0 ? setTitleIsValid(false) : setTitleIsValid(true);
    setTitle(text);
  };

  const callNotification = (cat, desc) => {
    localNotify.configure();
    return localNotify.scheduleNotification(
      'Notes',
      2,
      cat,
      desc.split(' ').join(', '),
      {},
      {},
      startDate,
    );
  };

  const descriptionChangeHandler = (text) => {
    text.trim().length === 0
      ? setDescriptionIsValid(false)
      : setDescriptionIsValid(true);
    setDescription(text);
  };

  const categoryChangeHandler = (cat) => {
    cat.trim().length === 0
      ? setCategoryIsValid(false)
      : setCategoryIsValid(true);
    setCategory(cat);
  };

  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    if (!titleIsValid || !descriptionIsValid) {
      setTitleSubmitted(true);
      setDescriptionSubmitted(true);
    } else {
      await dispatch(
        notesActions.createNoteRequest(tripId, category, title, description),
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
    categoryIsValid,
    tripId,
    category,
    title,
    description,
  ]);

  const submitHandlerToPack = useCallback(async () => {
    setToPackList(description.split(' '));
    setIsLoading(true);
    if (!descriptionIsValid) {
      setTitleSubmitted(true);
      setDescriptionSubmitted(true);
    } else {
      await dispatch(
        notesActions.createNoteRequest(tripId, category, title, description),
      );
      props.navigation.navigate('Notes', {
        tripId: selectedTrip.id,
      });
    }
    setIsLoading(false);
    callNotification(category, description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    titleIsValid,
    descriptionIsValid,
    categoryIsValid,
    tripId,
    category,
    title,
    description,
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
    value: 'Without category',
  };

  useEffect(() => {
    setCategory(placeholder.value);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.smallPaddingTop}>
        <Select
          onChangeText={categoryChangeHandler}
          items={categoryList}
          placeholder={placeholder}
          onValueChange={(value) => setCategory(value)}
        />
      </View>

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

export default AddNoteContainer;
