const generateConstantId = list => list.map((item, index) => ({ ...item, id: index }));

export const TUTORIAL_ITEMS = generateConstantId([
  {
    path: '/docs/getting-started',
    name: 'Getting Started',
  },
  {
    path: '/docs/core-concepts',
    name: 'Core Concepts',
  },
  {
    path: '/docs/default-values',
    name: 'Default Values',
  },
  {
    path: '/docs/minimum-maximum-date',
    name: 'Minimum & Maximum Date',
  },
  {
    path: '/docs/disabled-days',
    name: 'Disabled Day(s)',
  },
  {
    path: '/docs/customization',
    name: 'Customization',
  },
  {
    path: '/docs/responsive-guide',
    name: 'Responsive Guide',
  },
  {
    path: '/docs/utilities',
    name: 'Utilities'
  },
])


export const API_ITEMS = generateConstantId([
  {
    path: '/docs/props-list',
    name: 'Props List'
  },
]);

export const COMMUNITY_ITEMS = generateConstantId([
  {
    path: '/docs/contribution-guide',
    name: 'Contribution Guide'
  },
  {
    path: '/docs/contributors',
    name: 'Contributors'
  }
])

export const DOCS_NAVBAR_ITEMS = generateConstantId([
  {
    name: 'Tutorial',
    items: TUTORIAL_ITEMS,
  },
  {
    name: 'API Reference',
    items: API_ITEMS,
  },
  {
    name: 'Community',
    items: COMMUNITY_ITEMS,
  }
])

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
  ['renderInput', 'Function', `() => null`, 'The returned value of this function will be the custom input element rendered for picker'],
];

export const PROPS_TABLE_CALENDAR_ROWS = [
  ['selectedDay', 'Object', `null`, 'The primary value of the single date picker'],
  ['isDayRange', 'Boolean', `false`, 'If true, converts the date picker to the range date picker'],
  ['selectedDayRange', 'Object', `{ from: null, to: null }`, 'The primary value of the range date picker'],
  ['onChange', 'Function', `newValue => null`, 'Gets called when value of the picker changes'],
  ['minimumDate', 'Object', `null`, 'Specifies the minimum selectable day by user'],
  ['maximumDate', 'Object', `null`, 'Specifies the maximum selectable day by user'],
  ['disabledDays', 'Array', `[]`, `An array of disabled calendar days. Disabled days won't be selectable, and
    they can't be included in a day range. If user tries to select/include them onDisabledDayError will be called`
  ],
  ['onDisabledDayError', 'Function', 'disabledDay => null', 'Gets called when user tries to select/include a disabled day'],
  ['selectorStartingYear', 'Number', '1300', 'The minimum selectable year when user opens the year selector'],
  ['selectorEndingYear', 'Number', '1450', 'The maxium selectable year when user opens the year selector'],
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
