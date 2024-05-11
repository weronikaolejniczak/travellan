declare module 'react-native-config' {
  interface EnvConfig {
    FIREBASE_CLIENT_ID: string;
  }

  const Config: EnvConfig;

  export default Config;
}
