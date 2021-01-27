import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  actionsWrapper: {
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
  },
  caution: {
    color: Colors.primary,
    textAlign: 'center',
  },
  container: {
    paddingTop: 40,
  },
  headline: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  headlineWrapper: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  hotelCardWrapper: {
    marginVertical: '3%',
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
    color: Colors.primary,
  },
  paragraph: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    color: Colors.primary,
  },
});
