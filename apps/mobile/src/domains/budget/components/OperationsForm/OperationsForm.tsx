import React, { memo } from 'react';
import { View } from 'react-native';

import { Colors } from 'constants';
import { Formik } from 'formik';
import { RoundButton, TextInput } from 'utils';
import * as yup from 'yup';
import { styles } from './OperationsFormStyle';

const OperationsForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      cost: '',
      title: '',
      type: '',
    }}
    onSubmit={(values) => onSubmit(values)}
    validationSchema={yup.object().shape({
      cost: yup
        .number()
        .typeError('Cost must be a number, e.g. 10.59.')
        .min(0.01)
        .required('Cannot be left empty!'),
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
      touched,
      setFieldValue,
      isSubmitting,
    }) => (
      <>
        <TextInput
          label="Title of transaction"
          value={values.title}
          onChange={handleChange('title')}
          onBlur={handleBlur('title')}
          error={errors.title && touched.title ? errors.title : null}
        />
        <TextInput
          label="Cost"
          value={values.cost}
          onChange={handleChange('cost')}
          onBlur={handleBlur('cost')}
          keyboardType="numeric"
          error={errors.cost && touched.cost ? errors.cost : null}
        />

        <View style={styles.actionsContainer}>
          <RoundButton
            disabled={isSubmitting}
            loading={isSubmitting}
            color={Colors.positive}
            iconName="plus"
            onPress={() => {
              setFieldValue('type', 'plus');
              handleSubmit();
            }}
          />
          <RoundButton
            disabled={isSubmitting}
            loading={isSubmitting}
            color={Colors.negative}
            iconName="minus"
            onPress={() => {
              setFieldValue('type', 'minus');
              handleSubmit();
            }}
          />
        </View>
      </>
    )}
  </Formik>
);

export default memo(OperationsForm);
