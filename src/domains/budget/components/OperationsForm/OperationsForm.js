import React, { memo } from 'react';
import { View } from 'react-native';

import * as yup from 'yup';
import { Colors } from 'constants';
import { Formik } from 'formik';
import { RoundButton, TextInput } from 'utils';
import { styles } from './OperationsFormStyle';

const OperationsForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      cost: '',
      title: '',
      type: '',
    }}
    onSubmit={onSubmit}
    validationSchema={yup.object().shape({
      cost: yup.number().min(0.01).required('Cannot be left empty!'),
      title: yup.string().required('Cannot be left empty!'),
      type: yup.string().required('Type has to be picked!'),
    })}
  >
    {({
      values,
      handleChange,
      errors,
      handleSubmit,
      handleBlur,
      isValid,
      touched,
      setFieldValue,
    }) => (
      <>
        <TextInput
          label="Title of transaction"
          value={values.title}
          //onChange={(text) => setTitle(text)}
          onChange={handleChange('title')}
          onBlur={handleBlur}
          error={errors.title && touched.title ? errors.tile : null}
        />
        <TextInput
          label="Cost"
          value={values.cost}
          //onChange={(number) => amountChangeHandler(number)}
          onChange={handleChange('cost')}
          onBlur={handleBlur}
          keyboardType="numeric"
          error={errors.cost && touched.cost ? errors.cost : null}
        />

        <View style={styles.actionsContainer}>
          <RoundButton
            isValid={isValid}
            color={Colors.positive}
            iconName="plus"
            onPress={(event) => {
              setFieldValue('type', 'plus');
              handleSubmit(event);
            }}
          />
          <RoundButton
            isValid={isValid}
            color={Colors.negative}
            iconName="minus"
            onPress={(event) => {
              setFieldValue('type', 'minus');
              handleSubmit(event);
            }}
          />
        </View>
      </>
    )}
  </Formik>
);

export default memo(OperationsForm);
