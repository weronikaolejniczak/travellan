import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Platform, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
/* imports from within the module */
import Card from 'components/card/Card';
import ReadMore from 'components/readMore/ReadMore';
import { noteStyle as styles } from './NoteStyle';

/* note item component */
const Note = (props) => {
  var ToDoList = [];
  ToDoList = props.description.split(" ").join('\n')
  category = props.category;
  description= props.description;
  var convertedId = props.id.split(' ');
  var extractedDate =
    convertedId[2] +
    ' ' +
    convertedId[1] +
    ' ' +
    convertedId[4].split(':')[0] +
    ':' +
    convertedId[4].split(':')[1];

  /* handlers */
  /* const EditHandler = useCallback(() => { }, [dispatch, props.tripId, props.id]); */

  return (
    <ScrollView>
      { category === 'To Pack' ? ( 
         <Card style={styles.noteCard}>
         {/* ACTIONS BAR */}
         <View style={styles.actions}>
           <Text numberOfLines={1} style={styles.subtitle}>
             {props.category}
           </Text>
           <TouchableOpacity onPress={props.deleteNoteHandler}>
            <Icon
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* NOTE CONTENT */}
        <ScrollView style={styles.bodyMargin}>
          <Text style={styles.create}>{extractedDate}</Text>
          <View style={[styles.alignText]}>
            <ReadMore longText={ToDoList} />
          </View>
        </ScrollView>
      </Card>

      ) : ( 
        <Card style={styles.noteCard}>
         {/* ACTIONS BAR */}
         <View style={styles.actions}>
           <Text numberOfLines={1} style={styles.subtitle}>
             {props.category}
           </Text>
           <TouchableOpacity onPress={props.deleteNoteHandler}>
            <Icon
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* NOTE CONTENT */}
        <ScrollView style={styles.bodyMargin}>
          <Text style={styles.create}>{extractedDate}</Text>
          <Text style={styles.category}>{props.title}</Text>
          <View style={[styles.alignText]}>
            <ReadMore longText={props.description} />
          </View>
        </ScrollView>
      </Card>

      )}
      
    </ScrollView>
  );
};

export default Note;
