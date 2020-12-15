import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';

const utcDateToString = (momentInUTC) =>
  moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

class AddEventToCalendar {
  addToCalendar = (title, startDateUTC, endDateUTC, location, notes) => {
    const eventConfig = {
      title,
      startDate: utcDateToString(startDateUTC),
      endDate: utcDateToString(endDateUTC),
      location: location,
      notes: notes,
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig);
  };

  editCalendarEventWithId = (eventId) => {
    if (!eventId) {
      return;
    }

    const eventConfig = {
      eventId,
    };

    AddCalendarEvent.presentEventEditingDialog(eventConfig);
  };

  showCalendarEventWithId = (eventId) => {
    if (!eventId) {
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

    AddCalendarEvent.presentEventViewingDialog(eventConfig);
  };
}

export const addEventToCalendar = new AddEventToCalendar();
