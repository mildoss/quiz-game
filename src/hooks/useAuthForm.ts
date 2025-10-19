import {ChangeEvent, FormEvent, useState} from "react";
import {validatePassword, validatePasswordMatch, validateUsername} from "@/utils/validators";

interface UseAuthFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  requireConfirmPassword?: boolean;
}

export const useAuthForm = ({onSubmit, requireConfirmPassword = false}: UseAuthFormProps) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof values) => (e: ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({...prev, [field]: e.target.value}));
    setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameError = validateUsername(values.username);
    if (usernameError) {
      setError(usernameError);
      return;
    }

    const passwordError = validatePassword(values.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (requireConfirmPassword) {
      const matchError = validatePasswordMatch(values.password, values.confirmPassword);
      if (matchError) {
        setError(matchError);
        return;
      }
    }

    await onSubmit(values.username, values.password);
  }

  return {values, error, setError, handleChange, handleSubmit};
}