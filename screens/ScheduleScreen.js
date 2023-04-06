import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigation } from '@react-navigation/native';

const ScheduleScreen = ({ route }) => {
    const [schedule, setSchedule] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [userType, setUserType] = useState(null);
    const [userGroup, setUserGroup] = useState(null);
    const [userLastName, setUserLastName] = useState(null);
    const [userFirstName, setUserFirstName] = useState(null);
    const currentDate = new Date();

    const navigation = useNavigation()

    useEffect(() => {
        const fetchSchedule = async () => {
            console.log("Fetching schedule data...");
            const snapshot = await firebase.firestore().collection('schedule').get();
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSchedule(data);
        };
        fetchSchedule();
    }, []);

    useEffect(() => {
        const fetchSubjects = async () => {
            console.log("Fetching subjects data...");
            const snapshot = await firebase.firestore().collection('subjects').get();
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSubjects(data);
        };
        fetchSubjects();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            console.log("Fetching user data...");
            const user = firebase.auth().currentUser;
            if (user) {
                const userData = await firebase.firestore().collection('users').doc(user.uid).get();
                setUserType(userData.data().userType);
                if (userData.data().userType === 'Студент') {
                    setUserGroup(userData.data().group);
                } else if (userData.data().userType === 'Викладач') {
                    setUserLastName(userData.data().lastName);
                    setUserFirstName(userData.data().firstName);
                }
            } else {
                console.log('User not logged in.');
            }
        };
        fetchUserData();
    }, []);

    const filteredSchedule = userType === 'Студент'
        ? schedule.filter(item => item.groupId === userGroup)
        : schedule.filter(item => item.teacher === `${userLastName} ${userFirstName}`);

    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "+"];

    const [selectedDay, setSelectedDay] = useState(null);
    const handleAddSchedule = () => {
        navigation.navigate('AddScheduleScreen');
    }

    const handleDayPress = (day) => {
        setSelectedDay(day);
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} style={{ height: 50, width: '90%', borderRadius: 15 }} showsHorizontalScrollIndicator={false}>
                {daysOfWeek.map(day => (
                    <TouchableOpacity
                        key={day}
                        style={[styles.dayButton, selectedDay === day && styles.selectedDayButton]}
                        onPress={() => handleDayPress(day)}
                    >
                        <Text style={[styles.dayButtonText, selectedDay === day && styles.selectedDayButtonText]}>
                            {day}
                        </Text>
                    </TouchableOpacity>

                ))}
            </ScrollView>
            {selectedDay ? (
                <>

                    {filteredSchedule.filter(item => item.dayOfWeek === selectedDay).length > 0 ? (
                        <FlatList style={{ height: 600 }}
                            data={filteredSchedule.filter(item => item.dayOfWeek === selectedDay).sort((a, b) => a.lesson - b.lesson)}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.subjectContainer} key={item.id} onPress={() => handleSubjectPress(item)}>
                                    <View>
                                        <Text style={styles.lesson}>{item.lesson} пара</Text>
                                        <Text style={styles.subjectGroup}>{item.time}</Text>
                                        <Text style={styles.subjectName}>{item.subject}</Text>
                                        <Text style={styles.subjectTeacher}>{item.teacher}</Text>
                                        {/* <Text style={styles.subjectGroup}>{item.groupId}</Text> */}
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    ) : (
                        <View style={styles.noScheduleContainer}>
                            <TouchableOpacity style={styles.addButton} onPress={handleAddSchedule}>
                                <Text style={styles.noScheduleText}>Додати розклад</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </>
            ) : (
                <View style={styles.noSelectedDayContainer}>
                    <Text style={styles.noSelectedDayText}>Виберіть день</Text>
                </View>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    headerButton: {
        marginRight: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
    },
    subjectContainer: {
        backgroundColor: '#232323',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,
        width: Dimensions.get('window').width * 0.9
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
        color: 'white'
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
    lesson: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dayButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        height: 75,
        width: 75
    },
    dayButton: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 0,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 10,
        height: 50,
        width: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDayButton: {
        backgroundColor: '#232323',
        height: 50,
        width: 75
    },
    dayButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    selectedDayButtonText: {
        color: '#fff',
    },
    dateText: {
        fontSize: 12,
        color: '#777',
    },
    dayScheduleHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    listItem: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,

    },
    listItemText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    noScheduleContainer: {
        width: '60%',
        backgroundColor: '#232323',
        borderRadius: 15,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 50,
    },
    noScheduleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    noSelectedDayContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80%'
    },
    noSelectedDayText: {
        fontSize: 16,
        color: '#777',
    },
});


export default ScheduleScreen;


