import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from 'constants/Colors';

const ReadMore = (props) => {
  const NUM_OF_LINES = 3;
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
          {props.longText}
        </Text>
      ) : (
        <Text style={styles.text}>{props.longText}</Text>
      )}

      {showMore && (
        <TouchableOpacity
          style={styles.text}
          onPress={() => {
            setReadMore((prevState) => !prevState);
          }}
        >
          {readMore === false ? (
            <View style={styles.textContainer}>
              <Text style={styles.clickableText}>Read more</Text>
            </View>
          ) : (
            <View style={styles.textContainer}>
              <Text style={styles.clickableText}>Show less</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginVertical: 5,
  },
  text: {
    color: Colors.text,
  },
  clickableText: {
    color: Colors.primary,
  },
});

export default ReadMore;
