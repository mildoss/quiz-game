"use client"

import {useLoginMutation, useRegisterMutation} from "@/services/authApi";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {setCredentials} from "@/store/authSlice";
import {useAuthForm} from "@/hooks/useAuthForm";
import {FormInput} from "@/components/ui/FormInput";
import {getErrorMessage} from "@/utils/errorUtils";
import {FormButton} from "@/components/ui/FormButton";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface AuthFormProps {
  mode: "login" | "register";
  mutation: typeof useLoginMutation | typeof useRegisterMutation;
}

export const AuthForm = ({mode, mutation}: AuthFormProps) => {
  const [mutate, {isLoading, error: apiError}] = mutation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {values, error, setError, handleChange, handleSubmit} = useAuthForm({
    onSubmit: async (username, password) => {
      try {
        const result = await mutate({username, password}).unwrap();
        dispatch(setCredentials({token: result.token, id: result.id, username: result.username}));
        router.push('/');

      } catch (err) {
        setError(getErrorMessage(err));
      }
    },
    requireConfirmPassword: mode === 'register'
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
      {mode === 'register' && (
        <FormInput label="Confirm password" value={values.confirmPassword} onChange={handleChange("confirmPassword")}
                   disabled={isLoading} placeholder="Confirm password" type="password"/>
      )
      }
      <FormButton isLoading={isLoading}>{mode === 'register' ? 'Register' : 'Login'}</FormButton>
      <p className="text-sm text-gray-300 text-center">
        {mode === "register" ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-amber-400 hover:underline">
              Log in
            </Link>
          </>
        ) : (
          <>
            Don’t have an account yet?{" "}
            <Link href="/register" className="text-amber-400 hover:underline">
              Register
            </Link>
          </>
        )}
      </p></form>
  )
}