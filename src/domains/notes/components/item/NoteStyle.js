import {StyleSheet, Dimensions} from 'react-native';
import Colors from 'constants/Colors';

const {height, width} = Dimensions.get('window');
export const cardHeight = height * 0.4;
export const cardWidth = width * 0.9;
export const spacingForCardInset = width * 0.03;

export const noteStyle = StyleSheet.create({
  noteCard: {
    width: cardWidth,
    paddingHorizontal: cardWidth * 0.1,
    paddingVertical: cardHeight * 0.05,
    marginVertical: cardHeight * 0.05,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: cardHeight * 0.08,
    padding: cardHeight * 0.025,
    backgroundColor: Colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bodyMargin: {
    marginTop: cardHeight * 0.2,
  },
  header: {
    color: Colors.text,
    fontSize: 24,
  },
  create:{
    fontSize:11,
    alignSelf:'flex-end',
    color: '#fff',
    right:-10,
    top:5
},
  subtitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    top:10,
    left:10,
  },
  text: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'justify',
  },
  icon: {
    fontSize: 30,
    color: Colors.text,
    paddingHorizontal: 10,
  },
  columnDirection: {
    flexDirection: 'column',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  alignText: {
    alignItems: 'flex-start',
  },
  card: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    shadowRadius: 5,
    shadowOpacity: 1.0,
    borderRadius: 5,
    margin:20,
    paddingRight:20,
    width:138,
    height:136,
    color: '#fff',
},
});
