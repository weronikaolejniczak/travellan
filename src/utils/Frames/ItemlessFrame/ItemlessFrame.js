import React from 'react';

import { View as Container, Headline } from '../../';
import { styles } from './ItemlessFrameStyle';

const ItemlessFrame = ({ message }) => {
  return (
    <Container style={styles.container}>
      <Headline>{message}</Headline>
    </Container>
  );
};

export default ItemlessFrame;
