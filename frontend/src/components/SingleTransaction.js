export default function SingleTransaction({ transaction }) {
    return (
        <div className="single-transaction">
            <p>Label</p>
            <p>{transaction.amount}</p>
        </div>
    );
}