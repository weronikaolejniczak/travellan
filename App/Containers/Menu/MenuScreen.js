import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import styles from './MenuScreenStyle'
import { ApplicationStyles, Helpers } from 'App/Theme'


export default class MenuScreen extends React.Component {
    render() {
        return (
            <ScrollView style={[ApplicationStyles.screenBackground, Helpers.fill]}>
                <View>
                    <Text style={[ApplicationStyles.text, styles.text]}>Menu screen</Text>
                </View>
            </ScrollView>
        )
    }
}
