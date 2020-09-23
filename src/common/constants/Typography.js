/**
 * This file contains font sizes that are global to the application
 */
import {StyleSheet} from 'react-native';

const headers = {
  h1: 20,
  h2: 18,
  h3: 16,
  h4: 14,
  h5: 12,
  h6: 10,
};

const content = {
  normal: 14,
  small: 12,
};

export default StyleSheet.create({
  mainHeader: {
    fontSize: headers.h1,
  },
  section: {
    fontSize: headers.h2,
  },
  subsection: {
    fontSize: headers.h3,
  },
  title: {
    fontSize: headers.h6,
  },
  normal: {
    fontSize: content.normal,
  },
  small: {
    fontSize: content.small,
  },
});
