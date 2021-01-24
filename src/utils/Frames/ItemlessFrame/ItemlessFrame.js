import React, { memo } from 'react';

import { View as Container, Headline } from '../../';
import { styles } from './ItemlessFrameStyle';

const ItemlessFrame = ({ children }) => (
  <Container style={styles.container}>
    <Headline>{children}</Headline>
  </Container>
);

export default memo(ItemlessFrame);
