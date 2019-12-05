import '@testing-library/jest-dom/extend-expect';

expect.extend({
  toBePressed(received) {
    const isPassing = received.getAttribute('aria-pressed') === 'true';
    return {
      message: () => `expected ${isPassing ? 'not' : ''} ${received} to be pressed`,
      pass: isPassing,
    };
  },
  toBeSelected(element) {
    const isSelected = element.getAttribute('aria-selected') === 'true';
    return {
      pass: isSelected,
      message: () => {
        const is = isSelected ? 'is' : 'is not';
        return [
          this.utils.matcherHint(`${this.isNot ? '.not' : ''}.toBeSelected`, 'element', ''),
          '',
          `Received element ${is} selected:`,
          `  ${this.utils.printReceived(element.cloneNode(false))}`,
        ].join('\n');
      },
    };
  },
  toHaveTabIndex(received, expected) {
    const isPassing = received.getAttribute('tabindex') === String(expected);
    return {
      message: () =>
        `expected ${isPassing ? 'not' : ''} ${received} to have tabindex of ${expected}`,
      pass: isPassing,
    };
  },
});
