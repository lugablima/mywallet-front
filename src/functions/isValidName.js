export default function isValidName(name) {
  const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\-']+$/;
  const isValid = name.split(" ").every((value) => regex.test(value));
  return isValid;
}
