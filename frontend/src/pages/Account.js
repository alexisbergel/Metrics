import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import List from "../components/List";
import styles from "./Account.module.css";

export default function Account() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3001/api/transactions')
        .then((response) => response.json())
        .then((data) => setTransactions(data))
        .catch((error) => console.error(error));
    }, []);
    
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
      <h1>main account</h1>
      <h2>342 €</h2>
      <TransactionForm onAddTransaction={addTransaction}/>
      
      <div className="transactions-list">
        <List transactions={transactions}/>
      </div>
    </div>
    );
}
