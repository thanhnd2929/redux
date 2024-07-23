import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense } from '../redux/reducers/expenseReducer';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const expenses = useSelector(state => state.expense.expenses);
  const dispatch = useDispatch();

  const totalIncome = expenses.filter(expense => expense.type === 'income').reduce((sum, expense) => sum + expense.amount, 0);
  const totalExpense = expenses.filter(expense => expense.type === 'expense').reduce((sum, expense) => sum + expense.amount, 0);

  const filteredExpenses = expenses.filter(expense => expense.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý chi tiêu</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm theo tiêu đề"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text>Tổng thu: {totalIncome}</Text>
      <Text>Tổng chi: {totalExpense}</Text>
      <FlatList
        data={filteredExpenses}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.title} - {item.amount} - {item.type}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('AddEditExpense', { expense: item })} />
            <Button title="Delete" onPress={() => dispatch(deleteExpense(item.id))} />
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEditExpense')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  searchInput: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0066CC',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
  },
});

export default HomeScreen;
