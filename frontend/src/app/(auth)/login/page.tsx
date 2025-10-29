"use client"

import {useLoginMutation} from "@/services/authApi";
import {AuthForm} from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-4xl text-center font-bold mb-2">Login</h1>
      <AuthForm mode="login" mutation={useLoginMutation}/>
    </>

  )
}