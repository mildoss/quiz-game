'use client'

import {ReactNode, useEffect} from "react";
import {useCheckAuthQuery} from "@/services/authApi";
import {Spinner} from "@/components/ui/Spinner";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {logout, setCredentials} from "@/store/authSlice";

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const {data,isLoading,error} = useCheckAuthQuery();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({token: data.token, id: data.id, username: data.username}))
    } else if(error && 'status' in error && error.status === 401) {
      dispatch(logout());
    }
  },[data,dispatch,error])

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>
}
