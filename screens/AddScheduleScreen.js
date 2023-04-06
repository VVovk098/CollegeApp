import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddScheduleScreen = () => {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [lesson, setLesson] = useState('');
  const [groupId, setGroupId] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [loading, setLoading] = useState(true);
  const [scheduleCount, setScheduleCount] = useState(0);

  useEffect(() => {
    const fetchTeachers = async () => {
      const snapshot = await firebase.firestore().collection('teachers').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeachers(data);
    };
    fetchTeachers();
  }, []);



  const handleAddSchedule = async () => {
    try {
      await firebase.firestore().collection('schedule').add({
        dayOfWeek,
        lesson,
        groupId,
        subject: subjects,
        teacher: selectedTeacher,
      });
      alert('Розклад додано успішно!');
      setScheduleCount(count => count + 1);

    } catch (error) {
      console.log(error);
      alert('Помилка при додаванні розкладу!');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}  key={scheduleCount} showsVerticalScrollIndicator={false}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Предмет:</Text>
          <TextInput style={styles.textInput}
            placeholder="Введіть назву предмета"
            onChangeText={(subjects) => setSubjects(subjects)}
            autoCorrect={false}
          />
          <Text style={styles.label}>День тижня:</Text>
          <SelectDropdown
            data={['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
            onSelect={(selectedItem) => setDayOfWeek(selectedItem)}
            defaultButtonText="Оберіть день тижня"
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
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Група:</Text>
          <SelectDropdown
            data={['ПТО-1', 'Право-1', 'КН-1', 'ІПЗ-1', 'ПТО-2', 'Право-2', 'КН-2', 'ПТО-3', 'Право-3', 'КН-3', 'ІПЗ-3', 'ПТО-3', 'Право-3', 'КН-3', 'Право-4', 'КН-4', 'ІПЗ-4']}
            onSelect={(selectedItem) => setGroupId(selectedItem)}
            defaultButtonText={'Виберіть групу'}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
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
          <Text style={styles.label}>Пари:</Text>
          <SelectDropdown
            data={['1', '2', '3', '4', '5', '6', '7']}
            onSelect={(selectedItem) => setLesson(selectedItem)}
            defaultButtonText={'Виберіть пару'}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
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
          <Text style={styles.label}>Викладач:</Text>
          <SelectDropdown
            data={teachers.map((teacher) => `${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`)}
            onSelect={(selectedItem) => setSelectedTeacher(selectedItem)}
            defaultButtonText={'Виберіть викладача'}
            buttonTextAfterSelection={(selectedItem) => selectedItem}
            rowTextForSelection={(item) => item}
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
          <TouchableOpacity style={styles.addButton} onPress={handleAddSchedule}>
            <Text style={styles.addButtonText}>Додати</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  fieldContainer: {
    marginBottom: 0,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#E1E1E1',
    borderRadius: 8,
    marginTop: 0,
    marginBottom: 10,
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
  textInput: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#E1E1E1',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  addButton: {
    width: '60%',
    backgroundColor: '#232323',
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,

  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noScheduleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noScheduleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  subjectGroup: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  subjectName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  subjectTeacher: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
});


export default AddScheduleScreen;
