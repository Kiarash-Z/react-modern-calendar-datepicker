const handleArrowKeys = (e, { allowVerticalArrows }) => {
  const { activeElement } = document;
  const getNthChildSafe = (element, index) => (element ? element.children[index] : null);
  const getStandardItem = item => item && (item.hasAttribute('aria-hidden') ? null : item);
  const { nextSibling: nextRow, previousSibling: previousRow } = activeElement.parentElement;
  const nextSibling = getStandardItem(activeElement.nextSibling || getNthChildSafe(nextRow, 0));
  const previousRowLength = previousRow ? previousRow.children.length - 1 : 0;
  const previousSibling = getStandardItem(
    activeElement.previousSibling || getNthChildSafe(previousRow, previousRowLength),
  );
  const getVerticalSibling = row =>
    getNthChildSafe(row, Array.from(activeElement.parentElement.children).indexOf(activeElement));
  const downSibling = getStandardItem(getVerticalSibling(nextRow));
  const upSibling = getStandardItem(getVerticalSibling(previousRow));
  const isDefaultSelectable = activeElement.dataset.isDefaultSelectable === 'true';

  if (!isDefaultSelectable) activeElement.tabIndex = '-1';
  const focusIfAvailable = element => {
    e.preventDefault();
    /* istanbul ignore else */
    if (element) {
      element.setAttribute('tabindex', '0');
      element.focus();
    }
  };
  switch (e.key) {
    case 'ArrowRight':
      focusIfAvailable(nextSibling);
      break;
    case 'ArrowLeft':
      focusIfAvailable(previousSibling);
      break;
    case 'ArrowDown':
      /* istanbul ignore else */
      if (allowVerticalArrows) focusIfAvailable(downSibling);
      break;
    case 'ArrowUp':
      /* istanbul ignore else */
      if (allowVerticalArrows) focusIfAvailable(upSibling);
      break;
  }
};

export default handleArrowKeys;
