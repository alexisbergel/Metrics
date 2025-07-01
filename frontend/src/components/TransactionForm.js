import { useState } from 'react';
import styles from './TransactionForm.module.css';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg';

export default function TransactionForm({ onAddTransaction }) {
    const [amount, setAmount] = useState('');
    const [label, setLabel] = useState('');

    const addTransaction = (e, type) => {
        e.preventDefault();
        if (!amount || isNaN(amount)) return;

        // Amount, label, and type are required
        onAddTransaction({type: type, amount: Number(amount) * 100, label: label.trim()});
        setAmount('');
        setLabel('');
    }

    return (
        <div className={styles.transactionForm}>
            <div className={styles.inputs}>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="Description"
                />   
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00 €"
                /> 
            </div>

            <div className={styles.buttons}>
                <button onClick={ (e) => addTransaction(e, 'credit')}>
                    <ArrowIcon className={styles.arrowIcon} />
                </button>
                <button onClick={ (e) => addTransaction(e, 'debit')}>
                    <ArrowIcon className={styles.arrowIcon} />
                </button>
            </div>
        </div>
    );
}