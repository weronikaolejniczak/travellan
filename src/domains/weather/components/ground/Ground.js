import React from 'react';
import {Dimensions} from 'react-native';
/* imports from within the module */
import Grass from 'assets/images/grass.svg';
import SnowGround from 'assets/images/snow_ground.svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Ground = (props) => {
  if (props.activeDay.main === 'Snow') {
    return <SnowGround width={windowWidth} height={windowHeight * 0.04} />;
  } else {
    return <Grass width={windowWidth} height={windowHeight * 0.04} />;
  }
};

export default Ground;
