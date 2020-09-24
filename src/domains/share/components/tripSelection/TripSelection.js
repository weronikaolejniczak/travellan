{!!trips && (
    <Text style={[styles.text, styles.header]}>Add to trips:</Text>
  )}

  <ScrollView style={{marginTop: 10}}>
    {!!trips &&
      trips.map((trip) => (
        <TouchableOpacity onPress={() => Alert.alert('pressed!')}>
          <View
            style={{
              margin: 4,
              padding: 15,
              backgroundColor: Colors.primary,
              borderRadius: 50,
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.text,
                {fontWeight: 'bold', fontSize: 16},
              ]}>
              {trip.destination} (
              {trip.startDate.split(' ').slice(1, 4).join(' ')})
            </Text>
          </View>
        </TouchableOpacity>
      ))}
  </ScrollView>