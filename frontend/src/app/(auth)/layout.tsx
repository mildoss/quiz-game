import {ReactNode} from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="gap-2 p-4 flex flex-col justify-center items-center">
        {children}
    </div>
  );
}