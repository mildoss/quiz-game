"use client"

import {useRegisterMutation} from "@/services/authApi";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {setCredentials} from "@/store/authSlice";
import {useAuthForm} from "@/hooks/useAuthForm";
import {FormInput} from "@/components/ui/FormInput";
import {getErrorMessage} from "@/utils/errorUtils";
import {FormButton} from "@/components/ui/FormButton";

export const RegisterForm = () => {
  const [register, {isLoading, error: apiError}] = useRegisterMutation();
  const dispatch = useDispatch<AppDispatch>();

  const {values, error, setError, handleChange, handleSubmit} = useAuthForm({
    onSubmit: async (username, password) => {
      try {
        const result = await register({username, password}).unwrap();
        dispatch(setCredentials({token: result.token}));
      } catch (err) {
        setError(getErrorMessage(err));
      }
    },
    requireConfirmPassword: true
  });

  const combinedError = error || (apiError && getErrorMessage(apiError));

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg max-w-md w-full h-full m-4"
    >
      {combinedError && (
        <p className="text-red-500 font-bold text-center" role="alert" aria-live="polite">{combinedError}</p>
      )}

      <FormInput label="Username" value={values.username} onChange={handleChange("username")} disabled={isLoading}
                 placeholder="Enter username"/>
      <FormInput label="Password" value={values.password} onChange={handleChange("password")} disabled={isLoading}
                 placeholder="Enter password" type="password"/>
      <FormInput label="Confirm password" value={values.confirmPassword} onChange={handleChange("confirmPassword")}
                 disabled={isLoading} placeholder="Confirm password" type="password"/>

      <FormButton isLoading={isLoading}>Register</FormButton>
    </form>
  )
}