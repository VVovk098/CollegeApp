import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const RegisterScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [userType, setUserType] = useState('student')
    const [group, setGroup] = useState('');

    const userTypes = ['Студент', 'Викладач'];
    const groups = ['ПТО-1', 'Право-1', 'КН-1', 'ІПЗ-1', 'ПТО-2', 'Право-2', 'КН-2', 'ПТО-3', 'Право-3', 'КН-3', 'ІПЗ-3', 'ПТО-3', 'Право-3', 'КН-3', 'Право-4', 'КН-4', 'ІПЗ-4'];


    const handleUserTypeChange = (value) => {
        setUserType(value);
        if (value === 'Студент') {
            setGroup('');
        }
    };

    const handleGroupChange = (value) => {
        setGroup(value);
    };

    const registerUser = async () => {
        // const teacherId = lastName + firstName + middleName;
        // const studentId = lastName + firstName + middleName;

        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    url: 'collegeapp-6ca8e.firebaseapp.com',
                })
                    .then(() => {
                        alert("Email sent")
                    }).catch((error) => {
                        alert(error)
                    })
                    .then(() => {
                        const Ref = firebase.firestore().collection("users")
                            .doc(firebase.auth().currentUser.uid);
                        if (userType === "Викладач") {
                            const userRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);

                            userRef.set({
                                lastName,
                                firstName,
                                middleName,
                                email,
                                password,
                                userType,
                                
                                group,
                            })
                        } else {
                            const userRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);
                            userRef.set({
                                lastName,
                                firstName,
                                middleName,
                                email,
                                password,
                                userType,
                                
                                group,
                            })
                        }
                    })
                    .catch((error) => {
                        alert(error)
                    })
            })
            .catch((error) => {
                alert('Введіть всі дані')
            })
    }

    return (
        
        <View style={styles.container}>
        
            <Image style={styles.logo} source={require('../assets/CollegeLogo.png')} />
            <Text style={styles.title}>
                Введіть всі дані для реєстрації!
            </Text>
            <View style={styles.inputContainer}>
            
                <TextInput style={styles.textInput}
                    placeholder="Прізвище"
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                />
                <TextInput style={styles.textInput}
                    placeholder="Ім'я"
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                />
                <TextInput style={styles.textInput}
                    placeholder="По батькові"
                    onChangeText={(middleName) => setMiddleName(middleName)}
                    autoCorrect={false}
                />
                <TextInput style={styles.textInput}
                    placeholder="Електрона пошта"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <TextInput style={styles.textInput}
                    placeholder="Пароль"
                    onChangeText={(password) => setPassword(password)}
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
                <SelectDropdown
                    data={userTypes}
                    onSelect={(value) => handleUserTypeChange(value)}
                    defaultButtonText="Виберіть тип користувача"
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={10} width={20} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />
                {userType === 'Студент' && (
                    <SelectDropdown
                        data={groups}
                        onSelect={(value) => handleGroupChange(value)}
                        defaultButtonText="Виберіть групу"
                        buttonStyle={styles.dropdown1BtnStyle}
                        buttonTextStyle={styles.dropdown1BtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={10} width={20} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown1DropdownStyle}
                        rowStyle={styles.dropdown1RowStyle}
                        rowTextStyle={styles.dropdown1RowTxtStyle}
                    />
                )}
                
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email, password, firstName, lastName, middleName)}
                style={styles.button}
            >
                <Text style={styles.registerButtonText}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.loginButton}
            >
                <Text style={styles.loginText}>
                    Вже є обліковий запис? Вхід
                </Text>

            </TouchableOpacity>
           
        </View>
        
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: 'white',
    },
    logo: {
        width: 50,
        height: 75,
        marginBottom: -60,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#232323',
        marginTop: 80,
        marginBottom: 10,
    },
    inputIcon: {
        marginRight: 10,
        width: 10,
        height: 10,
    },
    textInput: {
        backgroundColor: '#E1E1E1',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        marginTop: 20,
        color: '#222222',
    },
    button: {
        width: '50%',
        backgroundColor: '#232323',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    loginText: {
        color: '#232323',
        fontSize: 16,
        marginRight: 4,
    },
    loginButton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 16,
    },
    dropdown1BtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#E1E1E1',
        borderRadius: 8,
        marginTop: 20,
        color: 'E1E1E1'
    },
    dropdown1BtnTxtStyle: {
        color: '#222222',
        fontSize: 16,
        textAlign: 'left'
    },
    dropdown1DropdownStyle: {
        backgroundColor: 'white',
        fontSize: 10,
        borderRadius: 10,
    },
    dropdown1RowStyle: {
        backgroundColor: 'white',
        borderBottomColor: '#C5C5C5',

    },
    dropdown1RowTxtStyle: {
        color: '#222222',
        textAlign: 'left',
        fontSize: 16,
    },
});