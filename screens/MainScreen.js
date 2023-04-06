import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const MainScreen = ({ navigation, route }) => {
  const [subjects, setSubjects] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUser = async () => {
      const userSnapshot = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get();
      setCurrentUser(userSnapshot.data());
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      let query = firebase.firestore().collection('subjects');
      if (currentUser) {
        if (currentUser.userType === 'Студент') {
          query = query.where('groupSub', '==', currentUser.group);
        } else if (currentUser.userType === 'Викладач') {
          query = query.where('lastName', '==', currentUser.lastName).where('firstName', '==', currentUser.firstName);
        }
      }
      const snapshot = await query.get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSubjects(data);
      setLoading(false);
    };
    fetchSubjects();
  }, [currentUser]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleSubjectPress = (subject) => {
    navigation.navigate('SubjectList', { subject });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <TouchableOpacity style={styles.subjectContainer} key={subject.id} onPress={() => handleSubjectPress(subject)}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: subject.image }} />
              </View>
              <View>
                <Text style={styles.subjectName}>{subject.subjectName}</Text>
                <Text style={styles.subjectTeacher}>{subject.lastName} {subject.firstName} {subject.middleName}</Text>
                <Text style={styles.subjectGroup}>{subject.groupSub}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noSubjectsContainer}>
            <Text style={styles.noSubjectsText}>Не знайдено предметів...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subjectContainer: {
    backgroundColor: '#232323',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 150,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1E73BE'
  },
  subjectTeacher: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white'
  },
  subjectGroup: {
    fontSize: 16,
    color: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  noSubjectsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noSubjectsText: {
    fontSize: 20,
    textAlign: 'center',
  },
});


export default MainScreen;
