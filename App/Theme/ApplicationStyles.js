/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import Colors from './Colors'
import Fonts from './Fonts'

export default {
  screenBackground: {
    backgroundColor: Colors.background,
  },
  button: {
    width: 150, // refactor for responsive design
    margin: 10,
    padding: 15,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  buttonText: {
    // ...Fonts.bold,
    ...Fonts.button,
    color: Colors.text,
    fontWeight: 'bold', // refactor to text decorations in App/Theme/Fonts.js
    textAlign: 'center',
  },
  text: {
    color: Colors.text,
  },
}
