import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const datePickerStyle = StyleSheet.create({
  label: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Colors.primary,
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 35,
  },
  pickerText: {
    color: Colors.text,
    fontSize: 18,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
