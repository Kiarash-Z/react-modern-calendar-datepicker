import { getDateAccordingToMonth } from './generalUtils';

const getSlideDate = ({ parent, isInitialActiveChild, activeDate, monthChangeDirection }) => {
  if (!parent) {
    return isInitialActiveChild ? activeDate : getDateAccordingToMonth(activeDate, 'NEXT');
  }
  const child = parent.children[isInitialActiveChild ? 0 : 1];
  const isActiveSlide =
    child.classList.contains('-shown') || child.classList.contains('-shownAnimated'); // check -shownAnimated for Safari bug
  return isActiveSlide ? activeDate : getDateAccordingToMonth(activeDate, monthChangeDirection);
};

const animateContent = ({ parent, direction }) => {
  const wrapperChildren = Array.from(parent.children);
  const shownItem = wrapperChildren.find(child => child.classList.contains('-shown'));
  const hiddenItem = wrapperChildren.find(child => child !== shownItem);
  const baseClass = shownItem.classList[0];
  const isNextMonth = direction === 'NEXT';
  const getAnimationClass = value => (value ? '-hiddenNext' : '-hiddenPrevious');
  hiddenItem.style.transition = 'none';
  shownItem.style.transition = '';
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
