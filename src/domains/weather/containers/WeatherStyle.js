import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const weatherStyle = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: '12%',
  },
  weatherContainer: {
    backgroundColor: Colors.primary,
  },
  graphicsContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    flex: 0.3,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 15,
    paddingHorizontal: 50,
    backgroundColor: '#111111',
    width: '100%',
    flexDirection: 'row',
  },
  actionContainer: {
    marginTop: 10,
  },
  action: {
    color: Colors.primary,
  },
  text: {
    color: Colors.text,
  },
  subdate: {
    fontSize: 11,
    color: '#ccc',
  },
  date: {
    color: Colors.text,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  dateContainer: {
    height: 110,
    paddingVertical: 7,
    paddingHorizontal: 13,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    paddingTop: '12%',
  },
  itemlessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemlessText: {
    fontSize: 18,
  },
});
