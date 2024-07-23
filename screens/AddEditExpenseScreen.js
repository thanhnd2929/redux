import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addExpense, updateExpense } from '../redux/reducers/expenseReducer';
import { v4 as uuidv4 } from 'uuid';

const AddEditExpenseScreen = ({ route, navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('income');
  const dispatch = useDispatch();

  const expense = route.params?.expense;

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setDescription(expense.description);
      setAmount(expense.amount.toString());
      setDate(expense.date);
      setType(expense.type);
    }
  }, [expense]);

  const handleSave = () => {
    if (expense) {
      dispatch(updateExpense({ id: expense.id, title, description, amount: parseFloat(amount), date, type }));
    } else {
      dispatch(addExpense({ id: uuidv4(), title, description, amount: parseFloat(amount), date, type }));
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{expense ? 'Sửa khoản thu/chi' : 'Thêm khoản thu/chi'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tiêu đề"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Số tiền"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày thu chi"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Loại thu chi (income/expense)"
        value={type}
        onChangeText={setType}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});

export default AddEditExpenseScreen;
