import React, { memo } from 'react';

import { View as Container } from 'utils';
import Headline from 'utils/Typography/Headline';
import { styles } from './ItemlessFrameStyle';

const ItemlessFrame = ({ children }) => (
  <Container style={styles.container}>
    <Headline style={styles.headline}>{children}</Headline>
  </Container>
);

export default memo(ItemlessFrame);
