import type { CSSProperties } from 'react';
import type { Certification } from '../../data/certifications';

interface CertificationRowProps {
  cert: Certification;
  index: number;
}

/**
 * One credential row. "View Certificate" opens the real PDF from
 * public/certificates/; the secondary "Verify" link exists only where a
 * public verification URL is real (IBM/Coursera). The page preview is a
 * hover/focus reveal on desktop and is never required to open the document.
 */
export default function CertificationRow({ cert, index }: CertificationRowProps) {
  const style = { '--d': `${index * 0.08}s` } as CSSProperties;
  const issuer = cert.platform ? `${cert.provider} · ${cert.platform}` : cert.provider;

  return (
    <article className="cert-row reveal" style={style}>
      <div className="cert-row__main">
        <div className="cert-row__head">
          <span className="cert-idx">{cert.number}</span>
          <h3 className="cert-name">{cert.title}</h3>
          <div className="cert-meta">
            <span className="cert-meta__issuer">{issuer}</span>
            {cert.date && <span className="cert-meta__date">{cert.date}</span>}
          </div>
        </div>

        <div className="cert-row__body">
          <div className="cert-row__badges">
            {cert.credential && <span className="cert-chip">{cert.credential}</span>}
            {cert.highlight && <span className="cert-chip cert-chip--ink">{cert.highlight}</span>}
          </div>

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
              href={cert.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View the ${cert.title} certificate PDF in a new tab`}
            >
              View Certificate <span className="arw" aria-hidden="true">↗</span>
            </a>
            {cert.verificationUrl && (
              <a
                className="cert-cta cert-cta--verify"
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify the ${cert.title} on Coursera in a new tab`}
              >
                Verify <span className="arw" aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {cert.previewImage && (
        <figure className="cert-preview">
          <img
            className="cert-preview__img"
            src={cert.previewImage}
            alt={cert.previewAlt || `${cert.title} certificate`}
            width={cert.previewWidth}
            height={cert.previewHeight}
            loading="lazy"
            decoding="async"
          />
          <figcaption className="cert-preview__cap">Actual certificate page</figcaption>
        </figure>
      )}
    </article>
  );
}
