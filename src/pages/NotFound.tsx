import {Link} from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section not-found"><div className="container"><span>404</span><h1>This page has moved beyond view.</h1><p>Return to the MIR collection and continue exploring.</p><Link className="button button--gold" to="/">RETURN HOME</Link></div></section>
  );
}
