import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  flex: {
    flex: 1,
  },
  overlay: {
    top: 0,
    position: 'absolute',
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: Colors.cards,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  showInfoOverlay: {
    width: '95%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center',
    backgroundColor: Colors.cards,
  },
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.cards,
  },
  input: {
    width: '100%',
    padding: 15,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: Colors.text,
    fontSize: 14,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.text,
    padding: 20,
  },
  icon: {
    padding: 15,
    fontSize: 28,
    color: Colors.text,
  },
  text: {
    color: Colors.text,
  },
  loading: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
