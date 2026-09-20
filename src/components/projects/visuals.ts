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
  if (key === 'forecast') {
    s += '<g stroke="var(--line-soft)" stroke-width="1"><line x1="60" y1="90" x2="980" y2="90"/><line x1="60" y1="170" x2="980" y2="170"/><line x1="60" y1="250" x2="980" y2="250"/></g>' + axisFrame();
    s += '<path d="M90 290 L210 268 L330 276 L450 240 L570 250 L690 214" fill="none" stroke="var(--ink)" stroke-width="2.6" stroke-linecap="round"/>';
    s += '<path d="M690 214 L780 200 L870 176 L950 168" fill="none" stroke="var(--ink-2)" stroke-width="2.4" stroke-dasharray="8 7"/>';
    s += '<path d="M690 214 L780 186 L870 156 L950 146 L950 192 L870 198 L780 216 L690 214 Z" fill="var(--ink)" opacity="0.06"/>';
    s += '<circle cx="690" cy="214" r="4.5" fill="var(--bg)" stroke="var(--ink)" stroke-width="2"/>';
    s += labelText(950, 130, 'FORECAST', 'end') + labelText(90, 70, '1,115 STORES · 84-DAY HOLDOUT · 17.13% STORE-DAY MAPE');
  } else if (key === 'ab') {
    s += axisFrame();
    s += '<rect x="300" y="211" width="120" height="119" fill="var(--ink)" opacity="0.35"/>';
    s += '<rect x="560" y="160" width="120" height="170" fill="var(--ink)"/>';
    s += '<line x1="620" y1="120" x2="620" y2="200" stroke="var(--ink)" stroke-width="1.6"/><line x1="596" y1="120" x2="644" y2="120" stroke="var(--ink)" stroke-width="1.6"/><line x1="596" y1="200" x2="644" y2="200" stroke="var(--ink)" stroke-width="1.6"/>';
    s += labelText(360, 356, 'CONTROL 1.79%', 'middle') + labelText(620, 356, 'AD 2.55%', 'middle');
    s += labelText(980, 70, '95% CI +0.60 TO +0.94 PP', 'end') + labelText(60, 70, 'Z = 7.37 · P = 1.71E-13');
  } else if (key === 'churn') {
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
  } else if (key === 'banking') {
    s += axisFrame();
    s += '<rect x="240" y="180" width="130" height="150" fill="var(--ink)" opacity="0.4"/>';
    s += '<rect x="520" y="100" width="130" height="230" fill="var(--ink)"/>';
    s += labelText(305, 356, 'ATTRITED 44.9', 'middle') + labelText(585, 356, 'EXISTING 68.7', 'middle');
    s += labelText(60, 70, 'AVG TRANSACTIONS · TOTAL_TRANS_CT CORR -0.37') + labelText(980, 70, 'ATTRITION 16.07% · $13.24M AT RISK', 'end');
  } else if (key === 'house') {
    s += axisFrame();
    s += '<rect x="60" y="150" width="920" height="40" fill="none" stroke="var(--line-strong)"/>';
    s += '<rect x="60" y="150" width="' + Math.round(920 * 0.6583) + '" height="40" fill="var(--ink)"/>';
    s += labelText(60, 130, 'LINEAR REGRESSION R² 0.6583') + labelText(980, 240, 'MAE ~₹970,043 · RMSE ~₹1,324,507 · 545 RECORDS', 'end');
  }
  s += '</svg>';
  return s;
}
