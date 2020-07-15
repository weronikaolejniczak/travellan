import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ShareExtension from 'rn-extensions-share';

class Home extends React.Component {
  state = {
    type: '',
    value: '',
  };

  componentWillMount() {
    ShareExtension.data().then(({type, value}) => {
      this.setState({type, value});
    });
  }

  render() {
    const {type, value} = this.state;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'red',
        }}>
        <TouchableOpacity onPress={() => ShareExtension.close()}>
          <Text style={{fontSize: 36}}>X</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 36}}>{type}</Text>
        <Text style={{fontSize: 11}}>{value}</Text>
      </View>
    );
  }
}

export default Home;
