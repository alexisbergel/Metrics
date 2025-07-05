import SingleTransaction from "./SingleTransaction";

export default function List({ transactions, onToggleExecute }) {
    return(
        <div>
            {transactions.map((transaction) => (
                <SingleTransaction 
                    key={transaction.id}
                    transaction={transaction} 
                    onToggleExecute={onToggleExecute} />
            ))}
        </div>
    );
}