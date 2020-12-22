import Colors from 'constants/Colors';
import { DefaultTheme } from 'react-native-paper';

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
    background: Colors.background,
    surface: Colors.surface,
    placeholder: Colors.placeholder,
    text: Colors.text,
  },
};

export default DarkTheme;
