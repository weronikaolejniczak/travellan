import React from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Main/Actions'
import { liveInEurope } from 'App/Stores/Main/Selectors'
import styles from './MainScreenStyle'
import { ApplicationStyles, Helpers, Images } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'


/**
 * 
 * This screen displays a little help message and informations about a fake user.
 * 
 */

class MainScreen extends React.Component {
  componentDidMount() {
    this._fetchUser()
  }

  render() {
    return (
      <View style={[ApplicationStyles.screenBackground, Helpers.fill]}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={{margin: 30, flex: 1, justifyContent: 'center'}}>
            <View style={styles.logoContainer}>
              <Image style={Helpers.fullSize} source={Images.logo} resizeMode={'contain'} />
            </View>

            {this.props.userErrorMessage ? (
              <Text style={styles.error}>{this.props.userErrorMessage}</Text>
            ) : (
              <View>
                <Text style={[styles.result, ApplicationStyles.text]}>
                  {"I'm a fake user, my name is "}
                  {this.props.user.name}
                </Text>
                <Text style={[styles.result, ApplicationStyles.text]}>
                  {this.props.liveInEurope ? 'I live in Europe !' : "I don't live in Europe."}
                </Text>
              </View>
            )}

            <View style={Helpers.center}>
              <TouchableOpacity style={[ApplicationStyles.button]} onPress={() => this._fetchUser()}>
                <Text style={ApplicationStyles.buttonText}>{'Refresh'.toUpperCase()}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[ApplicationStyles.button]} onPress={() => this._openMenu()}>
                <Text style={ApplicationStyles.buttonText}>{'Continue'.toUpperCase()}</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
      </View>
    )
  }

  _fetchUser() {
    this.props.fetchUser()
  }

  _openMenu() {
    NavigationService.navigate('MenuScreen')
  }
}

MainScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
