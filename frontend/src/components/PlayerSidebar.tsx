import {PlayerItem} from "@/components/ui/PlayerItem";
import {Player} from "@/types/game";

export const PlayersSidebar = ({ players, myId }: { players: Player[], myId: number }) => (
    <aside className="w-full lg:w-80 flex flex-col gap-4">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl h-full">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 border-b border-slate-700/50 pb-4">
                Game Players
            </h3>
            <ul className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-600">
                {players.map((player: Player) => (
                    <PlayerItem
                        key={player.id}
                        name={player.username}
                        score={player.score ?? 0}
                        isMe={myId === player.id}
                        status={player.status}
                        variant={player.isAnswered ? 'answered' : 'default'}
                    />
                ))}
            </ul>
        </div>
    </aside>
);