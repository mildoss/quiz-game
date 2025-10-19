export const validateUsername = (username: string): string | null => {
  const trimmed = username.trim();
  if (!trimmed) return "Username is required";
  if (trimmed.length < 2) return "Username must be at least 2 characters";
  if (trimmed.length > 20) return "Username must be at most 20 characters";
  return null;
}

export const validatePassword = (password: string): string | null => {
  const trimmed = password.trim();
  if (!trimmed) return "Password is required";
  if (trimmed.length < 6) return "Password must be at least 6 characters";
  if (trimmed.length > 32) return "Password must be at most 32 characters";
  return null;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): string | null => {
  if (password !== confirmPassword) return "Passwords must match";
  return null;
};