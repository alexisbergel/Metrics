-- Define the transaction type enum
CREATE TYPE transaction_type AS ENUM ('credit', 'debit'); 

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    amount INTEGER NOT NULL,
    label TEXT,
    date TIMESTAMP NOT NULL,
    executed BOOLEAN DEFAULT false,
    type transaction_type NOT NULL
);