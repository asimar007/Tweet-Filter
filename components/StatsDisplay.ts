let statsDisplay: HTMLElement | null = null;

export function createStatsDisplay() {
  if (statsDisplay) return;

  statsDisplay = document.createElement('div');
  statsDisplay.id = 'xfeed-filter-stats';
  const contentDiv = document.createElement('div');
  contentDiv.className = 'xfeed-stats-content';

  const iconSpan = document.createElement('span');
  iconSpan.className = 'xfeed-stats-icon';
  iconSpan.textContent = '🛡️';

  const textSpan = document.createElement('span');
  textSpan.className = 'xfeed-stats-text';

  const countSpan = document.createElement('span');
  countSpan.id = 'xfeed-filtered-count';
  countSpan.textContent = '0';

  const labelText = document.createTextNode(' filtered');

  textSpan.appendChild(countSpan);
  textSpan.appendChild(labelText);

  contentDiv.appendChild(iconSpan);
  contentDiv.appendChild(textSpan);

  statsDisplay.appendChild(contentDiv);
  document.body.appendChild(statsDisplay);
}

export function updateStatsDisplay(count: number) {
  const countEl = document.getElementById('xfeed-filtered-count');
  if (countEl) countEl.textContent = String(count);
}

export function removeStatsDisplay() {
  if (statsDisplay) {
    statsDisplay.remove();
    statsDisplay = null;
  }
}
