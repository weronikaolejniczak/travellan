//Import library for AddCalendarEvent
import
  * as AddCalendarEvent
from 'react-native-add-calendar-event';

//Import moment.js to deal with time
import moment from 'moment';


class AddEventToCalendar {

    utcDateToString = (momentInUTC) => {
        let s = moment.utc(momentInUTC)
                  .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        return s;
      };

    addToCalendar = (title, startDateUTC) => {
        const eventConfig = {
          title,
          startDate: utcDateToString(startDateUTC),
          endDate: 
          utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
          description: 'tasty!',
        };
    
        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
        .then((eventInfo) => {
          alert('eventInfo -> ' + JSON.stringify(eventInfo));
        })
        .catch((error) => {
          // handle error such as when user rejected permissions
          alert('Error -> ' + error);
        });
    };


    
    editCalendarEventWithId = (eventId) => {
    if (!eventId) {
      alert('Please Insert Event Id');
      return;
    }
    const eventConfig = {
      eventId,
    };
  
    AddCalendarEvent.presentEventEditingDialog(eventConfig)
      .then((eventInfo) => {
        alert('eventInfo -> ' + JSON.stringify(eventInfo));
      })
      .catch((error) => {
        alert('Error -> ' + error);
      });
  };

  showCalendarEventWithId = (eventId) => {
    if (!eventId) {
      alert('Please Insert Event Id');
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
        alert('eventInfo -> ' + JSON.stringify(eventInfo));
      })
      .catch((error) => {
        alert('Error -> ' + error);
      });
  };

    

}

export const EventToCalendar = new AddEventToCalendar()



