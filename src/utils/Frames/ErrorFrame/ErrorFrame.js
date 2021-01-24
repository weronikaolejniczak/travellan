import React, { memo } from 'react';

import { View as Container, Headline, Subheading } from '../../';
import { styles } from './ErrorFrameStyle';

const ErrorFrame = ({ error }) => {
  <Container style={styles.container}>
    <Headline>An error has occured!</Headline>
    <Subheading style={styles.error}>{error}</Subheading>
  </Container>;
};

export default memo(ErrorFrame);
