function calculateBalance(transactions) {
  let balance = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "entrada") balance += Number(transactions[i].amount);
    else balance -= Number(transactions[i].amount);
  }
  return balance;
}

export default calculateBalance;
