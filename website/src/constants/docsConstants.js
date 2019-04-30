export const TUTORIAL_ITEMS = [
  {
    id: 0,
    path: '/docs/getting-started',
    text: 'Getting Started',
  },
  {
    id: 1,
    path: '/docs/core-concepts',
    text: 'Core Concepts',
  },
  {
    id: 2,
    path: '/docs/default-values',
    text: 'Default Values',
  },
  {
    id: 3,
    path: '/docs/disabled-days',
    text: 'Disabled Day(s)',
  },
  {
    id: 4,
    path: '/docs/customization',
    text: 'Customization',
  },
  {
    id: 5,
    path: '/docs/responsive-guide',
    text: 'Responsive Guide',
  },
  {
    id: 6,
    path: '/docs/utilities',
    text: 'Utilities'
  },
];

export const API_ITEMS = [
  {
    id: 0,
    path: '/docs/props-list',
    text: 'Props List'
  },
];

export const PROPS_TABLE_HEADERS = [
  'Prop',
  'Type',
  'Default',
  'Description'
];

export const PROPS_TABLE_PICKER_ROWS = [
  ['wrapperClassName', 'String', `''`, 'Additional CSS class for the date picker wrapper element'],
  ['inputClassName', 'String', `''`, 'Additional CSS class for the date picker input element'],
  ['inputPlaceholder', 'String', `انتخاب`, `Placeholder of the picker's input`],
  ['formatInputText', 'Function', `() => ''`, `If returns a true JavaScript value, the returned value of this function will be the input's value`],
  ['wrapperClassName', 'String', `''`, 'Additional CSS class for the date picker wrapper element'],
  ['renderInput', 'Function', `() => null`, 'The returned value of this function will be the custom input element rendered for picker'],
];

export const PROPS_TABLE_CALENDAR_ROWS = [
  ['selectedDay', 'Object', `null`, 'The primary value of the single date picker'],
  ['isDayRange', 'Boolean', `false`, 'If true, converts the date picker to the range date picker'],
  ['selectedDayRange', 'Object', `{ from: null, to: null }`, 'The primary value of the range date picker'],
  ['onChange', 'Function', `newValue => null`, 'Gets called when value of the picker changes'],
  ['disabledDays', 'Array', `[]`, `An array of disabled calendar days. Disabled days won't be selectable, and
    they can't be included in a day range. If user tries to select/include them onDisabledDayError will be called`
  ],
  ['onDisabledDayError', 'Function', 'disabledDay => null', 'Gets called when user tries to select/include a disabled day'],
  ['colorPrimary', 'String', '#0eca2d', `The color of selected day in the single date picker and the color of
    range start and range end in range date picker`
  ],
  ['colorPrimaryLight', 'String', '#cff4d5', `The color of range-between days`],
  ['calendarClassName', 'String', `''`, 'Additional CSS class for the calendar element'],
  ['calendarTodayClassName', 'String', `''`, 'Additional CSS class for today day'],
  ['calendarSelectedDayClassName', 'String', `''`, 'Additional CSS class for the selected day'],
  ['calendarRangeStartClassName', 'String', `''`, 'Additional CSS class for the range start day in the range date picker'],
  ['calendarRangeBetweenClassName', 'String', `''`, 'Additional CSS class for the range-between day(s) in the range date picker'],
  ['calendarRangeEndClassName', 'String', `''`, 'Additional CSS class for the range end day in the range date picker'],
];
