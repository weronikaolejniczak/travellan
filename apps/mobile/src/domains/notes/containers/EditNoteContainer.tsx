import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { editNoteRequest } from 'actions/notesActions';
import { Button, ScrollView as Container, TextInput } from 'utils';
import { styles } from './EditNoteContainerStyle';

const EditNoteContainer = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const tripId = route.params.tripId;
  const noteId = route.params.noteId;
  const category = route.params.category;
  const selectedTrip = useSelector((state) =>
    state.trips.trips.find((item) => item.id === tripId),
  );

  const [_error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(route.params.title);
  const [description, setDescription] = useState(route.params.description);

  const titleChangeHandler = (text) => setTitle(text);

  const descriptionChangeHandler = (text) => setDescription(text);

  const submitHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(
        editNoteRequest(tripId, noteId, title, category, description),
      );
      navigation.navigate('Notes', {
        tripId: selectedTrip.id,
      });
      setIsLoading(false);
    } catch {
      setError('Something went wrong!');
    }
  }, [
    dispatch,
    tripId,
    noteId,
    title,
    category,
    description,
    navigation,
    selectedTrip.id,
  ]);

  return (
    <Container>
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

export default EditNoteContainer;
