import { StyleSheet } from 'react-native';

import { Colors, Metrics } from 'constants';

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
    ...Metrics.bigPaddingTop,
  },
  headline: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  headlineWrapper: {
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  hotelCardWrapper: {
    marginVertical: '3%',
  },
  paragraph: {
    color: Colors.primary,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    color: Colors.primary,
    marginTop: 10,
    textAlign: 'center',
  },
});
