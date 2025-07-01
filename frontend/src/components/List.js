import SingleTransaction from "./SingleTransaction";

export default function List({ transactions }) {
    return(
        <div>
            {transactions.map((transaction) => (
                <SingleTransaction key={transaction.id} transaction={transaction} />
            ))}
        </div>
    );
}