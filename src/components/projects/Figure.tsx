import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Figure as FigureData } from '../../types/project';

/**
 * A real exported image — a chart or a dashboard page that lives in
 * `public/projects/<id>/` — set into the site's hairline figure frame, and
 * openable at full size because a 4,000px-wide export is unreadable at the
 * width of a text column.
 *
 * The image is confirmed before anything is painted. A case study can be
 * authored ahead of its exports, and a `<img>` pointed at a file that is not
 * there renders a broken-image icon and holds an empty box in the layout, so
 * the figure resolves the file first and stays out of the document until it is
 * actually there. Nothing about it depends on hover or scroll.
 *
 * The image is never recoloured: no invert, no grayscale, no filter in either
 * theme, in the card or in the enlarged view, because an export carries its own
 * palette.
 */

const FOCUSABLE = 'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Figure({ figure }: { figure: FigureData }) {
  const [present, setPresent] = useState(false);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLDivElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const prev = [body.style.overflow, documentElement.style.overflow];
    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';
    closeBtn.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !dialog.current) return;
      const items = Array.from(dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = Boolean(active && dialog.current.contains(active));
      /* Only the close button is tabbable inside, so both directions land on
         it; the guard also pulls focus back if a click left it on the dialog. */
      if (e.shiftKey ? !inside || active === first : !inside || active === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus({ preventScroll: true });
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      [body.style.overflow, documentElement.style.overflow] = prev;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!present) return null;

  /* A click on the backdrop, or on the frame's own padding, closes; a click on
     the image or the caption does not. */
  const onBackdrop = (e: { target: unknown; currentTarget: unknown }) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  return (
    <figure className="fig-card">
      <button
        type="button"
        className="fig-card__zoom"
        ref={trigger}
        aria-label={`Enlarge figure: ${figure.alt}`}
        onClick={() => setOpen(true)}
      >
        <img
          src={figure.src}
          alt={figure.alt}
          loading="lazy"
          width={figure.w}
          height={figure.h}
        />
      </button>
      <figcaption>{figure.caption}</figcaption>
      {open
        ? createPortal(
            <div
              className="fig-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={figure.caption}
              ref={dialog}
              onClick={onBackdrop}
            >
              <div className="fig-lightbox__frame" onClick={onBackdrop}>
                <img
                  className="fig-lightbox__img"
                  src={figure.src}
                  alt={figure.alt}
                  width={figure.w}
                  height={figure.h}
                />
                <p className="fig-lightbox__cap">{figure.caption}</p>
              </div>
              <button
                type="button"
                className="fig-lightbox__close"
                ref={closeBtn}
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                Close<span aria-hidden="true"> ×</span>
              </button>
            </div>,
            document.body,
          )
        : null}
    </figure>
  );
}
