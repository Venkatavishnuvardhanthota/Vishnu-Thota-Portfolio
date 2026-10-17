import type { VisualKey } from '../../types/project';

/**
 * Deterministic case-study visuals built only from verified project metrics.
 * The SVG markup is produced as a string and injected verbatim so the rendered
 * output is byte-for-byte identical to the original single-file implementation.
 * Every dynamic value is either a number derived from a verified metric or a
 * constant label passed through `esc()`.
 */

export function esc(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#39;';
    }
  });
}

export function axisFrame(): string {
  return (
    '<line x1="60" y1="330" x2="980" y2="330" stroke="var(--line-strong)" stroke-width="1" />' +
    '<line x1="60" y1="40" x2="60" y2="330" stroke="var(--line-strong)" stroke-width="1" />'
  );
}

export function labelText(
  x: number,
  y: number,
  t: string,
  anchor: 'start' | 'middle' | 'end' = 'start',
  size = 15,
): string {
  return (
    '<text x="' + x + '" y="' + y + '" text-anchor="' + anchor +
    '" font-size="' + size + '" fill="var(--ink-3)" letter-spacing="1.4">' + esc(t) + '</text>'
  );
}

/** No case study requests a visual now, so the switch has no branches. The
    builders stay exported for the next one; `noUnusedLocals` would otherwise
    drop them. */
export function buildVisual(key: VisualKey): string {
  let s = '<svg viewBox="0 0 1040 380" role="img" preserveAspectRatio="xMidYMid meet">';
  switch (key) {
  }
  s += '</svg>';
  return s;
}
