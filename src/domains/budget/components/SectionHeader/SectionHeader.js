import React, { memo } from 'react';
import { Text } from 'react-native';

import { Card } from 'utils';
import { styles } from './SectionHeaderStyle';

const SectionHeader = ({ children }) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.label}>{children}</Text>
    </Card>
  );
};

export default memo(SectionHeader);
