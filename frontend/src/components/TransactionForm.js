import { useState } from 'react';

export default function TransactionForm({ onAddTransaction }) {
    const [amount, setAmount] = useState('');
    
    const handleAdd = () => {
        if (!amount || isNaN(amount)) return;

        onAddTransaction({type:'credit', amount: Number(amount)});
        setAmount('');
    };

    const handleSubstract = () => {
        if (!amount || isNaN(amount)) return;

        onAddTransaction({type:'debit', amount: Number(amount)});
        setAmount('');
    };

    return (
        <div className="transaction-form">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <button onClick={handleAdd}>+</button>
            <button onClick={handleSubstract}>-</button>
        </div>
    );
}