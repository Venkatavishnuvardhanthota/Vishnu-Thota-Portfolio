import type { VisualKey } from '../../types/project';

/**
 * Deterministic case-study visuals built only from verified project metrics.
 * The SVG markup is produced as a string and injected verbatim so the rendered
 * output is byte-for-byte identical to the original single-file implementation.
 * Every dynamic value is either a number derived from a verified metric or a
 * constant label passed through `esc()`.
 */

function esc(s: string): string {
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

function axisFrame(): string {
  return (
    '<line x1="60" y1="330" x2="980" y2="330" stroke="var(--line-strong)" stroke-width="1" />' +
    '<line x1="60" y1="40" x2="60" y2="330" stroke="var(--line-strong)" stroke-width="1" />'
  );
}

function labelText(
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

export function buildVisual(key: VisualKey): string {
  let s = '<svg viewBox="0 0 1040 380" role="img" preserveAspectRatio="xMidYMid meet">';
  if (key === 'churn') {
    s += axisFrame();
    s += '<rect x="60" y="150" width="920" height="40" fill="none" stroke="var(--line-strong)"/>';
    s += '<rect x="60" y="150" width="' + Math.round(920 * 0.8343) + '" height="40" fill="var(--ink)"/>';
    s += labelText(60, 130, 'AUC-ROC 0.8343') + labelText(980, 240, '7,043 CUSTOMERS · 21 FEATURES · SMOTE', 'end');
  } else if (key === 'sentiment') {
    s += axisFrame();
    s += '<rect x="60" y="150" width="920" height="46" fill="none" stroke="var(--line-strong)"/>';
    s += '<rect x="60" y="150" width="' + Math.round(920 * 0.882) + '" height="46" fill="var(--ink)"/>';
    s += labelText(60, 130, '88.2% OVERALL POSITIVE') + labelText(980, 246, 'VADER VS STAR RATINGS: 79.6% AGREEMENT', 'end');
  } else if (key === 'retail') {
    s += axisFrame();
    s += '<rect x="140" y="120" width="150" height="210" fill="var(--ink)"/>';
    s += labelText(215, 356, 'TECHNOLOGY $0.84M', 'middle');
    s += labelText(420, 150, 'HIGHEST-REVENUE CATEGORY');
    s += labelText(420, 190, 'CALIFORNIA · TOP STATE');
    s += labelText(420, 230, 'NOVEMBER · PEAK MONTH');
    s += labelText(420, 270, 'FURNITURE MARGIN 2.49%');
    s += labelText(420, 310, 'TABLES & BOOKCASES · LOSS-MAKING');
  }
  s += '</svg>';
  return s;
}
