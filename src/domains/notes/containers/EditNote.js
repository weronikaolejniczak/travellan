import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as noteActions from 'notes/state/Actions';
import {addNoteStyle as styles} from './AddNoteStyle';
import Colors from 'constants/Colors';

const EditNote = props => {
    return (
        <ScrollView>
            <View>
                <Text>fdas</Text>
            </View>
        </ScrollView>
    )


}

export default EditProductScreen;