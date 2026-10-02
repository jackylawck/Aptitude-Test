import { t } from './i18n.js';

export class RadarChartRenderer {
  static render(containerId, dims, size = 240) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.textContent = '';

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', size.toString());
    svg.setAttribute('height', size.toString());
    svg.setAttribute('class', 'radar-svg');

    const center = size / 2;
    const radius = center * 0.65;
    const axes = [
      { key: 'gv', labelKey: 'dimensions.gv' },
      { key: 'gf', labelKey: 'dimensions.gf' },
      { key: 'gsm', labelKey: 'dimensions.gsm' },
      { key: 'gq', labelKey: 'dimensions.gq' },
      { key: 'gs', labelKey: 'dimensions.gs' },
    ];
    const angleSlice = (Math.PI * 2) / axes.length;

    [0.33, 0.66, 1.0].forEach(level => {
      const polygon = document.createElementNS(svgNS, 'polygon');
      const pts = axes.map((_, i) => {
        const angle = i * angleSlice - Math.PI / 2;
        const r = radius * level;
        return `${(center + r * Math.cos(angle)).toFixed(1)},${(center + r * Math.sin(angle)).toFixed(1)}`;
      }).join(' ');
      polygon.setAttribute('points', pts);
      polygon.setAttribute('class', 'radar-grid');
      svg.appendChild(polygon);
    });

    const dataPts = axes.map((a, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const val = Math.max(0.15, Math.min(1.0, dims[a.key] || 0.2));
      const r = radius * val;
      return `${(center + r * Math.cos(angle)).toFixed(1)},${(center + r * Math.sin(angle)).toFixed(1)}`;
    }).join(' ');

    const dataPolygon = document.createElementNS(svgNS, 'polygon');
    dataPolygon.setAttribute('points', dataPts);
    dataPolygon.setAttribute('class', 'radar-data-area');
    svg.appendChild(dataPolygon);

    axes.forEach((a, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const x2 = center + radius * Math.cos(angle);
      const y2 = center + radius * Math.sin(angle);

      const line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', center.toString());
      line.setAttribute('y1', center.toString());
      line.setAttribute('x2', x2.toString());
      line.setAttribute('y2', y2.toString());
      line.setAttribute('class', 'radar-axis');
      svg.appendChild(line);

      const labelX = center + (radius + 24) * Math.cos(angle);
      const labelY = center + (radius + 16) * Math.sin(angle);
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', labelX.toString());
      text.setAttribute('y', labelY.toString());
      text.setAttribute('class', 'radar-label');
      text.textContent = t(a.labelKey);
      svg.appendChild(text);
    });

    container.appendChild(svg);
  }
}
