import { getDateAccordingToMonth } from './generalUtils';

const getSlideDate = ({ parent, isInitialActiveChild, activeDate, monthChangeDirection }) => {
  if (!parent) return activeDate;
  const child = parent.children[isInitialActiveChild ? 0 : 1];
  const isActiveSlide = child.classList.contains('-shown');
  return isActiveSlide ? activeDate : getDateAccordingToMonth(activeDate, monthChangeDirection);
};

const animateContent = ({ parent, direction }) => {
  const wrapperChildren = Array.from(parent.children);
  const shownItem = wrapperChildren.find(child => child.classList.contains('-shown'));
  if (!shownItem) return; // prevent simultaneous animations
  const hiddenItem = wrapperChildren.find(child => child !== shownItem);
  const baseClass = shownItem.classList[0];
  const isNextMonth = direction === 'NEXT';
  const getAnimationClass = value => (value ? '-hiddenNext' : '-hiddenPrevious');
  shownItem.className = `${baseClass} ${getAnimationClass(!isNextMonth)}`;
  hiddenItem.className = `${baseClass} ${getAnimationClass(isNextMonth)}`;
  hiddenItem.classList.add('-shownAnimated');
};

const handleSlideAnimationEnd = ({ target }) => {
  target.classList.remove('-hiddenNext');
  target.classList.remove('-hiddenPrevious');
  target.classList.replace('-shownAnimated', '-shown');
};

export { animateContent, getSlideDate, handleSlideAnimationEnd };
