import styles from './SingleTransaction.module.css';

export default function SingleTransaction({ transaction }) {
    let amount = transaction.amount / 100;
    amount = transaction.type === 'debit' ? `-${amount}` : amount;

    const label = transaction.label || (transaction.type === 'credit' ? 'Credit' : 'Debit');

    return (
        <div className={styles.transaction}>
            <p>{label}</p>
            <p className={transaction.type === 'credit' ? styles.amountCredit : ''}>{amount + " €"}</p>
        </div>
    );
}