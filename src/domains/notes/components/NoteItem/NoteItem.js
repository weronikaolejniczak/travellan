import React from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Card from 'components/card/Card';
import ReadMore from 'components/readMore/ReadMore';
import {styles} from './NoteStyle';

const NoteItem = (props) => {
  const {category, deleteNoteHandler, description, id, title} = props;
  const toDoList = description.split(' ').join('\n');
  const convertedId = id.split(' ');
  const extractedDate = `${convertedId[2]} ${convertedId[1]} 
  ${convertedId[4].split(':')[0]}:${convertedId[4].split(':')[0]}`;

  return (
    <ScrollView>
      {category === 'To Pack' ? (
        <Card style={styles.noteCard}>
          <View style={styles.actions}>
            <Text numberOfLines={1} style={styles.subtitle}>
              {category}
            </Text>
            <TouchableOpacity onPress={deleteNoteHandler}>
              <Icon name="delete" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.bodyMargin}>
            <Text style={styles.create}>{extractedDate}</Text>
            <View style={[styles.alignText]}>
              <ReadMore longText={toDoList} />
            </View>
          </ScrollView>
        </Card>
      ) : (
        <Card style={styles.noteCard}>
          <View style={styles.actions}>
            <Text numberOfLines={1} style={styles.subtitle}>
              {category}
            </Text>
            <TouchableOpacity onPress={deleteNoteHandler}>
              <Icon name="delete" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.bodyMargin}>
            <Text style={styles.create}>{extractedDate}</Text>
            <Text style={styles.category}>{title}</Text>
            <View style={[styles.alignText]}>
              <ReadMore longText={description} />
            </View>
          </ScrollView>
        </Card>
      )}
    </ScrollView>
  );
};

export default NoteItem;
