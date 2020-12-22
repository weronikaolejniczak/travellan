const baseColors = {
  black: '#000000',
  grey: '#222222',
  green: '#06C258',
  lightGrey: '#555555',
  darkGrey: '#111111',
  orange: '#FF8C00',
  red: 'red',
  semiTransparent: 'rgba(0, 0, 0, 0.5)',
  transparent: 'rgba(0,0,0,0)',
  white: '#FFFFFF',
};

export default {
  error: baseColors.red,
  primary: baseColors.orange,
  shadow: baseColors.black,
  text: baseColors.white,
  cards: baseColors.darkGrey,
  background: baseColors.grey,

  switchEnabledTrack: baseColors.orange,
  switchDisabledTrack: baseColors.lightGrey,
  switchThumb: baseColors.white,
};
