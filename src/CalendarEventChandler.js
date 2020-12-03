//Import library for AddCalendarEvent
import
  * as AddCalendarEvent
from 'react-native-add-calendar-event';

//Import moment.js to deal with time
import moment from 'moment';



utcDateToString = (momentInUTC) => {
    let s = moment.utc(momentInUTC)
              .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return s;
  };


class AddEventToCalendar {


    addToCalendar = (title, startDateUTC, endDateUTC, location, notes) => {
        const eventConfig = {
          title,
          startDate: utcDateToString(startDateUTC),
          endDate: utcDateToString(endDateUTC),
          location: location,
          notes: notes,
        };
    
        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
        .then((eventInfo) => {
          console.log('eventInfo -> ' + JSON.stringify(eventInfo));
        })
        .catch((error) => {
          // handle error such as when user rejected permissions
          console.log('Error -> ' + error);
        });
    };


    
    editCalendarEventWithId = (eventId) => {
    if (!eventId) {
        console.log('Please Insert Event Id');
      return;
    }
    const eventConfig = {
      eventId,
    };
    
    AddCalendarEvent.presentEventEditingDialog(eventConfig)
      .then((eventInfo) => {
        console.log('eventInfo -> ' + JSON.stringify(eventInfo));
      })
      .catch((error) => {
        console.log('Error -> ' + error);
      });
  };

  showCalendarEventWithId = (eventId) => {
    if (!eventId) {
        console.log('Please Insert Event Id');
      return;
    }
    const eventConfig = {
      eventId,
      allowsEditing: true,
      allowsCalendarPreview: true,
      navigationBarIOS: {
        tintColor: 'orange',
        backgroundColor: 'green',
      },
    };
  
    AddCalendarEvent.presentEventViewingDialog(eventConfig)
      .then((eventInfo) => {
        console.log('eventInfo -> ' + JSON.stringify(eventInfo));
      })
      .catch((error) => {
        console.log('Error -> ' + error);
      });
  };

    

}

export const addEventToCalendar = new AddEventToCalendar()


