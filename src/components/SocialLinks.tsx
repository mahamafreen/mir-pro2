type SocialPlatform = 'Facebook' | 'Instagram' | 'Pinterest' | 'TikTok';

const socialLinks: {label: SocialPlatform; href: string}[] = [
  {label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61594412683122'},
  {label: 'Instagram', href: 'https://www.instagram.com/mirofficial_/'},
  {label: 'Pinterest', href: 'https://www.pinterest.com/MIR_pvt_ltd/?actingBusinessId=1084382553936840192'},
  {label: 'TikTok', href: 'https://www.tiktok.com/@mirofficials?is_from_webapp=1&sender_device=pc'},
];

const SocialIcon = ({platform}: {platform: SocialPlatform}) => {
  if (platform === 'Facebook') {
    return <svg className="social-svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4z" /></svg>;
  }

  if (platform === 'Instagram') {
    return <svg className="social-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r=".8" fill="currentColor" stroke="none" /></svg>;
  }

  if (platform === 'Pinterest') {
    return <svg className="social-svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.4 3.2c-5 0-7.6 3.6-7.6 6.6 0 2.4.9 4.5 2.8 5.3.3.1.5 0 .6-.3l.2-1c.1-.3.1-.4-.2-.7-.6-.7-1-1.5-1-2.8 0-3.6 2.7-6.8 7-6.8 3.8 0 5.9 2.3 5.9 5.4 0 4.1-1.8 7.6-4.5 7.6-1.5 0-2.6-1.2-2.3-2.7.4-1.8 1.3-3.8 1.3-5.1 0-1.2-.6-2.2-1.9-2.2-1.5 0-2.7 1.6-2.7 3.7 0 1.4.5 2.3.5 2.3l-1.9 8c-.6 2.4-.1 5.3-.1 5.6.1.2.3.2.4.1.2-.3 2.1-2.5 2.8-4.8l1.1-4.2c.5 1 1.9 1.9 3.4 1.9 4.5 0 7.6-4.1 7.6-9.6 0-4.2-3.6-8.1-9.1-8.1z" transform="translate(-1.2 -1.2) scale(.92)" /></svg>;
  }

  return <svg className="social-svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.7 3h-3.2v12.6a2.3 2.3 0 1 1-2.3-2.3c.4 0 .8.1 1.1.3v-3.3a5.7 5.7 0 1 0 4.4 5.5V9.4a7.8 7.8 0 0 0 4.5 1.4V7.6a4.6 4.6 0 0 1-4.5-4.6z" /></svg>;
};

export function SocialLinks({className}: Readonly<{className: string}>) {
  return (
    <div className={className}>
      {socialLinks.map(({label, href}) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
          <SocialIcon platform={label} />
        </a>
      ))}
    </div>
  );
}