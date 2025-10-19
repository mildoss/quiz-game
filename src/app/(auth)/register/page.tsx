import {RegisterForm} from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="h-full gap-2 p-4 flex flex-col justify-center items-center">
      <h1 className="text-4xl text-center font-bold mb-2">Register</h1>
      <RegisterForm/>
    </div>
  )
}