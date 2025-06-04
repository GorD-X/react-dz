import React from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseTable from './components/ExpenseTable';
import Charts from './components/Charts';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <h1>Учет расходов</h1>
        <ExpenseForm />
        <ExpenseTable />
        <Charts />
      </div>
    </AppProvider>
  );
}

export default App;