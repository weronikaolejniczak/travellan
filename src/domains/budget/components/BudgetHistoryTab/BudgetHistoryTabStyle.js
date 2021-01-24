import { StyleSheet } from 'react-native';

import { Colors } from 'constants';

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '4%',
    padding: '4%',
  },
  content: {
    flex: 1,
  },
  date: {
    color: Colors.placeholder,
  },
  firstIcon: {
    color: Colors.text,
    fontSize: 28,
    marginRight: '10%',
  },
  icons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: '5%',
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  negative: {
    color: Colors.negative,
  },
  positive: {
    color: Colors.positive,
  },
  secondIcon: {
    color: Colors.text,
    fontSize: 28,
  },
  title: {
    color: Colors.text,
  },
});
