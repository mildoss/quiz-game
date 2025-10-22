"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectIsAuth} from "@/store/authSlice";
import {AuthButton} from "@/components/ui/AuthButton";

export const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        className="relative z-20 flex flex-col justify-between w-6 h-5"
        onClick={() => setOpen(!open)}
      >
        <span
          className={`block h-0.5 w-full bg-white transition-all duration-300 ${
            open ? "rotate-45 translate-y-[9px]" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-full bg-white transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-full bg-white transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-[9px]" : ""
          }`}
        ></span>
      </button>
      <ul
        className={`fixed top-0 left-0 right-0 z-10 w-screen h-screen bg-gray-900 
          flex flex-col gap-4 p-4 justify-center items-center transition-opacity duration-300   
          ${
          open
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }
        `}
      >
        <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
        <li><Link href="/leaderboard" onClick={() => setOpen(false)}>Leaderboard</Link></li>
        {!isAuth && <li><Link href="/stats" onClick={() => setOpen(false)}>Stats</Link></li>}
        <li><AuthButton onAction={() => setOpen(false)}/></li>
      </ul>
    </div>
  );
};
