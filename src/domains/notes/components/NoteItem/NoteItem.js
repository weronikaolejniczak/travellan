import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';

import { Card, ReadMore } from 'utils';
import { styles } from './NoteItemStyle';

const NoteItem = (props) => {
  const { category, date, description, handleDelete, id, title } = props;
  const dateOfCreation = new Date(date).toLocaleString();
  const toDoList = description.split(' ').join('\n');

  return (
    <ScrollView>
      {category === 'To Pack' ? (
        <Card style={styles.noteCard}>
          <View style={styles.actions}>
            <Text numberOfLines={1} style={styles.subtitle}>
              {category}
            </Text>
            <TouchableOpacity onPress={() => handleDelete(id)}>
              <Icon name="delete" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.bodyMargin}>
            <Text style={styles.create}>{dateOfCreation}</Text>
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
            <TouchableOpacity onPress={handleDelete}>
              <Icon name="delete" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.bodyMargin}>
            <Text style={styles.create}>{dateOfCreation}</Text>
            <Text style={styles.category}>{title}</Text>
            <View style={styles.alignText}>
              <ReadMore longText={description} />
            </View>
          </ScrollView>
        </Card>
      )}
    </ScrollView>
  );
};

export default NoteItem;
