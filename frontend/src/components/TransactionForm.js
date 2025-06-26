import { useState } from 'react';

export default function TransactionForm({ onAddTransaction }) {
    const [amount, setAmount] = useState('');

    const addTransaction = (e, type) => {
        e.preventDefault();
        if (!amount || isNaN(amount)) return;

        onAddTransaction({type: 'credit', amount: Number(amount)});
        setAmount('');
    }

    return (
        <div className="transaction-form">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <button onClick={ (e) => addTransaction(e, 'credit')}>+</button>
            <button onClick={ (e) => addTransaction(e, 'debit')}>-</button>
        </div>
    );
}