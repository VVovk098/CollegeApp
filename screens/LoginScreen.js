import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const LoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      alert(error)
    }
  }

  // forget password
  const forgetPassword = () => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert('Password reset email sent!')
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <View style={style.container}>
    
      <Image style={style.logo} source={require('../assets/CollegeLogo.png')} />
      <Text style={style.title}>Введіть дані для входу</Text>
      <View style={style.inputContainer}>
        <TextInput style={style.input}
          placeholder="Електрона пошта"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput style={style.input}
          placeholder="Пароль"
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={style.loginButton}
      >
        <Text style={style.loginButtonText}>Ввійти</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={style.registerButton}
      >
        <Text style={style.registerText}>
          Немає облікового запису? Реєстрація
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => { forgetPassword() }}
      >
        <Text style={style.forgotPassword}>
          Забули пароль?
        </Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default LoginScreen

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
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#232323',
    marginBottom: 10,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#E1E1E1',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: 20,
  },
  loginButton: {
    width: '50%',
    backgroundColor: '#232323',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#232323',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 32,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  registerText: {
    color: '#232323',
    fontSize: 16,
    marginRight: 4,
  },
  registerButton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});