import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { ContactLink as ContactLinkData } from '../../data/contact';

interface ContactLinkProps {
  link: ContactLinkData;
  index: number;
}

/**
 * One contact row: category label, the value as the link, and the affordance in
 * the third column. The row is a grid rather than one big anchor because the
 * email row also carries a Copy button, and a button cannot live inside a link.
 */
export default function ContactLink({ link, index }: ContactLinkProps) {
  const style = { '--d': `${index * 0.06}s` } as CSSProperties;
  const external = !!link.external;
  const copyable = /^mailto:/i.test(link.href);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(link.value);
      setCopied(true);
    } catch {
      /* clipboard denied (insecure context, no permission, no focus): the row
         stays as it is, the mailto link still works. */
    }
  }

  return (
    <div className={`contact-row reveal${external ? '' : ' contact-row--mailto'}`} style={style}>
      <span className="k">{link.label}</span>
      <a
        className="clink"
        href={link.href}
        aria-label={`${link.label}: ${link.value}`}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      >
        <span className="v">{link.value}</span>
      </a>
      <span className="contact-row__end">
        {copyable && (
          <button
            type="button"
            className="contact-copy"
            onClick={copyValue}
            aria-live="polite"
            aria-label={copied ? `${link.label} copied` : `Copy ${link.label}`}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
        <span className="arw" aria-hidden="true">
          {external ? '↗' : '→'}
        </span>
      </span>
    </div>
  );
}
