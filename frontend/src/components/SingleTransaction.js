import { useState } from "react";
import styles from './SingleTransaction.module.css';
import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';

export default function SingleTransaction({ transaction, onToggleExecute }) {
    const [isExecuted, setIsExecuted] = useState(transaction.executed);

    let amount = transaction.amount / 100;
    amount = transaction.type === 'debit' ? `-${amount}` : amount;

    const label = transaction.label || (transaction.type === 'credit' ? 'Credit' : 'Debit');

    const handleExecute = async () => {
        const previousState = isExecuted;
        const newState = !isExecuted;

        setIsExecuted(newState);

        try {
            await onToggleExecute(transaction.id, newState);
        } catch (error) {
            console.error("Error updating transaction execution state:", error);
            console.log('coucou');
            setIsExecuted(previousState);
        }
    }

    return (
        <div className={`${styles.transaction} ${isExecuted ? styles.isExecuted : ''}`}>
            <div className={styles.transactionContent}>
                <p>{label}</p>
                <p className={transaction.type === 'credit' ? styles.amountCredit : ''}>{amount + " €"}</p>
            </div>
                
            <div className={styles.transactionActions}> 
                <button className={styles.executeButton} onClick={handleExecute} >
                    <CheckIcon className={styles.checkIcon} />
                </button>
            </div>
        </div>
    );
}