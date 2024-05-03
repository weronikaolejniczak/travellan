import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { createNoteRequest } from 'actions/notesActions';
import { defaultNoteCategory, noteCategories } from 'data/NoteCategories';
import { Formik } from 'formik';
import { notificationManager } from 'services';
import { Button, ScrollView as Container, Select, TextInput } from 'utils';
import * as yup from 'yup';
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
        desc
          .split(/[\n,]+/)
          .join(',\n')
          .trim(),
        {},
        {},
        startDate,
      );
    },
    [localNotify, startDate],
  );

  const categoryChangeHandler = (cat) => setCategory(cat);

  useEffect(() => {
    setCategory(defaultNoteCategory.value);
  }, []);

  return (
    <Formik
      initialValues={{
        category: 'Without category',
        description: '',
        title: '',
      }}
      onSubmit={async (values) => {
        setError('');
        setIsLoading(true);
        try {
          await dispatch(
            createNoteRequest(
              tripId,
              values.category,
              values.title,
              values.description,
            ),
          );
          navigation.navigate('Notes', {
            tripId: selectedTrip.id,
          });
          setIsLoading(false);
        } catch {
          setError(error);
        }
        values.category === 'To Pack' &&
          callNotification(values.category, values.description);
      }}
      validationSchema={yup.object().shape({
        description: yup.string().min(1).max(500).required('Cannot be empty!'),
        title: yup.string().when('category', {
          is: 'To Pack',
          otherwise: yup.string().min(1).max(50).required('Cannot be empty!'),
          then: yup.string(),
        }),
      })}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <Container>
          <View style={styles.smallPaddingTop}>
            <Select
              onChangeText={categoryChangeHandler}
              items={noteCategories}
              placeholder={defaultNoteCategory}
              onValueChange={handleChange('category')}
            />
          </View>

          {values.category !== 'To Pack' && (
            <View style={styles.smallPaddingTop}>
              <TextInput
                label="Title"
                value={values.title}
                onChange={handleChange('title')}
                error={errors.title && touched.title ? errors.title : null}
              />
            </View>
          )}
          <View style={styles.smallPaddingTop}>
            <TextInput
              label="Content"
              value={values.description}
              onChange={handleChange('description')}
              multiline
              error={
                errors.description && touched.description
                  ? errors.description
                  : null
              }
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              isLoading={isLoading}
              isDisabled={isLoading}
              onPress={handleSubmit}
            >
              Submit
            </Button>
          </View>
        </Container>
      )}
    </Formik>
  );
};

export default AddNoteContainer;
