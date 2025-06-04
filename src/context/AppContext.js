import React, { createContext, useState, useEffect } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedData = loadFromLocalStorage('transactions');
    if (savedData) setTransactions(savedData);
  }, []);

  const addTransaction = (transaction) => {
    const newTransaction = { ...transaction, id: Date.now() };
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    saveToLocalStorage('transactions', updatedTransactions);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(updatedTransactions);
    saveToLocalStorage('transactions', updatedTransactions);
  };

  return (
    <AppContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);