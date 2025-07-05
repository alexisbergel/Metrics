import { useState, useEffect } from "react";
import Header from "../components/Header";
import TransactionForm from "../components/TransactionForm";
import List from "../components/List";
import styles from "./Account.module.css";

export default function Account() {
    const [transactions, setTransactions] = useState([]);

    // Fetch transactions from the API
    useEffect(() => {
      fetch('http://localhost:3001/api/transactions')
        .then((response) => response.json())
        .then((data) => setTransactions(data))
        .catch((error) => console.error(error));
    }, []);

    let totalAmount = 0;
    let executedTotalAmount = 0;

    transactions.forEach(transaction => {
      const amount = transaction.type === 'credit' ? transaction.amount : -transaction.amount;
      totalAmount += amount;
      if (transaction.executed) executedTotalAmount += amount;
    });

    totalAmount = totalAmount / 100;
    executedTotalAmount = executedTotalAmount / 100;

    // Calculate the total amount from transactions
    /*let totalAmount = transactions.reduce((acc, transaction) => {
        return transaction.type === 'credit' ? acc + transaction.amount : acc - transaction.amount;
      }, 0);
    totalAmount = totalAmount / 100;*/



    // Function to add a new transaction
    const addTransaction = (newTransaction) => {
      fetch('http://localhost:3001/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      })
        .then((response) => response.json())
        .then((data) => {
          setTransactions([data, ...transactions]);
        })
        .catch((error) => console.error(error));
    }

    // Function to toggle the execution state of a transaction
    const toggleExecute = async (id, newState) => {
      try {
        const response = await fetch(`http://localhost:3001/api/transactions/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ executed: newState }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedTransaction = await response.json();

        setTransactions(transactions.map(transaction => 
          transaction.id === id ? updatedTransaction : transaction
        ));

      } catch (error) {
        console.error("Error updating transaction execution state:", error);
        throw error; // Re-throw the error to be handled by the caller
      }
    }

    return (
    <div>
      <div className={styles.account}>
        <Header totalAmount={totalAmount} executedTotalAmount={executedTotalAmount}/>
        <TransactionForm onAddTransaction={addTransaction}/>
        <List transactions={transactions} onToggleExecute={toggleExecute}/>
      </div>
    </div>
    );
}
