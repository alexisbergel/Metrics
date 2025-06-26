import SingleTransaction from "./SingleTransaction";

export default function List({ transactions }) {
    return(
        <div>
            {transactions.map((transaction, index) => (
                <SingleTransaction transaction={transaction} />
                //<SingleTransaction key={index} transaction={transaction} />
            ))}
        </div>
    );
}