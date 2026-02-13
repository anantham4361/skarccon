import { Plus, Minus } from "lucide-react";

interface StatCounterProps {
  label: string;
  value: number;
  icon: any;
  iconColor: string;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function StatCounter({
  label,
  value,
  icon: Icon,
  iconColor,
  onIncrement,
  onDecrement,
}: StatCounterProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full text-white ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onDecrement}
          className="rounded border p-2 hover:bg-red-200 bg-red-100"
        >
          <Minus className="h-4 w-4" />
        </button>

        <button
          onClick={onIncrement}
          className="rounded border p-2 hover:bg-green-200 bg-green-100"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
