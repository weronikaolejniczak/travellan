import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button, ScrollView as Container, Select, TextInput } from 'utils';
import { createNoteRequest } from 'actions/notesActions';
import { defaultNoteCategory, noteCategories } from 'data/NoteCategories';
import { notificationManager } from 'services/manageNotifications';
import { styles } from './AddNoteContainerStyle';

const AddNoteContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );
  const localNotify = notificationManager;
  const startDate = new Date(selectedTrip.startDate);
  startDate.setHours(startDate.getHours() - 12);

  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const callNotification = useCallback(
    (cat, desc) => {
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
    },
    [localNotify, startDate],
  );

  const descriptionChangeHandler = (text) => setDescription(text);

  const categoryChangeHandler = (cat) => setCategory(cat);

  const titleChangeHandler = (text) => setTitle(text);

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        createNoteRequest(tripId, category, title.trim(), description.trim()),
      );
      navigation.navigate('Notes', {
        tripId: selectedTrip.id,
      });
      setIsLoading(false);
    } catch {
      setError('Something went wrong!');
    }
    setIsLoading(false);
    category === 'To Pack' && callNotification(category, description.trim());
  };

  useEffect(() => {
    setCategory(defaultNoteCategory.value);
  }, []);

  return (
    <Container>
      <View style={styles.smallPaddingTop}>
        <Select
          onChangeText={categoryChangeHandler}
          items={noteCategories}
          placeholder={defaultNoteCategory}
          onValueChange={(value) => setCategory(value)}
        />
      </View>

      {category !== 'To Pack' && (
        <View style={styles.smallPaddingTop}>
          <TextInput
            label="Title"
            value={title}
            onChange={titleChangeHandler}
          />
        </View>
      )}

      <TextInput
        label="Content"
        value={description}
        onChange={descriptionChangeHandler}
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button
          isLoading={isLoading}
          isDisabled={isLoading}
          onPress={submitHandler}
        >
          Submit
        </Button>
      </View>
    </Container>
  );
};

export default AddNoteContainer;
