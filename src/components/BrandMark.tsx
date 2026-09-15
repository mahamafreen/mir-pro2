import {Link} from 'react-router-dom';

export function BrandMark({compact = false}: {compact?: boolean}) {
  return (
    <Link to="/" className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} aria-label="MIR Private Limited home">
      <img src="/assets/logo/mir-logo.png" alt="MIR Private Limited" />
    </Link>
  );
}
