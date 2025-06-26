import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import List from "../components/List";

export default function Account() {
    const [transactions, setTransactions] = useState([]);

    const addTransaction = (newTransaction) => {
      setTransactions([...transactions, newTransaction]);
    }

    return (
    <div style={{ padding: "2rem" }}>
      <h1>Mon compte</h1>
      <TransactionForm onAddTransaction={addTransaction}/>
      
      <div className="transactions-list">
        <List transactions={transactions}/>
      </div>
    </div>
    );
}
