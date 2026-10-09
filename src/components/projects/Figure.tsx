import { useEffect, useState } from 'react';
import type { Figure as FigureData } from '../../types/project';

/**
 * A real exported image — a chart or a dashboard page that lives in
 * `public/projects/<id>/` — set into the site's hairline figure frame.
 *
 * The image is confirmed before anything is painted. A case study can be
 * authored ahead of its exports, and a `<img>` pointed at a file that is not
 * there renders a broken-image icon and holds an empty box in the layout, so
 * the figure resolves the file first and stays out of the document until it is
 * actually there. Nothing about it depends on hover or scroll.
 *
 * The image is never recoloured: no invert, no grayscale, no filter in either
 * theme, because an export carries its own palette.
 */
export default function Figure({ figure }: { figure: FigureData }) {
  const [present, setPresent] = useState(false);

  useEffect(() => {
    let mounted = true;
    const probe = new Image();
    const settle = (ok: boolean) => {
      if (mounted) setPresent(ok);
    };
    probe.onload = () => settle(true);
    probe.onerror = () => settle(false);
    probe.src = figure.src;
    /* A memory-cache hit can finish before the handlers are wired up. */
    if (probe.complete) settle(probe.naturalWidth > 0);
    return () => {
      mounted = false;
      probe.onload = null;
      probe.onerror = null;
    };
  }, [figure.src]);

  if (!present) return null;

  return (
    <figure className="fig-card">
      <img
        src={figure.src}
        alt={figure.alt}
        loading="lazy"
        width={figure.w}
        height={figure.h}
      />
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}
