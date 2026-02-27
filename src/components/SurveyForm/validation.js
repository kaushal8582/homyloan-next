// Email validation - basic format check
export const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

// Phone validation - at least 10 digits (US format)
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10;
};

// Format "2026-02" to "02/2026"
export const formatMMYYYY = (value) => {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!month || !year) return value;
  return `${month.padStart(2, "0")}/${year}`;
};
