import React from 'react';
import { View } from 'react-native';

import ToolbarButton from './ToolbarButton/ToolbarButton';
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

      {addingMarkerActive && (
        <Searchbar
          type="title"
          styles={styles}
          markerTitle={markerTitle}
          setMarkerTitle={setMarkerTitle}
        />
      )}
    </View>
  </View>
);

export default Toolbar;
