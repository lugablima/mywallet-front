function isValidAmount(amount) {
  // amount = amount.replace(",", ".");
  // const regexAmount = /['"!@#$%¨&*()-_=+§{}[\]`´ªº^~:;<>?/°|\\]/;
  // const regex = /^[0-9]{1,3}\.*[0-9]+,[0-9]{2}$/;
  // const regexAmount = /^[0-9]{1,},[0-9]{2}$/;
  const regexAmount = /^[0-9]+,[0-9]{2}$/;
  return regexAmount.test(amount);
}

export default isValidAmount;
