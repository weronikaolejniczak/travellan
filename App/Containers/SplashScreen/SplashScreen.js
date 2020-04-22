import React from 'react'
import { Text, View, Image } from 'react-native'
import styles from './SplashScreenStyle'
import { ApplicationStyles, Fonts, Helpers, Images } from 'App/Theme'


export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={[Helpers.center, Helpers.fillRowCenter, ApplicationStyles.screenBackground]}>

        <View style={styles.logoContainer}>
          <Image style={Helpers.fullSize} source={Images.logo} resizeMode={'contain'} />
        </View>
        
        <Text style={[ApplicationStyles.text, Fonts.h2]}>travellan.</Text>

      </View>
    )
  }
}
