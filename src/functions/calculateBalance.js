function calculateBalance(transactions) {
  let balance = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "entrada") balance += transactions[i].amount;
    else balance -= transactions[i].amount;
  }
  return balance;
}

export default calculateBalance;
