import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const SubjectAddScreen = () => {
    const [subjectName, setSubjectName] = useState('');
    const [groupSub, setGroupSub] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');

    const handleAddSubject = async () => {
        try {
            await firebase.firestore().collection('subjects').add({
                subjectName,
                groupSub,
                lastName,
                firstName,
                middleName
            });
            console.log('Subject added successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Назва предмету:</Text>
            <TextInput style={styles.input} value={subjectName} onChangeText={setSubjectName} />
            <Text style={styles.label}>Група:</Text>
            <TextInput style={styles.input} value={groupSub} onChangeText={setGroupSub} />
            <Text style={styles.label}>Прізвище:</Text>
            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
            <Text style={styles.label}>Ім'я:</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
            <Text style={styles.label}>По батькові:</Text>
            <TextInput style={styles.input} value={middleName} onChangeText={setMiddleName} />
            <Button style={styles.button} title="Додати предмет" onPress={handleAddSubject} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    label: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      fontSize: 18,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    button: {
      marginTop: 20,
      backgroundColor: '#007AFF',
      borderRadius: 5,
    },
  });

export default SubjectAddScreen;
