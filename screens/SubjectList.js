import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const SubjectList = ({ navigation, route }) => {
  const  subject  = route.params.subject;
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');


  useEffect(() => {
    const fetchTasks = async () => {
      const taskSnapshot = await firebase.firestore().collection('tasks').where('subjectId', '==', subject.id).get();
      const taskData = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskData);
    };
    fetchTasks();
  }, [subject])
  ;

  const handleAddTask = async () => {
    if (newTask.trim() === '') {
      return;
    }
    const newTaskData = {
      description: newTask.trim(),
      subjectId: subject.id,
      isCompleted: false,
    };
    const taskRef = firebase.firestore().collection('tasks').doc();
    await taskRef.set(newTaskData);
    setTasks(prevState => [...prevState, { ...newTaskData, id: taskRef.id }]);
    setNewTask('');
  };

  const handleCompleteTask = async (taskId) => {
    const taskRef = firebase.firestore().collection('tasks').doc(taskId);
    await taskRef.update({ isCompleted: true });
    setTasks(prevState => prevState.map(task => task.id === taskId ? { ...task, isCompleted: true } : task));
  };

  return (
    
    <View style={styles.container}>
    
      <Text style={styles.subjectName}>{subject.subjectName}</Text>
      <Text style={styles.subjectTeacher}>{subject.lastName} {subject.firstName} {subject.middleName}</Text>
      <Text style={styles.subjectGroup}>{subject.groupSub}</Text>
      <View style={styles.taskContainer}>
        <TextInput
          style={styles.taskInput}
          placeholder="Додати завдання..."
          value={newTask}
          onChangeText={text => setNewTask(text)}
        />
        <TouchableOpacity
          onPress={handleAddTask}
          style={styles.buttonStyle}
        >
          <Text style={styles.addTask}>Додати</Text>
        </TouchableOpacity>
        {/* <Button title="Додати" onPress={handleAddTask} style={{backgroundColor: "black"}}/> */}
      </View>
      
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <Text style={task.isCompleted ? styles.completedTaskDescription : styles.taskDescription}>{task.description}</Text>
            {!task.isCompleted && (
              <TouchableOpacity
                onPress={() => handleCompleteTask(task.id)}
                style={styles.buttonStyle}
              >
                <Text style={styles.addTask}>Завершити</Text>
              </TouchableOpacity>

            )}
          </View>
        ))
      ) : (
      
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>Немає завдань для цього предмету...</Text>
        </View>
      )}
    </View>
  );
    
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  subjectName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addTask: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  subjectTeacher: {
    fontSize: 18,
    marginBottom: 5,
  },
  subjectGroup: {
    fontSize: 16,
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonStyle: {
    width: '20%',
    backgroundColor: '#232323',
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',


  },
  taskInput: {
    flex: 1,
    height: 40,
    marginRight: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  taskDescription: {
    flex: 1,
    fontSize: 16,
  },
  completedTaskDescription: {
    flex: 1,
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  noTasksContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTasksText: {
    fontSize: 18,
    color: '#888',
  },
});

export default SubjectList;