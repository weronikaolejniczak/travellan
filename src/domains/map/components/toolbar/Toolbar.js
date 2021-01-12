import React from 'react';
import { View } from 'react-native';

import ToolbarButton from './toolbarButton/ToolbarButton';
import { Searchbar } from 'utils';
import { styles } from './ToolbarStyle';

const Toolbar = ({
  addingActivityHandler,
  addingMarkerActive,
  searchingActive,
  searchingActivityHandler,
  deletingActivityHandler,
  deletingMarkerActive,
  isLoading,
  markerTitle,
  searchQuerry,
  onExitHandler,
  setMarkerTitle,
  setSearchQuerry,
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
      <ToolbarButton
        icon="map-search"
        isLoading={isLoading}
        loader={false}
        handler={searchingActive}
        onPress={searchingActivityHandler}
      />
    </View>

    {addingMarkerActive && (
      <Searchbar
        icon="map-marker-question"
        placeholder={addingMarkerActive && 'Enter marker title'}
        value={markerTitle}
        onChangeText={(text) => setMarkerTitle(text)}
      />
    )}

    {searchingActive && (
      <Searchbar
        icon="map-marker-question"
        placeholder={searchingActive && 'Search'}
        value={searchQuerry}
        onChangeText={(text) => setSearchQuerry(text)}
      />
    )}
  </View>
);

export default Toolbar;
