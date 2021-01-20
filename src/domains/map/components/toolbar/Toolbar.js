import React from 'react';
import { View } from 'react-native';

import ToolbarButton from './toolbarButton/ToolbarButton';
import { Searchbar } from 'utils';
import { styles } from './ToolbarStyle';

const Toolbar = ({
  addingActivityHandler,
  addingMarkerActive,
  deletingActivityHandler,
  deletingMarkerActive,
  isLoading,
  markerTitle,
  onExitHandler,
  setMarkerTitle,
}) => (
  <View style={styles.overlay}>
    <View style={styles.actionBar}>
      <ToolbarButton
        icon="close"
        isLoading={isLoading}
        loader={true}
        handler={false}
        onPress={onExitHandler}
      />
      <ToolbarButton
        icon="map-marker-plus"
        isLoading={isLoading}
        loader={false}
        handler={addingMarkerActive}
        onPress={addingActivityHandler}
      />
      <ToolbarButton
        icon="map-marker-minus"
        isLoading={isLoading}
        loader={false}
        handler={deletingMarkerActive}
        onPress={deletingActivityHandler}
      />
    </View>

    {addingMarkerActive && (
      <Searchbar
        icon="map-marker-question"
        placeholder={addingMarkerActive && 'Marker title'}
        value={markerTitle}
        onChangeText={(text) => setMarkerTitle(text)}
      />
    )}
  </View>
);

export default Toolbar;
