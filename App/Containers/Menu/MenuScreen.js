import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { ListItem, Header, Icon } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'
import LinearGradient from 'react-native-linear-gradient'
import styles from './MenuScreenStyle'
import { ApplicationStyles, Colors, Helpers } from 'App/Theme'


export default class MenuScreen extends React.Component {
    render() {
        return (
            <ScrollView style={[ApplicationStyles.screenBackground, Helpers.fill]}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'My trips', style: [styles.headerText, ApplicationStyles.text] }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                    containerStyle={{
                        backgroundColor: Colors.primary,
                        justifyContent: 'space-around',
                      }}
                />

                <View style={{ paddingTop: 20 }}>
                <ListItem
                    Component={ TouchableScale }
                    friction={ 90 } //
                    tension={ 100 } // These props are passed to the parent component (here TouchableScale)
                    activeScale={ 0.95 } //
                    linearGradientProps={{
                        colors: ['#FF9800', '#F44336'],
                        start: { x: 1, y: 0 },
                        end: { x: 0.2, y: 0 },
                    }}
                    ViewComponent={ LinearGradient } // Only if no expo
                    /**
                     * For refactoring:
                     * @see https://unsplash.com/s/photos/barcelona
                     * under 'barcelona' anything written by the user into "destination" field,
                     * request for the first photo;
                     * there could be a more optimal solution
                     */
                    leftAvatar={{ rounded: true, source: { uri: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=661&q=80' } }}
                    title="Barcelona"
                    titleStyle={{ color: 'white', fontWeight: 'bold' }}
                    subtitleStyle={{ color: 'white' }}
                    subtitle="13.02.2021 - 15.02.2021"
                    chevron={{ color: 'white' }}
                    />
                </View>
            </ScrollView>
        )
    }
}
