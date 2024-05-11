import Colors from 'constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  PDF: {
    alignSelf: 'stretch',
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  buttonTouchableCenter: {
    alignSelf: 'stretch',
    padding: 16,
    textAlign: 'center',
  },
  buttonTouchableLeft: {
    alignSelf: 'stretch',
    padding: 16,
    textAlign: 'left',
  },
  icon: {
    color: Colors.text,
    fontSize: 30,
    marginRight: 20,
  },
  innerPdfContainer: {
    alignSelf: 'stretch',
  },
  miniHeader: {
    flexDirection: 'row-reverse',
  },
  pdfCardContainer: {
    padding: 50,
    //width: Dimensions.get('window').width,
  },
  pdfContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    justifyContent: 'center',
  },
});
