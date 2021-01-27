const baseColors = {
  black: '#000000',
  darkGrey: '#111111',
  green: '#06C258',
  grey: '#222222',
  lightGrey: '#777777',
  orange: '#FF8C00',
  red: 'red',
  semiTransparent: 'rgba(0, 0, 0, 0.7)',
  transparent: 'rgba(0,0,0,0)',
  white: '#FFFFFF',
};

export default {
  accent: baseColors.green,
  background: baseColors.grey,
  cards: baseColors.darkGrey,
  error: baseColors.red,
  negative: baseColors.red,
  placeholder: baseColors.lightGrey,
  positive: baseColors.green,
  primary: baseColors.orange,
  shadow: baseColors.black,
  surface: baseColors.darkGrey,
  text: baseColors.white,
  transparent: baseColors.transparent,
  transparentShadow: baseColors.semiTransparent,
};
