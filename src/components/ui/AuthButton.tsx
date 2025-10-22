"use client"

import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "@/store/authSlice";
import Link from "next/link";
import {useLogoutMutation} from "@/services/authApi";
import {getErrorMessage} from "@/utils/errorUtils";
import {AppDispatch} from "@/store/store";

type AuthButtonProps = {
  onAction?: () => void;
}

export const AuthButton = ({onAction}: AuthButtonProps) => {
  const isAuth = useSelector(selectIsAuth);
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (onAction) {
      onAction();
    }
  }

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
    } catch (err) {
      console.log(getErrorMessage(err));
    }
  }

  return isAuth ? (
    <button
      className=" sm:inline-block z-15 px-2 py-1 rounded bg-amber-700 cursor-pointer hover:text-amber-400 transition hover:-translate-y-1"
      onClick={() => handleLogout()}
    >
      Logout
    </button>
  ) : (
    <Link
      className=" sm:inline z-15 px-2 py-1 rounded bg-emerald-600 cursor-pointer hover:text-emerald-400 transition hover:-translate-y-1"
      href="/login"
      onClick={handleClick}
    >
      Sign in
    </Link>
  )
}