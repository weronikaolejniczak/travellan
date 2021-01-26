import React, { memo } from 'react';

import Headline from 'utils/Typography/Headline';
import { View as Container } from 'utils';
import { styles } from './ItemlessFrameStyle';

const ItemlessFrame = ({ children }) => (
  <Container style={styles.container}>
    <Headline>{children}</Headline>
  </Container>
);

export default memo(ItemlessFrame);
