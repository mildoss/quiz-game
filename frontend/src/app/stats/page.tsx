'use client'

import {StatsBlock} from "@/components/StatsBlock";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {selectAuthStatus, selectIsAuth, selectUserId} from "@/store/authSlice";
import {useGetStatsQuery} from "@/services/statsApi";
import {Spinner} from "@/components/ui/Spinner";
import {useEffect} from "react";
import {RecentGamesTable} from "@/components/RecentGamesTable";

export default function StatsPage() {
  const router = useRouter();
  const isAuth = useSelector(selectIsAuth);
  const authStatus = useSelector(selectAuthStatus);
  const id = useSelector(selectUserId);
  const userId = Number(id);

  const {data, isLoading: isStatsLoading} = useGetStatsQuery(userId, {
    skip: authStatus === 'loading' || !userId,
  });

  useEffect(() => {
    if (authStatus === 'idle' && !isAuth) {
      router.push('/login');
    }
  }, [isAuth, authStatus, router]);

  if (authStatus === 'loading' || isStatsLoading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[79vh]">
        <Spinner/>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-center text-2xl mt-2 text-shadow-xs text-shadow-black">My stats</h1>
      <StatsBlock userStats={data?.stats ?? null}/>
      <h2 className="text-center text-lg mt-2 text-shadow-xs text-shadow-black">Recent games</h2>
      <div className="px-4">
        <RecentGamesTable games={data?.recentlyGames ?? null}/>
      </div>
    </div>
  )
}