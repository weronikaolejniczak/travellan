import { StyleSheet } from 'react-native';

import Colors from 'constants/Colors';

export const homeStyle = StyleSheet.create({
  caution: {
    color: Colors.primary,
    textAlign: 'center',
  },
  container: {
    paddingTop: '3%',
  },
  error: {
    color: Colors.error,
    textAlign: 'center',
  },
  headline: {
    color: Colors.text,
    textAlign: 'center',
  },
  helperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '3%',
  },
  hotelCardWrapper: {
    marginVertical: '3%',
  },
  section: {
    marginVertical: '3%',
  },
  submitWrapper: {
    alignItems: 'center',
    marginTop: '3%',
  },
  text: {
    color: Colors.text,
  },
});
