export function SectionHeading({eyebrow, title, align = 'center', description}: {eyebrow?: string; title: string; align?: 'left' | 'center'; description?: string}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && (
        <div className="section-heading__eyebrow">
          <span />
          <b>{eyebrow}</b>
          <span />
        </div>
      )}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
