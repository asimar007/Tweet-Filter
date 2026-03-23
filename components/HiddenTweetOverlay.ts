import type { ClassificationResult } from '@/utils/types';

export function hideTweet(
  tweetElement: HTMLElement, 
  result: ClassificationResult,
  onShow: () => void
): void {
  const cellInner = tweetElement.closest<HTMLElement>('[data-testid="cellInnerDiv"]');
  const targetElement = cellInner || tweetElement;

  const overlay = document.createElement('div');
  overlay.className = 'xfeed-hidden-tweet';

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'xfeed-hidden-content';

  const iconSpan = document.createElement('span');
  iconSpan.className = 'xfeed-hidden-icon';
  iconSpan.textContent = '🛡️';

  const textSpan = document.createElement('span');
  textSpan.className = 'xfeed-hidden-text';
  
  const hiddenPrefix = document.createTextNode('Hidden: ');
  const categoryStrong = document.createElement('strong');
  categoryStrong.textContent = result.category || 'Filtered';
  
  textSpan.appendChild(hiddenPrefix);
  textSpan.appendChild(categoryStrong);

  if (result.matchedKeyword) {
    const keywordSpan = document.createElement('span');
    keywordSpan.className = 'xfeed-hidden-keyword';
    keywordSpan.textContent = ` (${result.matchedKeyword})`;
    keywordSpan.style.opacity = '0.7';
    keywordSpan.style.fontSize = '0.9em';
    keywordSpan.style.marginLeft = '4px';
    textSpan.appendChild(keywordSpan);
  }

  const showBtn = document.createElement('button');
  showBtn.className = 'xfeed-show-btn';
  showBtn.textContent = 'Show';

  contentWrapper.appendChild(iconSpan);
  contentWrapper.appendChild(textSpan);
  contentWrapper.appendChild(showBtn);

  overlay.appendChild(contentWrapper);

  showBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    targetElement.classList.remove('xfeed-tweet-hidden');
    overlay.remove();
    onShow();
  });

  targetElement.classList.add('xfeed-tweet-hidden');
  targetElement.appendChild(overlay);
}
