import type { CSSProperties } from 'react';
import type { Certification } from '../../data/certifications';

interface CertificationRowProps {
  cert: Certification;
  index: number;
}

/**
 * One credential row. Every row has exactly one action, and the preview image
 * is a second route to the same destination — a certificate you can read is a
 * certificate you can open, so the two must never disagree.
 *
 * `verificationUrl` present, or `credentialType: 'external'`, means the
 * credential itself lives on the issuer's own page: the action is "Verify" and
 * it must not promise a PDF that does not exist. Otherwise the action is "View
 * Certificate" and opens the real document in public/certificates/. The image
 * link carries no aria-label of its own — the alt text is its accessible name.
 */
export default function CertificationRow({ cert, index }: CertificationRowProps) {
  const style = { '--d': `${index * 0.08}s` } as CSSProperties;
  const issuer = cert.platform ? `${cert.provider} · ${cert.platform}` : cert.provider;
  const on = cert.platform ? ` on ${cert.platform}` : '';
  const hosted = cert.credentialType === 'external' || Boolean(cert.verificationUrl);
  const target = cert.verificationUrl ?? cert.certificateUrl;

  return (
    <article className="cert-row reveal" style={style}>
      <div className="cert-row__main">
        <div className="cert-row__head">
          <span className="cert-idx">{cert.number}</span>
          <h3 className="cert-name">{cert.title}</h3>
          <div className="cert-meta">
            <span className="cert-meta__issuer">{issuer}</span>
          </div>
        </div>

        <div className="cert-row__body">
          {/* The chip row exists only when a row has chips: an empty flex box
              still costs its own margin, and one card has no chip at all. */}
          {(cert.credential || cert.highlight) && (
            <div className="cert-row__badges">
              {cert.credential && <span className="cert-chip">{cert.credential}</span>}
              {cert.highlight && <span className="cert-chip cert-chip--ink">{cert.highlight}</span>}
            </div>
          )}

          {cert.description && <p className="cert-desc">{cert.description}</p>}

          {cert.skills && cert.skills.length > 0 && (
            <ul className="tags cert-skills" aria-label={`${cert.title} covered areas`}>
              {cert.skills.map((skill) => (
                <li className="tag" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          )}

          <div className="cert-links">
            <a
              className="cert-cta cert-cta--primary"
              href={target}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                hosted
                  ? `Verify the ${cert.title}${on} in a new tab`
                  : `View the ${cert.title} certificate PDF in a new tab`
              }
            >
              {hosted ? 'Verify' : 'View Certificate'}{' '}
              <span className="arw" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {cert.previewImage && (
        <figure className="cert-preview">
          <a className="cert-preview__link" href={target} target="_blank" rel="noopener noreferrer">
            <img
              className="cert-preview__img"
              src={cert.previewImage}
              alt={cert.previewAlt || `${cert.title} certificate`}
              width={cert.previewWidth}
              height={cert.previewHeight}
              loading="lazy"
              decoding="async"
            />
          </a>
          <figcaption className="cert-preview__cap">
            {cert.previewCaption || 'Actual certificate page'}
          </figcaption>
        </figure>
      )}
    </article>
  );
}
