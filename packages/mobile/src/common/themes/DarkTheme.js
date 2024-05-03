import Colors from 'constants/Colors';
import { DefaultTheme } from 'react-native-paper';

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: Colors.accent,
    background: Colors.background,
    placeholder: Colors.placeholder,
    primary: Colors.primary,
    surface: Colors.surface,
    text: Colors.text,
  },
  dark: true,
};

export default DarkTheme;
