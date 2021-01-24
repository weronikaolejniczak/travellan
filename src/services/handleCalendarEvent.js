import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';

const utcDateToString = (momentInUTC) =>
  moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

class AddEventToCalendar {
  addToCalendar = (title, startDateUTC, endDateUTC, location, notes) => {
    const eventConfig = {
      endDate: utcDateToString(endDateUTC),
      location: location,
      notes: notes,
      startDate: utcDateToString(startDateUTC),
      title,
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
      allowsCalendarPreview: true,
      allowsEditing: true,
      eventId,
      navigationBarIOS: {
        backgroundColor: 'green',
        tintColor: 'orange',
      },
    };

    AddCalendarEvent.presentEventViewingDialog(eventConfig);
  };
}

const addEventToCalendar = new AddEventToCalendar();

export default addEventToCalendar;
