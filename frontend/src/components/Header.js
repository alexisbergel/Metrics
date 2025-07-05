import styles from './Header.module.css';

export default function Header({totalAmount, executedTotalAmount}) {
    return (
        <header className={styles.header}>
            <h1>main account</h1>
            <h2>{totalAmount + ' €'}</h2>
            <h3>{executedTotalAmount + ' €'}</h3>
        </header>
    );
}