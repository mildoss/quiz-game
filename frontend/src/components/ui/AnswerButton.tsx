import {useGameSocket} from "@/providers/SocketProvider";

export const ANSWER_THEMES = [
  {
    name: 'red',
    icon: '',
    styles: "bg-rose-600/25 border border-rose-500/50 hover:bg-rose-600/40 text-white hover:border-rose-400 shadow-[0_0_20px_rgba(225,29,72,0.15)]"
  },
  {
    name: 'blue',
    icon: '',
    styles: "bg-blue-600/25 border border-blue-500/50 hover:bg-blue-600/40 text-white hover:border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.15)]"
  },
  {
    name: 'yellow',
    icon: '',
    styles: "bg-amber-600/25 border border-amber-500/50 hover:bg-amber-600/40 text-white hover:border-amber-400 shadow-[0_0_20px_rgba(217,119,6,0.15)]"
  },
  {
    name: 'green',
    icon: '',
    styles: "bg-emerald-600/25 border border-emerald-500/50 hover:bg-emerald-600/40 text-white hover:border-emerald-400 shadow-[0_0_20px_rgba(5,150,105,0.15)]"
  }
] as const;

type ThemeConfig = typeof ANSWER_THEMES[number];

interface AnswerButtonProps {
  theme: ThemeConfig;
  label: string;
  roomId: number;
  qId: number;
  answerId: number;
  disabled: boolean;
}

export const AnswerButton = ({theme, label, roomId, answerId, qId, disabled}: AnswerButtonProps) => {
  const disabledStyle = "opacity-40 cursor-not-allowed grayscale";
  const {sendAnswer} = useGameSocket();

  return (
      <button
          onClick={() => !disabled && sendAnswer({qId, answerId, roomId})}
          disabled={disabled}
          className={`
      relative group flex items-center justify-between p-6 sm:p-8 rounded-2xl 
      text-left transition-all duration-300
      hover:scale-[1.02] active:scale-[0.98]
      focus:outline-none focus:ring-2 ring-white/20
      ${disabled ? disabledStyle : ''}
      ${theme.styles}
    `}>
        <span className="text-lg sm:text-xl font-bold tracking-wide">{label}</span>
        <span className="text-xl opacity-60 group-hover:opacity-100 transition-opacity">→</span>
      </button>
  );
};