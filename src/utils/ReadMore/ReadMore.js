import React, { memo, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './ReadMoreStyle';

const NUM_OF_LINES = 3;

const ReadMore = ({ longText }) => {
  const [readMore, setReadMore] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const onTextLayout = useCallback(
    (e) => setShowMore(e.nativeEvent.lines.length >= NUM_OF_LINES),
    [],
  );

  return (
    <View>
      {readMore === false ? (
        <Text
          numberOfLines={showMore ? NUM_OF_LINES - 1 : undefined}
          ellipsizeMode="tail"
          onTextLayout={onTextLayout}
          style={styles.text}
        >
          {longText}
        </Text>
      ) : (
        <Text style={styles.text}>{longText}</Text>
      )}

      {showMore && (
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            setReadMore((prevState) => !prevState);
          }}
        >
          <View style={styles.textContainer}>
            <Text style={styles.clickableText}>
              {readMore === false ? 'Read more' : 'Show less'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(ReadMore);
