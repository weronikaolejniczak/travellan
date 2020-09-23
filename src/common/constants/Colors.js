/*
 * This file contains colors that are global to the application
 */

const baseColors = {
  green: '#06C258',
  orange: '#FF8C00',
  red: 'red',
  // white to black scale
  white: 'white',
  lightGrey: 'grey',
  grey: '#222222',
  darkGrey: '#111111',
  black: 'black',
  // with transparency
  transparent: 'rgba(0,0,0,0)',
  blackTransparent: 'rgba(0, 0, 0, 0.5)',
};

export default {
  /* light theme */
  /* dark theme */
  shadow: baseColors.black,
  cards: baseColors.darkGrey,
  background: baseColors.grey,
  primary: baseColors.orange,
  text: baseColors.white,
  error: baseColors.red,
};
