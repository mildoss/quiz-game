"use client"

import {useSelector} from "react-redux";
import {selectToken, selectUsername} from "@/store/authSlice";

export default function Home() {
  const token = useSelector(selectToken);
  const username = useSelector(selectUsername);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-5xl text-center">Quiz App</h1>
      {token && <p>Your successfully authorized!</p>}
      {token && <p>Your username: {username}</p>}
    </div>
  );
}
