"use client"

import {useRegisterMutation} from "@/services/authApi";
import {AuthForm} from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-4xl text-center font-bold mb-2">Register</h1>
      <AuthForm mode="register" mutation={useRegisterMutation}/>
    </>

  )
}