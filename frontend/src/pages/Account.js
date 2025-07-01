import { useState, useEffect } from "react";
import Header from "../components/Header";
import TransactionForm from "../components/TransactionForm";
import List from "../components/List";
import styles from "./Account.module.css";

export default function Account() {
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);

    // Fetch transactions from the API
    useEffect(() => {
      fetch('http://localhost:3001/api/transactions')
        .then((response) => response.json())
        .then((data) => setTransactions(data))
        .catch((error) => console.error(error));
    }, []);

    // Calculate the total amount from transactions
    useEffect(() => {
      const totalAmount = transactions.reduce((acc, transaction) => {
        return transaction.type === 'credit' ? acc + transaction.amount : acc - transaction.amount;
      }, 0);
      setTotal(totalAmount / 100);
    }, [transactions]);
    
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

    return (
    <div className={styles.account}>
      <Header total={total}/>
      <TransactionForm onAddTransaction={addTransaction}/>
      
      <div>
        <List transactions={transactions}/>
      </div>
    </div>
    );
}
