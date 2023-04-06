import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUser(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const handleSignOut = () => {
    firebase.auth().signOut();
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Прізвище:</Text>
        <Text style={styles.fieldValue}>{user.lastName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Ім'я:</Text>
        <Text style={styles.fieldValue}>{user.firstName}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Email:</Text>
        <Text style={styles.fieldValue}>{user.email}</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldTitle}>Тип користувача:</Text>
        <Text style={styles.fieldValue}>{user.userType}</Text>
      </View>
      {/* Add more fields as needed */}
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Вийти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fieldContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  fieldTitle: {
    fontWeight: "bold",
    marginRight: 10,
  },
  fieldValue: {
    flex: 1,
  },
  signOutButton: {
    backgroundColor: "#232323",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginTop: 20,
  },
  signOutText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileScreen;