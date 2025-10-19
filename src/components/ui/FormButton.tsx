import {Spinner} from "@/components/ui/Spinner";
import {ButtonHTMLAttributes, ReactNode} from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children?: ReactNode;
}

export const FormButton = ({
  isLoading = false,
  children = "Submit",
  ...props
}: FormButtonProps) => {
  return (
    <button
      disabled={isLoading}
      className="bg-white text-purple-600 font-bold w-1/2 mx-auto p-3
      rounded-lg shadow-md cursor-pointer hover:bg-gray-300
      focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-600 transition-all
      disabled:opacity-50 disabled:cursor-not-allowed
      flex justify-center items-center"
      {...props}
    >
      {isLoading ? <Spinner/> : children}
    </button>
  )
}