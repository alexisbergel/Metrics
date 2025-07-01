import styles from './Header.module.css';

export default function Header({total}) {
    return (
        <header className={styles.header}>
            <h1>main account</h1>
            <h2>{total + ' €'}</h2>
        </header>
    );
}