import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const StartScreen = () => {

  const navigation = useNavigation()

  return (
    <View style={style.container}>
      <Image style={style.logo} source={require('../assets/CollegeLogo.png')} />
      <Text style={style.title}>College App!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={style.button}
      >
        <Text style={style.buttonText}>Вхід</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={style.button}
      >
        <Text style={style.buttonText}>Реєстрація</Text>
      </TouchableOpacity>
    </View>
  )
}

export default StartScreen

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 150,
    top: -100,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#232323',
  },
  button: {
    width: '60%',
    backgroundColor: '#232323',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});