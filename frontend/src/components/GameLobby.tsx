import { RoomUpdate } from "@/types/game";
import { Countdown } from "@/components/ui/Countdown";

interface GameLobbyProps {
    room: RoomUpdate;
    onLeave: () => void;
}

export const GameLobby = ({ room, onLeave }: GameLobbyProps) => {
    const { gameRoom } = room;

    const MAX_PLAYERS = 4;

    return (
        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-slate-700/50 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    Lobby
                    <span className="text-sm font-black bg-blue-900/30 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full">
                        {gameRoom.players.length} / {MAX_PLAYERS}
                    </span>
                </h2>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs font-bold">
                    {gameRoom.status}
                </span>
            </div>

            {gameRoom.countdownEndTime && (
                <Countdown targetDate={gameRoom.countdownEndTime} text='The game will start in' currentTime={gameRoom.currentTime}/>
            )}

            <div className="space-y-3 mb-8">
                {gameRoom.players.map((player) => (
                    <div key={player.id} className="flex justify-between items-center bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl">
                        <span className="font-semibold text-slate-200">{player.username}</span>
                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-md">
                            {player.status}
                        </span>
                    </div>
                ))}

                {gameRoom.players.length < MAX_PLAYERS && (
                    <div className="p-4 rounded-xl border border-dashed border-slate-600 text-center text-slate-400 italic">
                        Waiting for players...
                    </div>
                )}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={onLeave}
                    className="text-red-400 font-bold hover:text-red-300 transition-colors tracking-widest"
                >
                    LEAVE
                </button>
            </div>
        </div>
    );
};