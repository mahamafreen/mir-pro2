import {Star} from 'lucide-react';

export function Rating({value, count, compact = false}: {value: number; count?: number; compact?: boolean}) {
  return (
    <div className={`rating${compact ? ' rating--compact' : ''}`} aria-label={`${value} out of 5 stars`}>
      <span className="rating__stars" aria-hidden="true">
        {Array.from({length: 5}).map((_, index) => (
          <Star key={index} size={compact ? 11 : 14} strokeWidth={1.4} fill={index + 0.4 < value ? 'currentColor' : 'transparent'} />
        ))}
      </span>
      {!compact && <span className="rating__value">{value.toFixed(1)}</span>}
      {!compact && typeof count === 'number' && <span className="rating__count">({count} reviews)</span>}
    </div>
  );
}
