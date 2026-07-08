import Image from 'next/image';
import { Countdown } from "@/components/ui/Countdown";
import { GameRoom } from "@/types/game";

interface QuestionBoardProps {
  room: GameRoom;
}

export const QuestionBoard = ({ room }: QuestionBoardProps) => {
  return (
      <div className="relative w-full bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl text-center overflow-hidden group">
        <div className="flex flex-col items-center gap-4 relative z-10">
        <span className="px-4 py-1.5 bg-blue-900/30 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/20">
          Round {room.currentQNum} / {room.qQuantity}
        </span>
          <span className="px-4 py-1.5 bg-slate-800/80 text-slate-400 rounded-full text-xs font-bold tracking-widest uppercase border border-slate-700/50 shadow-md">
          Current topic: {room.topic}
        </span>

          <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow-lg leading-tight mt-2 mb-2">
            {room.currentQText}
          </h1>

          <div className="relative w-full max-w-md mx-auto h-64 rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-lg bg-slate-800">
            <Image
                src={room.currentImageUrl}
                alt={room.currentQText}
                fill
                className="object-cover"
            />
          </div>

          <Countdown targetDate={room.roundEndTime} currentTime={room.currentTime} />
        </div>
      </div>
  );
};