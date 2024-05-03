import Colors from 'constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');
export const cardHeight = height * 0.4;
export const cardWidth = width * 0.9;
export const spacingForCardInset = width * 0.03;

export const styles = StyleSheet.create({
  actions: {
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    left: 0,
    padding: cardHeight * 0.025,
    paddingHorizontal: cardHeight * 0.08,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  alignText: {
    alignItems: 'flex-start',
  },
  bodyMargin: {
    marginTop: cardHeight * 0.2,
  },
  card: {
    borderRadius: 5,
    color: '#fff',
    elevation: 10,
    height: 136,
    margin: 20,
    paddingRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    width: 138,
  },
  category: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: 'bold',
    paddingBottom: '2%',
  },
  columnDirection: {
    flexDirection: 'column',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 40,
  },
  create: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontSize: 11,
    paddingBottom: '5%',
    top: 5,
  },
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  icon: {
    color: Colors.text,
    fontSize: 30,
    paddingHorizontal: 10,
  },
  noteCard: {
    marginHorizontal: cardHeight * 0.05,
    marginVertical: cardHeight * 0.05,
    paddingHorizontal: cardWidth * 0.1,
    paddingVertical: cardHeight * 0.05,
    width: cardWidth,
  },
  rowDirection: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  subtitle: {
    color: '#fff',
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    left: 5,
    top: 2,
  },
  text: {
    color: Colors.text,
    fontSize: 14,
    textAlign: 'justify',
  },
});
