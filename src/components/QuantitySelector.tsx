import {Minus, Plus} from 'lucide-react';

export function QuantitySelector({value, onChange, compact = false}: {value: number; onChange: (next: number) => void; compact?: boolean}) {
  return (
    <div className={`quantity${compact ? ' quantity--compact' : ''}`}>
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={14} /></button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
    </div>
  );
}
