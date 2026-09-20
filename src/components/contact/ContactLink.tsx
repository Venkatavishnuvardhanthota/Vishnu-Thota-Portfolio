import type { CSSProperties } from 'react';
import type { ContactLink as ContactLinkData } from '../../data/contact';

interface ContactLinkProps {
  link: ContactLinkData;
  index: number;
}

/**
 * One full-width contact row: category label, the actual value, and the
 * directional arrow. The whole row is the link.
 */
export default function ContactLink({ link, index }: ContactLinkProps) {
  const style = { '--d': `${index * 0.06}s` } as CSSProperties;
  const external = link.external
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {};

  return (
    <a className="clink reveal" style={style} href={link.href} {...external}>
      <span className="k">{link.label}</span>
      <span className="v">{link.value}</span>
      <span className="arw" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
