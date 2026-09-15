export function PageHero({eyebrow, title, description}: {eyebrow: string; title: string; description?: string}) {
  return (
    <section className="page-hero">
      <div className="page-hero__glow" />
      <div className="container page-hero__inner">
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
