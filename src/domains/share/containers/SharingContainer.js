import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { ScrollView as Container, Subheading, Paragraph } from 'utils';
import { Image, View } from 'react-native';

import { styles } from './SharingContainerStyle';

const SharingContainer = (props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Container style={styles.container}>
      <Subheading style={styles.subheading}>
        What is Travellan Share?
      </Subheading>
      <Paragraph style={styles.paragraph}>
        Along with the development of the Travellan application, option of
        saving information about accommodation has been added. This option is
        intended for users who have already booked their stay in a given hotel
        and want to keep all the most important information about their
        accommodation inside the application.
      </Paragraph>
      <Subheading style={styles.subheading}>
        What pages can be shared by Travellan?
      </Subheading>
      <Paragraph style={styles.paragraph}>
        Currently, Travellan Share is only compatible with hotel offers on the
        booking.com website.
      </Paragraph>
      <Subheading style={styles.subheading}>
        How to use Travellan Share?
      </Subheading>
      <Paragraph style={styles.paragraph}>
        <Paragraph style={([styles.paragraph], [styles.color])}>1.</Paragraph>{' '}
        Go to the website booking.com and find your hotel offer which you
        already booked {'\n'}
        <Paragraph style={([styles.paragraph], [styles.color])}>
          2.
        </Paragraph>{' '}
        Click on 'more' button and choose 'Share'{'\n'}
      </Paragraph>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={require('assets/images/MainShare.jpg')}
        />
      </View>
      <Paragraph style={styles.paragraph}>
        <Paragraph style={([styles.paragraph], [styles.color])}>3.</Paragraph>{' '}
        Choose TravellanShare
      </Paragraph>
      <View style={styles.imageView}>
        <Image
          style={styles.imageSmall}
          source={require('assets/images/ChooseTravellanShare.jpg')}
        />
      </View>
      <Paragraph style={styles.paragraph}>
        <Paragraph style={([styles.paragraph], [styles.color])}>4.</Paragraph>{' '}
        Wait until the data will load
      </Paragraph>
      <View style={styles.imageView}>
        <Image
          style={styles.imageLoading}
          source={require('assets/images/LoadingScreen.jpg')}
        />
      </View>
      <Paragraph style={styles.paragraph}>
        <Paragraph style={([styles.paragraph], [styles.color])}>5.</Paragraph>{' '}
        Check and verify your hotel data
      </Paragraph>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={require('assets/images/ScrappedData.jpg')}
        />
      </View>
      <Paragraph style={styles.paragraph}>
        <Paragraph style={([styles.paragraph], [styles.color])}>6.</Paragraph>{' '}
        Choose trip in which you want to save hotel and click submit
      </Paragraph>
      <View style={styles.imageView}>
        <Image
          style={styles.imageMedium}
          source={require('assets/images/SelectAndSubmit.jpg')}
        />
      </View>
      <Paragraph style={styles.paragraph}>
        <Paragraph style={([styles.paragraph], [styles.color])}>7.</Paragraph>{' '}
        Go to accommodation and enjoy most needed information about your hotel!
      </Paragraph>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={require('assets/images/HotelInAccommodationCard.jpg')}
        />
      </View>
    </Container>
  );
};

export default SharingContainer;
