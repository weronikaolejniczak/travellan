import React, { memo } from 'react';

import Headline from 'utils/Typography/Headline';
import { View as Container } from 'utils/Frames/View';
import { styles } from './ItemlessFrameStyle';

const ItemlessFrame = ({ message }) => (
  <Container style={styles.container}>
    <Headline>{message}</Headline>
  </Container>
);

export default memo(ItemlessFrame);
