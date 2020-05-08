import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
/**
 * IMPORTS FROM WITHIN THE MODULE
 */
import Colors from '../../Constants/Colors';

/**
 * Custom component for 'read more/show less' functionality.
 * When used, a longText should be passed as such:
 * <ReadMore longText={props.description} />
 */
const ReadMore = (props) => {
  const [readMore, setReadMore] = useState(false);
  const truncate = (text) => {
    return text
      .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
      .split('|')
      .slice(0, 2)
      .join(' ');
  };

  return (
    <View>
      {readMore === false ? (
        <Text style={styles.text}>{truncate(props.longText)}</Text>
      ) : (
        <Text style={styles.text}>{props.longText}</Text>
      )}
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
