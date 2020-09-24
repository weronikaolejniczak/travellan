<View style={{position: 'absolute', left: 145, top: 500}}>
                  <TouchableOpacity
                    style={{
                      width: 75,
                      height: 75,
                      padding: 20,
                      borderRadius: 50,
                      backgroundColor: Colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setSending(true);
                    }}>
                    <Icon name="send" size={32} style={styles.text} />
                  </TouchableOpacity>
                </View>