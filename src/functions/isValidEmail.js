export default function isValidEmail(email) {
  return email.endsWith(".com") || email.endsWith(".br") || email.endsWith(".uol");
}
