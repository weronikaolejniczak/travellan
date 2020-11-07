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

const EditNote = (props) => {
const dispatch = useDispatch();
  const tripId = props.route.params.tripId;
  const selectedTrip = useSelector((state) =>
    state.trips.availableTrips.find((item) => item.id === tripId),
  );
    return (
        <ScrollView>
            <View>
                <Text>fdas</Text>
            </View>
        </ScrollView>
    )


}

export default EditNote;