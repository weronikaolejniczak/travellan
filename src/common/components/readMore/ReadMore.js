import React, {useState, useCallback} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
/** IMPORTS FROM WITHIN THE MODULE */
import Colors from '../../constants/Colors';

/** Custom component for 'read more/show less' functionality.
 * When used, a longText should be passed as such:
 * <ReadMore longText={props.description} />
 */
const ReadMore = (props) => {
  const NUM_OF_LINES = 5;
  const [readMore, setReadMore] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const onTextLayout = useCallback(
    (e) => setShowMore(e.nativeEvent.lines.length >= NUM_OF_LINES),
    [],
  );
  /* const truncate = (text) => {
      return text
        .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
        .split('|')
        .slice(0, 2)
        .join(' ');
    }; */

  return (
    <View>
      {readMore === false ? (
        <Text
          numberOfLines={showMore ? 2 : undefined}
          ellipsizeMode="tail"
          onTextLayout={onTextLayout}
          style={styles.text}>
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
          }}>
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
