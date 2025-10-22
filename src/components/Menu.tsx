"use client"

import Link from "next/link"
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {selectIsAuth} from "@/store/authSlice";
import {AuthButton} from "@/components/ui/AuthButton";
import {BurgerMenu} from "@/components/ui/BurgerMenu";

export const Menu = () => {
  const path = usePathname();
  const isAuth = useSelector(selectIsAuth);

  return (
    <nav className="flex justify-between items-center">
      <Image className="cursor-pointer" src="/logo.png" width={64} height={64} alt="quiz"/>
      <ul className="hidden md:flex justify-center gap-4">
        <li>
          <Link
            href="/"
            className={`px-3 py-1 rounded hover:text-gray-300 transition ${
              path === '/' ? 'border-b-2 border-amber-500 text-amber-400' : ''
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/leaderboard"
            className={`px-3 py-1 rounded hover:text-gray-300 transition ${
              path === '/leaderboard' ? 'border-b-2 border-amber-500 text-amber-400' : ''
            }`}
          >
            Leaderboard
          </Link>
        </li>
        {isAuth && (
          <li>
            <Link
              href="/stats"
              className={`px-3 py-1 rounded hover:text-gray-300 transition ${
                path === '/stats' ? 'border-b-2 border-amber-500 text-amber-400' : ''
              }`}
            >
              Stats
            </Link>
          </li>
        )}
      </ul>
      <div className="hidden sm:block">
        <AuthButton/>
      </div>
      <BurgerMenu/>
    </nav>
  )
}