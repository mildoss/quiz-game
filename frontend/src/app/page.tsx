"use client"

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "@/store/authSlice";
import { clearGame, selectGameRoom, selectIsSearching, setGameStatus } from "@/store/gameSlice";
import { GameLobby } from "@/components/GameLobby";
import { useGameSocket } from "@/providers/SocketProvider";
import { AppDispatch } from "@/store/store";
import { useGetTopicsQuery } from "@/services/gameApi";
import { GameStatus } from "@/types/game";
import { Spinner } from "@/components/ui/Spinner";
import { ChevronDown } from "lucide-react";

const RANDOM_TOPIC_VALUE = "random";
const MIN_COUNT = 3;
const MAX_COUNT = 15;

const formatTopicLabel = (topic: string) => {
    return topic
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export default function Home() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const token = useSelector(selectToken);
    const room = useSelector(selectGameRoom);
    const isSearching = useSelector(selectIsSearching);
    const { isConnected, findGame, leaveQueue } = useGameSocket();
    const { data: topicsData, isLoading } = useGetTopicsQuery();

    const topics = useMemo(() => topicsData || [], [topicsData]);
    const [selectedCount, setSelectedCount] = useState(3);
    const [selectedTopic, setSelectedTopic] = useState(RANDOM_TOPIC_VALUE);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const regularTopics = useMemo(() => {
        return topics.filter((t) =>
            t.toLowerCase() !== RANDOM_TOPIC_VALUE &&
            !t.toLowerCase().startsWith('hidden_')
        );
    }, [topics]);

    useEffect(() => {
        if (room?.gameRoom?.status === GameStatus.ACTIVE) {
            router.push('/game');
        }

        if (room?.gameRoom?.status === GameStatus.FINISHED) {
            dispatch(clearGame());
            dispatch(setGameStatus('NOT_IN_GAME'));
        }
    }, [room, router, dispatch]);

    useEffect(() => {
        if (topics.length > 0 && !selectedTopic) {
            const hasRandom = topics.some(t => t.toLowerCase() === RANDOM_TOPIC_VALUE);
            setSelectedTopic(hasRandom ? RANDOM_TOPIC_VALUE : topics[0]);
        }
    }, [topics, selectedTopic]);

    if (!token) {
        return (
            <div className="flex min-h-[calc(100vh-15vh)] items-center justify-center">
            <span className="text-2xl sm:text-4xl font-black text-slate-400/90 uppercase tracking-[0.3em] select-none">
                Unauthorized
            </span>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-15vh)] flex flex-col justify-center items-center p-4">
            {!room && !isSearching && (
                <div className="w-full max-w-xl bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-slate-700/50">

                    <div className="flex flex-col gap-4 mb-8">
                        {isLoading ? (
                            <div className="flex justify-center py-6">
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedTopic(RANDOM_TOPIC_VALUE);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full p-5 rounded-2xl font-black text-sm tracking-widest uppercase transition-all border-2 ${
                                        selectedTopic.toLowerCase() === RANDOM_TOPIC_VALUE
                                            ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                                            : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                                    }`}
                                >
                                    RANDOM TOPIC
                                </button>

                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`w-full p-5 rounded-2xl font-black text-sm tracking-widest uppercase transition-all border-2 flex justify-between items-center ${
                                            selectedTopic.toLowerCase() !== RANDOM_TOPIC_VALUE
                                                ? 'bg-blue-600/20 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                                                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:bg-slate-800'
                                        }`}
                                    >
                    <span>
                      {selectedTopic.toLowerCase() !== RANDOM_TOPIC_VALUE
                          ? formatTopicLabel(selectedTopic)
                          : 'SELECT TOPIC'}
                    </span>
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-[110%] left-0 w-full bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-20 max-h-56 overflow-y-auto custom-scrollbar">
                                            {regularTopics.map((topic) => (
                                                <button
                                                    key={topic}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedTopic(topic);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left p-5 font-bold text-sm tracking-wide transition-colors border-b border-slate-700/50 last:border-0 ${
                                                        selectedTopic === topic
                                                            ? 'bg-blue-500/10 text-blue-400'
                                                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                                    }`}
                                                >
                                                    {formatTopicLabel(topic)}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="mb-10">
                        <label className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-4 flex justify-between items-center">
                            <span>QUESTION QUANTITY</span>
                            <span className="text-blue-400 text-lg bg-blue-900/30 px-3 py-1 rounded-lg">{selectedCount}</span>
                        </label>
                        <input
                            type="range"
                            min={MIN_COUNT}
                            max={MAX_COUNT}
                            value={selectedCount}
                            onChange={(e) => setSelectedCount(Number(e.target.value))}
                            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={() => findGame(selectedCount, selectedTopic)}
                            disabled={!isConnected || !selectedTopic || isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-lg tracking-widest hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:hover:scale-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] cursor-pointer"
                        >
                            {isConnected ? 'FIND GAME' : 'CONNECTION...'}
                        </button>
                    </div>
                </div>
            )}

            {room && (
                <GameLobby room={room} onLeave={() => leaveQueue(room.gameRoom.id)} />
            )}
        </div>
    );
}