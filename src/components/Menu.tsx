import React from "react";
import Link from "next/link"

export const Menu = () => {
  return (
    <nav>
      <ul className="flex justify-center gap-2">
        <Link href="/">Home</Link>
        <Link href="/register">Register</Link>
        <Link href="/login">Login</Link>
      </ul>
    </nav>
  )
}