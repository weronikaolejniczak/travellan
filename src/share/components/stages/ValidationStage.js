import React from 'react';
import {View, StyleSheet} from 'react-native';
/* IMPORTS FROM WITHIN THE MODULE */
import AccommodationCard from '../molecules/AccommodationCard';

const ValidationStage = (props) => {
  console.log('render');
  return (
    <View style={styles.dataContainer}>
      <AccommodationCard
        imageUrl={
          'https://q-cf.bstatic.com/images/hotel/max1280x900/224/224237421.jpg'
        }
        type={'hotel'}
        name={'Platinum Mountain Hotel&SPA'}
        address={'Kilińskiego, 58-580 Szklarska Poręba, Poland'}
        ammenities={[
          '2 swimming pools',
          'Pet friendly',
          'Spa',
          'Parking',
          'Free WiFi',
          'Bar',
          'Tea/Coffee Maker in All Rooms',
        ]}
        description={
          'Located in Szklarska Poręba, a 10-minute walk from Szklarska Poreba Bus Station, Platinum Mountain Hotel&SPA provides accommodations with a bar and private parking. Offering a restaurant, the property also has a seasonal outdoor swimming pool, as well as an indoor pool and a fitness center. The property has a 24-hour front desk, airport transportation, room service and free WiFi throughout the property. The rooms comes with air conditioning, a flat-screen TV with satellite channels, a fridge, an electric tea pot, a shower, a hairdryer and a desk. Rooms are complete with a private bathroom equipped with free toiletries, while certain accommodations at the hotel also feature a seating area. All guest rooms have a closet. Guests at Platinum Mountain Hotel&SPA can enjoy a continental breakfast. The accommodation offers 5-star accommodations with a hammam and playground. The area is popular for skiing and cycling, and ski equipment rental is available at Platinum Mountain Hotel&SPA. Popular points of interest near the hotel include Szrenica Hill, Mineralogy Museum and Babiniec Winter Sports Centre.'
        }
        attractions={[{id: 0, name: 'Resort', distance: '0.3km'}]}
        hotelRules={{checkIn: 'From 4:00 PM', checkOut: 'Until 11:00 AM'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    marginTop: '2%',
    marginBottom: '5%',
  },
});

export default ValidationStage;
